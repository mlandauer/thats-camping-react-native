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

    it('updateProgress', () => {
      const expectedAction = {
        type: 'UPDATE_PROGRESS',
        progress: 0.5
      }
      expect(actions.updateProgress(0.5)).toEqual(expectedAction)
    })

    it('updateMessage', () => {
      const expectedAction = {
        type: 'UPDATE_MESSAGE',
        message: "Hello"
      }
      expect(actions.updateMessage("Hello")).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, { type: 'NOOP' })
      ).toEqual({ downloading: false, progress: 0, message: null })
    })

    it('should handle UPDATE_DOWNLOADING', () => {
      expect(
        reducer({ downloading: false, progress: 0, message: null }, {
          type: 'UPDATE_DOWNLOADING',
          downloading: true
        })
      ).toEqual({ downloading: true, progress: 0, message: null })
    })

    it('should handle UPDATE_PROGRESS', () => {
      expect(
        reducer({ downloading: true, progress: 0, message: null }, {
          type: 'UPDATE_PROGRESS',
          progress: 0.2
        })
      ).toEqual({ downloading: true, progress: 0.2, message: null })
    })

    it('should handle UPDATE_MESSAGE', () => {
      expect(
        reducer({ downloading: true, progress: 0, message: null }, {
          type: 'UPDATE_MESSAGE',
          message: "Hello"
        })
      ).toEqual({ downloading: true, progress: 0, message: "Hello" })
    })
  })
})
