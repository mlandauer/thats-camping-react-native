// Directly using the core pouchdb libraries rather than pouchdb-react-native
// so that type definitions are a bit more obvious
import * as PouchDB from 'pouchdb-core'
import AsyncStoragePouch from 'pouchdb-adapter-asyncstorage'
import * as HttpPouch from 'pouchdb-adapter-http'
import * as replication from 'pouchdb-replication'

import { Campsite, CampsiteNoId } from '../libs/types'
import * as CampsitesJson from '../libs/CampsitesJson'

PouchDB
  .plugin(AsyncStoragePouch)
  .plugin(HttpPouch)
  .plugin(replication)

interface PouchCampsite extends CampsiteNoId {
  _id: string,
}

var json = require('../../data_simplified.json')
var campsites = CampsitesJson.convertJson(json)

export function destroy() {
  let db = new PouchDB<PouchCampsite>('thatscamping')
  return db.destroy()
}

export async function allChanges() {
  let db = new PouchDB<PouchCampsite>('thatscamping')
  let response = await db.changes({include_docs: true})
  let campsites3: Campsite[] = []
  response.results.forEach(result => {
    if (result.doc) {
      campsites3.push(convertFromPouch(result.doc))
    }
  })
  return campsites3
}

// TODO: In case the campsites have been edited should reset them
export function resetCampsites() {
  let db = new PouchDB<PouchCampsite>('thatscamping')
  // Dump all the campsites into the local pouchdb database
  // This will cause a conflict if the campsites already exist
  return db.bulkDocs(campsites.map(c => convertToPouch(c)))
}

function convertToPouch(campsite: Campsite): PouchCampsite {
  return {
    _id: campsite._id.toString(),
    name: campsite.name,
    description: campsite.description,
    position: campsite.position,
    facilities: campsite.facilities,
    access: campsite.access,
    parkName: campsite.parkName
  }
}

function convertFromPouch(campsite: PouchCampsite): Campsite {
  return {
    _id: campsite._id,
    name: campsite.name,
    description: campsite.description,
    position: campsite.position,
    facilities: campsite.facilities,
    access: campsite.access,
    parkName: campsite.parkName
  }
}
