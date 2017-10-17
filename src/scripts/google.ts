import fetch from 'node-fetch'
import * as Dotenv from 'dotenv'

// Loads the environment variables from .env
Dotenv.config()

// Google sheet that we want here has to be publically readable
let google_sheet_id = process.env.GOOGLE_SHEET_ID
let url = `https://docs.google.com/spreadsheets/d/${google_sheet_id}/export?format=csv`

fetch(url).then(doc => doc.text()).then((doc: string) => {
  console.log("doc", doc)
})
