// First attempt at writing a script that updates the pouchdb data based
// on scraped data and tries to do it in a way that is maintainable and
// reproducable.

import * as PouchDB from 'pouchdb-node'
// We're using dotenv to do what we were doing with react-native-config
import * as Dotenv from 'dotenv'

// Loads the environment variables from .env
Dotenv.config()

let db = new PouchDB('./thatscamping.db')

// This is currently copied from Database.ts
// TODO: Fix this so that it's not copied
let remoteDb = new PouchDB('https://mlandauer.cloudant.com/thats-camping-react-native', {
  auth: {
    username: 'chookeementootworsenters',
    // Obviously anyone who really wants to get access to the password below
    // can just decompile the binary. Not including the password in the source
    // code provides a minimal level of security.
    password: process.env.COUCHDB_REMOTE_PASSWORD
  }
});

// Do a one time of remote to local database
console.log("Doing replication from remote to local database...")
PouchDB.replicate(remoteDb, db).then(() => {
  console.log("Replication finished")

  // Just spit out the contents of the database to the standard output
  db.allDocs({include_docs: true}).then((docs) => {
    console.log(docs.rows)
  })
})
