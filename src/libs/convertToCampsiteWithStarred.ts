import { Campsite, CampsiteWithStarred } from './types'

export function convertToCampsiteWithStarred(campsite: Campsite, starredList: string[]): CampsiteWithStarred {
  // Don't want to use strict equality (with indexOf) as a workaround
  let i = starredList.findIndex((v) => {return v == campsite._id})
  let starred = i != -1
  return {...campsite, starred: starred}
}

export function convertToCampsitesWithStarred(campsites: {[index: string]: Campsite}, starredList: string[]): {[index:string]: CampsiteWithStarred} {
  let campsitesWithStarred : {[index:string]: CampsiteWithStarred} = {}
  for (var id in campsites) {
    campsitesWithStarred[id] = convertToCampsiteWithStarred(campsites[id], starredList)
  }
  return campsitesWithStarred
}
