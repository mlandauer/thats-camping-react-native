// Directly using the core pouchdb libraries rather than pouchdb-react-native
// so that type definitions are a bit more obvious
import * as PouchDB from 'pouchdb-core'
import AsyncStoragePouch from 'pouchdb-adapter-asyncstorage'
import * as HttpPouch from 'pouchdb-adapter-http'
import * as replication from 'pouchdb-replication'
import Config from 'react-native-config'

import { CampsiteNoId, Campsite } from '../libs/types'
import { remoteDbCreate } from '../libs/DatabaseGeneric'

PouchDB
  .plugin(AsyncStoragePouch)
  .plugin(HttpPouch)
  .plugin(replication)

// Obviously anyone who really wants to get access to the password below
// can just decompile the binary. Not including the password in the source
// code provides a minimal level of security.
let remoteDb = remoteDbCreate(PouchDB, Config.COUCHDB_REMOTE_PASSWORD)

// Starts two-way sync between local and remote database
export function sync() {
  let db = new PouchDB<CampsiteNoId>('thatscamping')
  let sync = PouchDB.sync(remoteDb, db, { live: true })
  return sync
}

export function destroy() {
  let db = new PouchDB<CampsiteNoId>('thatscamping')
  return db.destroy()
}

export async function allChanges() {
  let db = new PouchDB<CampsiteNoId>('thatscamping')
  let response = await db.changes({ include_docs: true })
  let campsites3: Campsite[] = []
  response.results.forEach(result => {
    if (result.doc && !result.doc._deleted) {
      campsites3.push(result.doc)
    }
  })
  return {
    campsites: campsites3,
    last_seq: response.last_seq
  }
}

export function changes(since: number | string, onChange: (campsite: Campsite) => void) {
  let db = new PouchDB<CampsiteNoId>('thatscamping')
  db.changes({ live: true, include_docs: true, since: since })
    .on('change', (response) => {
      // TODO: Actually propogate deletes rather than just ignoring them
      if (response.doc && !response.doc._deleted) {
        onChange(response.doc)
      }
    })
}
