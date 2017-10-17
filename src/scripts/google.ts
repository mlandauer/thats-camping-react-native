import fetch from 'node-fetch'
import * as Dotenv from 'dotenv'
import * as csvParse from 'csv-parse'

// Loads the environment variables from .env
Dotenv.config()

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

let googleSheetID = process.env.GOOGLE_SHEET_ID

if (googleSheetID) {
  // Google sheet that we want here has to be publically readable
  getPublicGoogleSheetData(googleSheetID).then(output => {
    console.log("output", output)
  })
} else {
  console.error("Need to set GOOGLE_SHEET_ID in .env")
}
