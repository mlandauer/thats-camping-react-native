import { CampsiteWithRev, CampsiteWithStarredRev } from './types'

export function convertToCampsiteWithStarred(campsite: CampsiteWithRev, starredList: string[]): CampsiteWithStarredRev {
  // Don't want to use strict equality (with indexOf) as a workaround
  let i = starredList.findIndex((v) => { return v == campsite._id })
  let starred = i != -1
  return { ...campsite, starred: starred }
}

export function convertToCampsitesWithStarred(campsites: { [index: string]: CampsiteWithRev }, starredList: string[]): { [index: string]: CampsiteWithStarredRev } {
  let campsitesWithStarred: { [index: string]: CampsiteWithStarredRev } = {}
  for (var id in campsites) {
    campsitesWithStarred[id] = { ...campsites[id], starred: false }
  }
  starredList.forEach((id: string) => {
    let c = campsitesWithStarred[id]
    if (c) {
      c.starred = true
    }
  })
  return campsitesWithStarred
}
