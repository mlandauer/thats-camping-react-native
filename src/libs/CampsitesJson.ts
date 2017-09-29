import { Campsite, Position, Facilities, Access } from '../libs/types'

interface CampsiteJson {
  id: number;
  name: string;
  parkName: string;
  description: string;
  position: Position | {};
  facilities: Facilities;
  access: Access;
}

// This is the form of the data as it is in data_simplified.json
export type CampsitesJson = CampsiteJson[]

// Convert the json as stored in data_simplified.json to a list of campsites
export function convertJson(json: CampsitesJson): Campsite[] {
  // Turn array in campsites into hash
  let c: Campsite[] = []
  json.forEach((campsite) => {
    // Convert weird representation of undefined position in json to how we should do it
    let position: (Position | null) = convertPosition(campsite.position)
    c.push({
      _id: campsite.id.toString(),
      name: campsite.name,
      description: campsite.description,
      facilities: campsite.facilities,
      access: campsite.access,
      parkName: campsite.parkName,
      position: position
    })
  })
  return c
}

function convertPosition(position: Position | {}): (Position | null) {
  if ((<Position>position).lat && (<Position>position).lng) {
    return <Position>position
  } else {
    return null
  }
}
