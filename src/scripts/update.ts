// First attempt at writing a script that updates the pouchdb data based
// on scraped data and tries to do it in a way that is maintainable and
// reproducable.

import * as PouchDB from 'pouchdb-node'
// We're using dotenv to do what we were doing with react-native-config
import * as Dotenv from 'dotenv'
import fetch from 'node-fetch'
import * as querystring from 'querystring'

import { CampsiteNoId, Position } from '../libs/types'
// import { remoteDbCreate } from '../libs/DatabaseGeneric'

// Loads the environment variables from .env
Dotenv.config()

let db = new PouchDB<CampsiteNoId>('./thatscamping.db')

// Obviously anyone who really wants to get access to the password below
// can just decompile the binary. Not including the password in the source
// code provides a minimal level of security.
// let password = process.env.COUCHDB_REMOTE_PASSWORD
// if (password) {
//   let remoteDb = remoteDbCreate(PouchDB, password)
//
//   // Do a one time of remote to local database
//   console.log("Doing replication from remote to local database...")
//   PouchDB.replicate(remoteDb, db).then(() => {
//     console.log("Replication finished")
//
//     // // Just spit out the contents of the database to the standard output
//     db.allDocs({include_docs: true}).then((docs) => {
//       console.log(docs.rows)
//     })
//   })
// } else {
//   console.error("environment variable COUCHDB_REMOTE_PASSWORD not set")
// }

async function getMorphData(scraper: string) {
  let s = querystring.stringify({
    key: process.env.MORPH_API_KEY,
    // TODO: Don't limit the number returned
    query: 'select * from "data" limit 10'
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
    source_id: morph.id
  }
}

// Returns all campsites from a particular source
async function campsitesFromSource(source: string) {
  // First get all campsites in the database with the same source
  let docs = await db.allDocs({include_docs: true})
  return docs.rows.filter((row) => {
    return row.doc.source == source
  })
}

async function campsitesFromMorph() {
  let json: MorphRecord[] = await getMorphData('mlandauer/scraper-campsites-nsw-nationalparks')
  return json.map((c) => convertMorphRecordToCampsite(c))
}

// First get all campsites in the database with the same source
campsitesFromSource('nationalparks.nsw.gov.au').then((campsites) => {
  console.log(campsites)
})

// First let's get data from morph.io using the API
campsitesFromMorph().then((campsites) => {
    campsites.forEach((campsite) => {
      // Initially just dump all the data into the database
      db.post(campsite)
    })
})
