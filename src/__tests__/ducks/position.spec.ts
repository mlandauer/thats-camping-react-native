import * as expect from 'expect'
import * as actions from '../../ducks/position'
import reducer from '../../ducks/position'

describe ('position', () => {
  describe('actions', () => {
    it('updatePosition', () => {
      const expectedAction = {
        type: 'UPDATE_POSITION',
        position: {lat: 1.0, lng: 2.0}
      }
      expect(actions.updatePosition(1.0, 2.0)).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {type: 'NOOP'})
      ).toEqual(null)
    })

    it('should handle UPDATE_POSITION', () => {
      expect(
        reducer({lat: 1.0, lng: 2.0}, {
          type: 'UPDATE_POSITION',
          position: {lat: 3.0, lng: 4.0}
        })
      ).toEqual({lat: 3.0, lng: 4.0})
    })
  })
})
