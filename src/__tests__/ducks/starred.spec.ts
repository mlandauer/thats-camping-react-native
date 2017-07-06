import * as expect from 'expect'
import * as actions from '../../ducks/starred'
import reducer from '../../ducks/starred'

describe('starred', () => {
  describe('actions', () => {
    it('toggleStarredCampsite', () => {
      const expectedAction = {
        type: 'TOGGLE_STARRED',
        campsite_id: 3
      }
      expect(actions.toggleStarredCampsite(3)).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {type: 'NOOP'})
      ).toEqual([])
    })

    it('should handle TOGGLE_STARRED', () => {
      expect(
        reducer([1, 5], {
          type: 'TOGGLE_STARRED',
          campsite_id: 3
        })
      ).toEqual([1, 5, 3])
    })

    it('should handle TOGGLE_STARRED', () => {
      expect(
        reducer([1, 5], {
          type: 'TOGGLE_STARRED',
          campsite_id: 1
        })
      ).toEqual([5])
    })
  })
})
