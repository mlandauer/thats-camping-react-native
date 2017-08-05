import { Campsite, CampsiteWithStarred } from './types'

export default function convertToCampsiteWithStarred(campsite: Campsite, starredList: number[]): CampsiteWithStarred {
  // Don't want to use strict equality (with indexOf) as a workaround
  let i = starredList.findIndex((v) => {return v == campsite._id})
  let starred = i != -1
  return Object.assign({}, campsite, {starred: starred})
}
