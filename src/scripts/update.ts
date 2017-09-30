// First attempt at writing a script that updates the pouchdb data based
// on scraped data and tries to do it in a way that is maintainable and
// reproducable.

import * as PouchDB from 'pouchdb-node'
// We're using dotenv to do what we were doing with react-native-config
import * as Dotenv from 'dotenv'
import fetch from 'node-fetch'
import * as querystring from 'querystring'
import { remoteDbCreate } from '../libs/DatabaseGeneric'

// Loads the environment variables from .env
Dotenv.config()

let db = new PouchDB('./thatscamping.db')

// Obviously anyone who really wants to get access to the password below
// can just decompile the binary. Not including the password in the source
// code provides a minimal level of security.
let password = process.env.COUCHDB_REMOTE_PASSWORD
if (password) {
  let remoteDb = remoteDbCreate(PouchDB, password)

  // Do a one time of remote to local database
  console.log("Doing replication from remote to local database...")
  PouchDB.replicate(remoteDb, db).then(() => {
    console.log("Replication finished")

    // Just spit out the contents of the database to the standard output
    db.allDocs({include_docs: true}).then((docs) => {
      console.log(docs.rows)
    })
  })
} else {
  console.error("environment variable COUCHDB_REMOTE_PASSWORD not set")
}

async function getMorphData(scraper: string) {
  let s = querystring.stringify({
    key: process.env.MORPH_API_KEY,
    // TODO: Don't limit the number returned
    query: 'select * from "data" limit 10'
  })
  let r = await fetch('https://api.morph.io/' + scraper + '/data.json?' + s)
  return r.json()
}

// First let's get data from morph.io using the API
getMorphData('mlandauer/scraper-campsites-nsw-nationalparks').then((json) => {
  console.log(json)
})
