import * as Mapbox from 'react-native-mapbox-gl'
import Config from 'react-native-config'

interface DownloadProgress {
    metadata: any;
	  countOfResourcesCompleted: number;
	  maximumResourcesExpected: number;
	  countOfResourcesExpected: number;
	  countOfBytesCompleted: number;
	  name: string;
}

interface ErrorListenerPayload {
  name: string;
  error: string;
}

interface MaxAllowedTilesPayload {
  name: string;
  maxTiles: number;
}

export function initialise(updateProgress: (progress: number) => void) {
  Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN)
  // TODO: Below doesn't work. Figure out why.
  // Mapbox.initializeOfflinePacks()
  Mapbox.addOfflinePackProgressListener((progressObject: DownloadProgress) => {
    console.log("progressObject", progressObject)
    var progress = progressObject.countOfResourcesCompleted / progressObject.countOfResourcesExpected
    updateProgress(progress)
  })
  Mapbox.addOfflineErrorListener((payload: ErrorListenerPayload) => {
    console.log(`Offline pack named ${payload.name} experienced an error: ${payload.error}`);
  })
  Mapbox.addOfflineMaxAllowedTilesListener((payload: MaxAllowedTilesPayload) => {
    console.log(`Offline pack named ${payload.name} reached max tiles quota of ${payload.maxTiles} tiles`);
  })
}
