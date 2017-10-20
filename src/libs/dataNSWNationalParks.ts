import { String, Array, Record, Static, Literal, Union, Number } from 'runtypes'

import { CampsiteNoId, Position, BookingsInfo } from '../libs/types'
import * as DataApi from '../libs/DataApi'

const MorphBoolean = Union(
  Literal("true"),
  Literal("false")
)

const MorphRecord = Record({
  name: String,
  latitude: Number,
  longitude: Number,
  id: String,
  url: String,
  parkName: String,
  description: String,
  bookingURL: Union(Literal(null), String),
  bookings: Union(Literal(null), String),
  noCampsites: Union(Literal(null), Number),
  barbecues: MorphBoolean,
  drinkingWater: MorphBoolean,
  picnicTables: MorphBoolean,
  showers: MorphBoolean,
  toilets: MorphBoolean,
  car: MorphBoolean,
  trailers: MorphBoolean,
  caravans: MorphBoolean,
})

const BookingRecord = Record({
  id: String,
  takes_bookings: Union(Literal('yes'), Literal('no')),
  phone_name: String,
  phone_number: String
})

type MorphBoolean = Static<typeof MorphBoolean>
type MorphRecord = Static<typeof MorphRecord>
type BookingRecord = Static<typeof BookingRecord>

function convertMorphRecordToCampsite(morph: MorphRecord, bookings: BookingRecord[]): CampsiteNoId {
  let position: (Position | null) = null
  if (morph.latitude && morph.longitude) {
    position = {
      lat: morph.latitude,
      lng: morph.longitude
    }
  }
  // First find current booking record
  let b = bookings.find(b => b.id === morph.id)
  let bookingsInfo: (BookingsInfo | null | undefined) = undefined
  if (b) {
    if (b.takes_bookings === "no") {
      bookingsInfo = null
    } else {
      bookingsInfo = {
        phone: {
          name: b.phone_name,
          number: b.phone_number
        },
        url: morph.bookingURL
      }
    }
  }

  return {
    name: morph.name,
    parkName: morph.parkName,
    description: morph.description,
    position: position,
    facilities: {
      toilets: convertMorphBoolean(morph.toilets),
      picnicTables: convertMorphBoolean(morph.picnicTables),
      barbecues: convertMorphBoolean(morph.barbecues),
      showers: convertMorphBoolean(morph.showers),
      drinkingWater: convertMorphBoolean(morph.drinkingWater)
    },
    access: {
      caravans: convertMorphBoolean(morph.caravans),
      trailers: convertMorphBoolean(morph.trailers),
      car: convertMorphBoolean(morph.car)
    },
    bookings: bookingsInfo,
    sourceId: morph.id
  }
}

function convertMorphBoolean(value: MorphBoolean): boolean {
  return value === "true"
}

export default async function dataNSWNationalParks() {
  let data = await DataApi.morph('mlandauer/scraper-campsites-nsw-nationalparks')
  let bookingData = await DataApi.googleSpreadsheet('1z__ChcriA_RmrN5W9Soz6rCeVU18p5pxG0d6qfmlpcU')
  let bookingDataCoerced = Array(BookingRecord).check(bookingData)
  // Runtime type checking
  let coerced = Array(MorphRecord).check(data)
  return coerced.map((c) => convertMorphRecordToCampsite(c, bookingDataCoerced))
}
