import * as expect from 'expect'
import { reducer } from '../../ducks/index'

describe('index reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer({
        campsites: {},
        position: null,
        starred: [],
        offlineMap: { downloading: false, progress: 0 }
      }, { type: 'NOOP' })
    ).toEqual({
      campsites: {},
      position: null,
      starred: [],
      offlineMap: { downloading: false, progress: 0 }
    })
  })

  it('should handle UPDATE_POSITION', () => {
    expect(
      reducer({
        campsites: {},
        position: null,
        starred: [],
        offlineMap: { downloading: false, progress: 0 }
      }, {
          type: 'UPDATE_POSITION',
          position: { lat: 3.0, lng: 4.0 }
        })
    ).toEqual({
      campsites: {},
      position: { lat: 3.0, lng: 4.0 },
      starred: [],
      offlineMap: { downloading: false, progress: 0 }
    })
  })
})
