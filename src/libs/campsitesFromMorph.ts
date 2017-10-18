import * as querystring from 'querystring'
import fetch from 'node-fetch'
import { String, Array, Record, Static, Literal, Union, Number } from 'runtypes'

import { CampsiteNoId, Position } from '../libs/types'

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

type MorphBoolean = Static<typeof MorphBoolean>
type MorphRecord = Static<typeof MorphRecord>

function convertMorphRecordToCampsite(morph: MorphRecord): CampsiteNoId {
  let position: (Position | null) = null
  if (morph.latitude && morph.longitude) {
    position = {
      lat: morph.latitude,
      lng: morph.longitude
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
    sourceId: morph.id
  }
}

function convertMorphBoolean(value: MorphBoolean): boolean {
  return value === "true"
}

async function getMorphData(scraper: string) {
  let s = querystring.stringify({
    key: process.env.MORPH_API_KEY,
    query: 'select * from "data"'
  })
  let r = await fetch('https://api.morph.io/' + scraper + '/data.json?' + s)
  return r.json()
}

export default async function campsitesFromMorph() {
  let json = await getMorphData('mlandauer/scraper-campsites-nsw-nationalparks')
  // Runtime type checking
  let coerced = Array(MorphRecord).check(json)
  return coerced.map((c) => convertMorphRecordToCampsite(c))
}
