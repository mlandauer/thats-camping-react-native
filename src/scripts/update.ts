// First attempt at writing a script that updates the pouchdb data based
// on scraped data and tries to do it in a way that is maintainable and
// reproducable.

import * as PouchDB from 'pouchdb-node'
// We're using dotenv to do what we were doing with react-native-config
import * as Dotenv from 'dotenv'
import fetch from 'node-fetch'
import * as querystring from 'querystring'
import * as csvParse from 'csv-parse'

import { CampsiteNoId, Campsite, Position } from '../libs/types'
import { remoteDbCreate } from '../libs/DatabaseGeneric'

// Loads the environment variables from .env
Dotenv.config()

async function getMorphData(scraper: string) {
  let s = querystring.stringify({
    key: process.env.MORPH_API_KEY,
    query: 'select * from "data"'
  })
  let r = await fetch('https://api.morph.io/' + scraper + '/data.json?' + s)
  return r.json()
}

interface MorphRecord {
  name: string;
  latitude: number;
  longitude: number;
  id: string;
  url: string;
  parkName: string;
  description: string;
  bookingURL: null | string;
  bookings: string;
  noCampsites: null | number;
  barbecues: "true" | "false";
  drinkingWater: "true" | "false";
  picnicTables: "true" | "false";
  showers: "true" | "false";
  toilets: "true" | "false";
  car: "true" | "false";
  trailers: "true" | "false";
  caravans: "true" | "false";
}

function convertMorphRecordToCampsite(morph: MorphRecord): CampsiteNoId {
  let position: (Position | null) = null
  if (morph.latitude && morph.longitude) {
    position = {
      lat: morph.latitude,
      lng: morph.longitude
    }
  }
  return {
    name: morph.name,
    parkName: morph.parkName,
    description: morph.description,
    position: position,
    facilities: {
      toilets: (morph.toilets == "true"),
      picnicTables: (morph.picnicTables == "true"),
      barbecues: (morph.barbecues == "true"),
      showers: (morph.showers == "true"),
      drinkingWater: (morph.drinkingWater == "true")
    },
    access: {
      caravans: (morph.caravans == "true"),
      trailers: (morph.trailers == "true"),
      car: (morph.car == "true")
    },
    source: 'nationalparks.nsw.gov.au',
    sourceId: morph.id
  }
}

// Returns all campsites from a particular source
async function campsitesFromSource(source: string) {
  // First get all campsites in the database with the same source
  let docs = await db.allDocs({include_docs: true})
  let campsites = docs.rows.map((row) => {
    return (row.doc as Campsite)
  })
  return campsites.filter((campsite) => {
    return campsite.source == source
  })
}

async function campsitesFromMorph() {
  let json: MorphRecord[] = await getMorphData('mlandauer/scraper-campsites-nsw-nationalparks')
  return json.map((c) => convertMorphRecordToCampsite(c))
}

async function updateDatabase(campsitesMorph: CampsiteNoId[], source: string) {
  let campsitesSource = await campsitesFromSource(source)

  let docs: (Campsite | CampsiteNoId)[] = []

  // This bit creates new campsites and updates existing ones
  campsitesMorph.forEach((c) => {
    let source = campsitesSource.find(campsite => campsite.sourceId === c.sourceId)
    if (source) {
      // This is a campsite that might need updating
      // Need to add the _id and _rev (from source) into the morph data
      let updated = {...c, _id: source._id, _rev: source._rev}
      if (JSON.stringify(source) !== JSON.stringify(updated)) {
        docs.push(updated)
      }
    } else {
      // This is a new campsite
      docs.push(c)
    }
  })

  // This removes campsites
  campsitesSource.forEach((c) => {
    let morph = campsitesMorph.find(campsite => campsite.sourceId === c.sourceId)
    if (!morph) {
      let updated = {...c, _deleted: true}
      docs.push(updated)
    }
  })
  console.log(`Updating ${docs.length} campsites from source ${source}...`)
  return db.bulkDocs(docs)
}

