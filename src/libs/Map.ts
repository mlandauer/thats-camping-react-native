import * as Mapbox from 'react-native-mapbox-gl'
import Config from 'react-native-config'

interface DownloadProgress {
  name: string;
  metadata: any;
  countOfResourcesCompleted: number;
  maximumResourcesExpected: number;
  countOfResourcesExpected: number;
  countOfBytesCompleted: number;
}

export function initialise(updateProgress: (progress: number) => void,
  reloadProgress: (progress: number) => void) {
  Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN)
  // The API call below is new in react-native-mapbox-gl 5.2.1. We're on 5.2.0
  // await Mapbox.initializeOfflinePacks()
  // Get information about all the offline packs currently defined
  // TODO: A better solution is to only have a single progress measure and store
  // in the state whether we've completed a download.
  Mapbox.getOfflinePacks()
  .then((packs: DownloadProgress[]) => {
    console.log("packs", packs)
    if (packs.length > 0) {
      console.log("Already a download pack setup so we don't need to set one up")
      // Checks if the pack hasn't finished downloading
      if (progress(packs[0]) < 1) {
        setupUpdateProgressCallback(updateProgress)
      } else {
        setupReloadProgressCallback(reloadProgress)
      }
    } else {
      console.log("Need to setup a download pack")
      setupDownloadPack()
      setupUpdateProgressCallback(updateProgress)
    }
    // packs is an array of progress objects
  })
  .catch((err: string) => {
    console.error(err)
  })
  // TODO: In react-native-mapbox-gl 5.2.1 we'll be able to control whether
  // individual offline packs are being downloaded or not. So, we'll be able
  // to pause and restart downloads.
}

function setupDownloadPack() {
  // Start downloading offline maps
  Mapbox.addOfflinePack({
    name: 'base',
    type: 'bbox',
    bounds: [
      -37.845485, 140.913340, -28.126389, 153.402606
    ],
    minZoomLevel: 5,
    maxZoomLevel: 10,
    // TODO: Get styleURL from configuration
    styleURL: "mapbox://styles/mapbox/outdoors-v10"
  }).then(() => {
    console.log("added offline pack")
  }).catch((err: string) => {
    console.log("err", err)
  });
}

function progress(p: DownloadProgress): number {
  return p.countOfResourcesCompleted / p.countOfResourcesExpected
}

function setupUpdateProgressCallback(updateProgress: (progress: number) => void) {
  Mapbox.addOfflinePackProgressListener((p: DownloadProgress) => updateProgress(progress(p)))
}

function setupReloadProgressCallback(reloadProgress: (progress: number) => void) {
  Mapbox.addOfflinePackProgressListener((p: DownloadProgress) => reloadProgress(progress(p)))
}
