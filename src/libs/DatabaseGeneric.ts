// This contains database functions that work in both react native and node
// So, we shouldn't importing any react native specific stuff

const url = 'https://mlandauer.cloudant.com/thats-camping-react-native'

// If no password is given just get read access to the remote database
export function remoteDbCreate(PouchDB: any, password: string | null = null) {
  if (password) {
    return new PouchDB(url, {
      auth: {
        username: 'chookeementootworsenters',
        password: password
      }
    })
  } else {
    return new PouchDB(url)
  }
}
