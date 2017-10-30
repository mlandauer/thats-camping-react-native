import * as expect from 'expect'
import * as actions from '../../ducks/synching'
import reducer from '../../ducks/synching'

describe('position', () => {
  describe('actions', () => {
    it('updateMapProgress', () => {
      const expectedAction = {
        type: 'UPDATE_MAP_PROGRESS',
        mapProgress: 0.5
      }
      expect(actions.updateMapProgress(0.5)).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, { type: 'NOOP' })
      ).toEqual({ mapProgress: 0 })
    })

    it('should handle UPDATE_MAP_PROGRESS', () => {
      expect(
        reducer({ mapProgress: 0 }, {
          type: 'UPDATE_MAP_PROGRESS',
          mapProgress: 0.2
        })
      ).toEqual({ mapProgress: 0.2 })
    })
  })
})