async function updateDatabaseFromNationalParks() {
  return updateDatabase(await campsitesFromMorph(), 'nationalparks.nsw.gov.au')
}

function parse(doc: string, options: any) {
  return new Promise(function (fulfill, reject) {
    csvParse(doc, options, function(err, output) {
      if (err) {
        reject(err)
      } else {
        fulfill(output)
      }
    })
  })
}

function getPublicGoogleSheetData(google_sheet_id: string) {
  let url = `https://docs.google.com/spreadsheets/d/${google_sheet_id}/export?format=csv`
  return fetch(url)
    .then(doc => doc.text())
    .then(doc => parse(doc, {columns: true}))
}

function getGoogleData(): Promise<GoogleRecord[]> {
  let googleSheetID = process.env.GOOGLE_SHEET_ID
  if (googleSheetID) {
    // TODO: Dodgy as. We don't actually know that this data has the right form
    // TODO: Do runtime check that it has the correct form
    return getPublicGoogleSheetData(googleSheetID) as Promise<GoogleRecord[]>
  } else {
    return Promise.reject("Need to set GOOGLE_SHEET_ID in .env")
  }
}

function convertGoogleBoolean(value: string): boolean | undefined {
  if (value === "yes") {
    return true
  } else if (value === "no") {
    return false
  } else if (value === "") {
    return undefined
  } else {
    console.error("Unexpected value")
    return undefined
  }
}

// TODO: Make these names better match the names we're using internally
interface GoogleRecord {
  name: string;
  area_name: string;
  description: string;
  latitude: string;
  longitude: string;
  toilets: string;
  picnic_tables: string;
  bbq: string;
  showers: string;
  caravan: string;
  trailer: string;
  car: string;
}

function convertGoogleRecordToCampsite(record: GoogleRecord): CampsiteNoId {
  console.log("record", record)
  return {
    name: record.name,
    parkName: record.area_name,
    description: record.description,
    position: {
      lat: parseFloat(record.latitude),
      lng: parseFloat(record.longitude)
    },
    facilities: {
      toilets: convertGoogleBoolean(record.toilets),
      picnicTables: convertGoogleBoolean(record.picnic_tables),
      barbecues: convertGoogleBoolean(record.bbq),
      showers: convertGoogleBoolean(record.showers),
      // TODO: Add drinking water to the Google spreadsheet
      drinkingWater: undefined
    },
    access: {
      caravans: convertGoogleBoolean(record.caravan),
      trailers: convertGoogleBoolean(record.trailer),
      car: convertGoogleBoolean(record.car)
    }
  }
}

async function campsitesFromGoogle() {
  let records = await getGoogleData()
  return records.map(record => convertGoogleRecordToCampsite(record))
}

campsitesFromGoogle().then(campsites =>
  console.log("Campsites", campsites)
)

let db = new PouchDB<CampsiteNoId>('./thatscamping.db')
//
// // Obviously anyone who really wants to get access to the password below
// // can just decompile the binary. Not including the password in the source
// // code provides a minimal level of security.
// let staging_password = process.env.COUCHDB_REMOTE_PASSWORD_STAGING
// let production_password = process.env.COUCHDB_REMOTE_PASSWORD_PRODUCTION
// if (staging_password && production_password) {
//   let remoteDb = remoteDbCreate(PouchDB, staging_password, production_password)
//   // Do a one time of remote to local database
//   console.log("Doing replication from remote to local database...")
//   PouchDB.replicate(remoteDb, db).then(() => {
//     console.log("Replication finished")
//     return updateDatabaseFromNationalParks()
//   }).then(() => {
//     console.log("Replicating from local to remote database...")
//     return PouchDB.replicate(db, remoteDb)
//   }).then(() => {
//     console.log("Done.")
//   })
// } else {
//   console.error("environment variables COUCHDB_REMOTE_PASSWORD_STAGING and COUCHDB_REMOTE_PASSWORD_PRODUCTION not set")
// }
