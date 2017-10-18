import * as csvParse from 'csv-parse'
import fetch from 'node-fetch'

import { CampsiteNoId } from '../libs/types'

// TODO: Make these names better match the names we're using internally
interface GoogleRecord {
  id: string;
  name: string;
  area_name: string;
  description: string;
  latitude: string;
  longitude: string;
  toilets: string;
  picnic_tables: string;
  bbq: string;
  showers: string;
  caravan: string;
  trailer: string;
  car: string;
  drinking_water: string;
}

function parse(doc: string, options: any) {
  return new Promise(function (fulfill, reject) {
    csvParse(doc, options, function(err, output) {
      if (err) {
        reject(err)
      } else {
        fulfill(output)
      }
    })
  })
}

function getPublicGoogleSheetData(google_sheet_id: string) {
  let url = `https://docs.google.com/spreadsheets/d/${google_sheet_id}/export?format=csv`
  return fetch(url)
    .then(doc => doc.text())
    .then(doc => parse(doc, {columns: true}))
}

function getGoogleData(): Promise<GoogleRecord[]> {
  let googleSheetID = process.env.GOOGLE_SHEET_ID
  if (googleSheetID) {
    // TODO: Dodgy as. We don't actually know that this data has the right form
    // TODO: Do runtime check that it has the correct form
    return getPublicGoogleSheetData(googleSheetID) as Promise<GoogleRecord[]>
  } else {
    return Promise.reject("Need to set GOOGLE_SHEET_ID in .env")
  }
}

function convertGoogleBoolean(value: string): boolean | undefined {
  if (value === "yes") {
    return true
  } else if (value === "no") {
    return false
  } else if (value === "") {
    return undefined
  } else {
    console.error("Unexpected value")
    return undefined
  }
}

function convertGoogleRecordToCampsite(record: GoogleRecord): CampsiteNoId {
  return {
    name: record.name,
    parkName: record.area_name,
    description: record.description,
    position: {
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
    // TODO: The source string is duplicated in a couple of places. Fix this.
    source: 'manual',
    sourceId: record.id
  }
}

export default async function campsitesFromGoogle() {
  let records = await getGoogleData()
  return records.map(record => convertGoogleRecordToCampsite(record))
}
