// This contains database functions that work in both react native and node
// So, we shouldn't importing any react native specific stuff

const stagingDatabase = 'thats-camping-react-native-staging'
const stagingUsername = 'eggstalaythavearinglefor'
const productionDatabase = 'thats-camping-react-native'
const productionUsername = 'chookeementootworsenters'

// If no password is given just get read access to the remote database
export function remoteDbCreate(PouchDB: any,
  stagingPassword: string | null = null,
  productionPassword: string | null = null) {

  var database: string
  var username: string
  var password: string | null
  if (process.env.NODE_ENV === 'production') {
    database = productionDatabase
    username = productionUsername
    password = productionPassword
    console.log("Using production database...")
  } else {
    database = stagingDatabase
    username = stagingUsername
    password = stagingPassword
    console.log("Using staging database...")
  }
  let url = 'https://mlandauer.cloudant.com/' + database

  if (password) {
    return new PouchDB(url, {
      auth: {
        username: username,
        password: password
      }
    })
  } else {
    return new PouchDB(url)
  }
}
