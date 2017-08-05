import { Campsite, Position, Facilities, Access } from '../libs/types'

// This is the form of the data as it is in data_simplified.json
export interface CampsitesJson {
  campsites: {
    id: number;
    name: string;
    description: string;
    position: Position | {};
    facilities: Facilities;
    access: Access;
    park_id: number;
  }[];
  parks: {
    id: number;
    name: string;
    description: string;
    campsite_ids: number[];
  }[];
}

// Convert the json as stored in data_simplified.json to a list of campsites
export function convertJson(json: CampsitesJson): Campsite[] {
  // Turn parks array into hash
  let parksHash: {[index: number]: any} = {}
  json.parks.forEach((park) => {
    parksHash[park.id] = park
  })
  // Turn array in campsites into hash
  let c: Campsite[] = []
  json.campsites.forEach((campsite) => {
    let park = parksHash[campsite.park_id]
    // Convert weird representation of undefined position in json to how we should do it
    let position : (Position | null) = convertPosition(campsite.position)
    c.push({
      _id: campsite.id.toString(),
      name: campsite.name,
      description: campsite.description,
      facilities: campsite.facilities,
      access: campsite.access,
      parkName: park.name,
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
