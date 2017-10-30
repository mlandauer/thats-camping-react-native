// Directly using the core pouchdb libraries rather than pouchdb-react-native
// so that type definitions are a bit more obvious
import * as PouchDB from 'pouchdb-core'
import AsyncStoragePouch from 'pouchdb-adapter-asyncstorage'
import * as HttpPouch from 'pouchdb-adapter-http'
import * as replication from 'pouchdb-replication'

import { CampsiteNoId, Campsite } from '../libs/types'
import { remoteDbCreate } from '../libs/DatabaseGeneric'

PouchDB
  .plugin(AsyncStoragePouch)
  .plugin(HttpPouch)
  .plugin(replication)

// Just get read-only access to the remote database
let remoteDb = remoteDbCreate(PouchDB)
let localDb = new PouchDB<CampsiteNoId>('thatscamping')

// Starts live replication of remote to local database
export function replicate() {
  PouchDB.replicate(remoteDb, localDb, { live: true })
}

export function destroy() {
  return localDb.destroy()
}

export async function allChanges() {
  let response = await localDb.changes({ include_docs: true })
  let campsites3: Campsite[] = []
  response.results.forEach(result => {
    if (result.doc && !result.deleted) {
      campsites3.push(result.doc)
    }
  })
  return {
    campsites: campsites3,
    last_seq: response.last_seq
  }
}

export function changes(since: number | string, onChange: (campsite: Campsite) => void) {
  localDb.changes({ live: true, include_docs: true, since: since })
    .on('change', (response) => {
      // TODO: Actually propogate deletes rather than just ignoring them
      if (response.doc && !response.deleted) {
        onChange(response.doc)
      }
    })
}
