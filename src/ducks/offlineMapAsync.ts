// TODO: Move this module out of ducks directory to somewhere more appropriate

import { Dispatch } from 'react-redux'
import * as MapBox from 'react-native-mapbox-gl'

import { State as AppState } from '../ducks'
import { updateDownloading, updateMessage } from './offlineMap'

export function updateDownloadingAsync(downloading: boolean) {
  // Icky that we have to use the application state type here
  return (dispatch: Dispatch<AppState>) => {
    dispatch(updateDownloading(downloading))
    if (downloading) {
      // Start downloading offline maps
      MapBox.addOfflinePack({
        name: 'base',
        type: 'bbox',
        bounds: [
          -37.845485, 140.913340, -28.126389, 153.402606
        ],
        minZoomLevel: 10,
        maxZoomLevel: 13,
        // TODO: Get styleURL from configuration
        styleURL: "mapbox://styles/mapbox/outdoors-v10"
      }).then(() => {
        console.log("added offline pack")
        dispatch(updateMessage("Added offline pack"))
        // Clear the message after a second
        setTimeout(() => {
          dispatch(updateMessage(null))
        }, 1000)
      }).catch((err: string) => {
        console.log("err", err)
        dispatch(updateMessage(err))
      });
    } else {
      // TODO: Stop downloading offline maps
    }
    // dispatch(updateDownloading(downloading))
    // if (downloading) {
    //   setTimeout(() => {
    //     dispatch(updateProgress(Math.random()))
    //   }, 1000)
    // }
  }
}
