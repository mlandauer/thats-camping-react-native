import * as expect from 'expect'
import { reducer } from '../../ducks/index'

describe('index reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer({
        campsites: {},
        position: null,
        starred: [],
        offlineMap: { progress: 0 },
        admin: { text: "" }
      }, { type: 'NOOP' })
    ).toEqual({
      campsites: {},
      position: null,
      starred: [],
      offlineMap: { progress: 0 },
      admin: { text : "" }
    })
  })

  it('should handle UPDATE_POSITION', () => {
    expect(
      reducer({
        campsites: {},
        position: null,
        starred: [],
        offlineMap: { progress: 0 },
        admin: { text: "" }
      }, {
          type: 'UPDATE_POSITION',
          position: { lat: 3.0, lng: 4.0 }
        })
    ).toEqual({
      campsites: {},
      position: { lat: 3.0, lng: 4.0 },
      starred: [],
      offlineMap: { progress: 0 },
      admin: { text : "" }
    })
  })
})
