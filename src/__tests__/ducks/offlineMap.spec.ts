import * as expect from 'expect'
import * as actions from '../../ducks/offlineMap'
import reducer from '../../ducks/offlineMap'

describe('position', () => {
  describe('actions', () => {
    it('updateDownloading', () => {
      const expectedAction = {
        type: 'UPDATE_DOWNLOADING',
        downloading: true
      }
      expect(actions.updateDownloading(true)).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, { type: 'NOOP' })
      ).toEqual({ downloading: false })
    })

    it('should handle UPDATE_DOWNLOADING', () => {
      expect(
        reducer({ downloading: false }, {
          type: 'UPDATE_DOWNLOADING',
          downloading: true
        })
      ).toEqual({ downloading: true })
    })
  })
})
