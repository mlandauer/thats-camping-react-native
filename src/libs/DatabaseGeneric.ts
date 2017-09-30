// This contains database functions that work in both react native and node
// So, we shouldn't importing any react native specific stuff

export function remoteDbCreate(password: string) {
  return new PouchDB('https://mlandauer.cloudant.com/thats-camping-react-native', {
    auth: {
      username: 'chookeementootworsenters',
      password: password
    }
  })
}
