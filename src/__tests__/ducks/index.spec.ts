import * as expect from 'expect'
import { reducer } from '../../ducks/index'

describe('index reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer({
        campsites: {},
        position: null,
        starred: [],
        synching: { mapProgress: 0 },
        admin: { text: "", showStateChanges: false }
      }, { type: 'NOOP' })
    ).toEqual({
      campsites: {},
      position: null,
      starred: [],
      synching: { mapProgress: 0 },
      admin: { text : "", showStateChanges: false }
    })
  })

  it('should handle UPDATE_POSITION', () => {
    expect(
      reducer({
        campsites: {},
        position: null,
        starred: [],
        synching: { mapProgress: 0 },
        admin: { text: "", showStateChanges: false }
      }, {
          type: 'UPDATE_POSITION',
          position: { lat: 3.0, lng: 4.0 }
        })
    ).toEqual({
      campsites: {},
      position: { lat: 3.0, lng: 4.0 },
      starred: [],
      synching: { mapProgress: 0 },
      admin: { text : "", showStateChanges: false }
    })
  })
})
