import * as querystring from 'querystring'
import fetch from 'node-fetch'
import * as csvParse from 'csv-parse'

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

// Returns the default table for a given morph scraper
export async function morph(scraper: string): Promise<any> {
  let s = querystring.stringify({
    key: process.env.MORPH_API_KEY,
    query: 'select * from "data"'
  })
  let r = await fetch('https://api.morph.io/' + scraper + '/data.json?' + s)
  return r.json()
}

// Returns the first sheet of a public google spreadsheet
export function googleSpreadsheet(google_sheet_id: string) {
  let url = `https://docs.google.com/spreadsheets/d/${google_sheet_id}/export?format=csv`
  return fetch(url)
    .then(doc => doc.text())
    .then(doc => parse(doc, {columns: true}))
}
