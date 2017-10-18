// First attempt at writing a script that updates the pouchdb data based
// on scraped data and tries to do it in a way that is maintainable and
// reproducable.

import * as PouchDB from 'pouchdb-node'
// We're using dotenv to do what we were doing with react-native-config
import * as Dotenv from 'dotenv'

import { CampsiteNoId, Campsite } from '../libs/types'
import { remoteDbCreate } from '../libs/DatabaseGeneric'
import campsitesFromMorph from '../libs/campsitesFromMorph'
import campsitesFromGoogle from '../libs/campsitesFromGoogle'

// Loads the environment variables from .env
Dotenv.config()

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

async function updateDatabaseFromGoogle() {
  return updateDatabase(await campsitesFromGoogle(), 'manual')
}

let db = new PouchDB<CampsiteNoId>('./thatscamping.db')

// Obviously anyone who really wants to get access to the password below
// can just decompile the binary. Not including the password in the source
// code provides a minimal level of security.
let staging_password = process.env.COUCHDB_REMOTE_PASSWORD_STAGING
let production_password = process.env.COUCHDB_REMOTE_PASSWORD_PRODUCTION
if (staging_password && production_password) {
  let remoteDb = remoteDbCreate(PouchDB, staging_password, production_password)
  // Do a one time of remote to local database
  console.log("Doing replication from remote to local database...")
  PouchDB.replicate(remoteDb, db).then(() => {
    console.log("Replication finished")
  }).then(() => {
    return updateDatabaseFromNationalParks()
  }).then(() => {
    return updateDatabaseFromGoogle()
  }).then(() => {
    console.log("Replicating from local to remote database...")
    return PouchDB.replicate(db, remoteDb)
  }).then(() => {
    console.log("Done.")
  })
} else {
  console.error("environment variables COUCHDB_REMOTE_PASSWORD_STAGING and COUCHDB_REMOTE_PASSWORD_PRODUCTION not set")
}
