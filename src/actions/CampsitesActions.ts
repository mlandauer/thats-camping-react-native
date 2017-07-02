import { CampsitesJson } from '../libs/types'

interface NoopAction {
  type: 'NOOP'
}

interface AddCampsitesJsonAction {
  type: 'ADD_CAMPSITES_JSON';
  json: CampsitesJson;
}

export type CampsitesAction = AddCampsitesJsonAction | NoopAction;

export function addCampsitesJson(json: CampsitesJson): CampsitesAction {
  return {
    type: 'ADD_CAMPSITES_JSON',
    json: json
  }
}

export function startSync() {
  return (dispatch: ((action: {}) => void)) => {
    var json = require('../../data_simplified.json')
    dispatch(addCampsitesJson(json))
  }
}
