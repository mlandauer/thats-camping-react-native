import fetch from 'node-fetch'
import * as Dotenv from 'dotenv'
import * as csvParse from 'csv-parse'

// Loads the environment variables from .env
Dotenv.config()

// Google sheet that we want here has to be publically readable
let google_sheet_id = process.env.GOOGLE_SHEET_ID
let url = `https://docs.google.com/spreadsheets/d/${google_sheet_id}/export?format=csv`

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

fetch(url)
  .then(doc => doc.text())
  .then(doc => parse(doc, {columns: true}))
  .then(output => {
    console.log("output", output)
  })
