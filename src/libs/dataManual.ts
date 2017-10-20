import { String, Array, Record, Static, Literal, Union } from 'runtypes'

import { CampsiteNoId } from '../libs/types'
import * as DataApi from '../libs/DataApi'

const GoogleBoolean = Union(
  Literal('yes'),
  Literal('no'),
)

type GoogleBoolean = Static<typeof GoogleBoolean>

// // TODO: Make these names better match the names we're using internally
const GoogleRecord = Record({
  id: String,
  name: String,
  area_name: String,
  description: String,
  latitude: String,
  longitude: String,
  toilets: GoogleBoolean,
  picnic_tables: GoogleBoolean,
  bbq: GoogleBoolean,
  showers: GoogleBoolean,
  caravan: GoogleBoolean,
  trailer: GoogleBoolean,
  car: GoogleBoolean,
  drinking_water: GoogleBoolean
})

type GoogleRecord = Static<typeof GoogleRecord>

function convertGoogleBoolean(value: GoogleBoolean): boolean {
  return (value === "yes")
}

function convertGoogleRecordToCampsite(record: GoogleRecord): CampsiteNoId {
  return {
    name: record.name,
    parkName: record.area_name,
    description: record.description,
    position: {
      // TODO: Check that the number in a string is actually a number
      lat: parseFloat(record.latitude),
      lng: parseFloat(record.longitude)
    },
    facilities: {
      toilets: convertGoogleBoolean(record.toilets),
      picnicTables: convertGoogleBoolean(record.picnic_tables),
      barbecues: convertGoogleBoolean(record.bbq),
      showers: convertGoogleBoolean(record.showers),
      drinkingWater: convertGoogleBoolean(record.drinking_water)
    },
    access: {
      caravans: convertGoogleBoolean(record.caravan),
      trailers: convertGoogleBoolean(record.trailer),
      car: convertGoogleBoolean(record.car)
    },
    bookings: undefined,
    sourceId: record.id
  }
}

export default async function dataManual() {
  let data = await DataApi.googleSpreadsheet('1lNLB2nFCnUIUQ8iHZ9zL9TsYCBn-rUFYQoekuugFqnA')
  // Runtime type check that record has the correct shape
  let records = Array(GoogleRecord).check(data)
  return records.map(record => convertGoogleRecordToCampsite(record))
}
