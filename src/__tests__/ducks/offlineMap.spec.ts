import * as expect from 'expect'
import * as actions from '../../ducks/offlineMap'
import reducer from '../../ducks/offlineMap'

describe('position', () => {
  describe('actions', () => {
    it('updateProgress', () => {
      const expectedAction = {
        type: 'UPDATE_PROGRESS',
        progress: 0.5
      }
      expect(actions.updateProgress(0.5)).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, { type: 'NOOP' })
      ).toEqual({ progress: 0 })
    })

    it('should handle UPDATE_PROGRESS', () => {
      expect(
        reducer({ progress: 0 }, {
          type: 'UPDATE_PROGRESS',
          progress: 0.2
        })
      ).toEqual({ progress: 0.2 })
    })
  })
})
