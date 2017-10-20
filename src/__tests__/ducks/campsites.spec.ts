import * as expect from 'expect'
import * as actions from '../../ducks/campsites'
import reducer from '../../ducks/campsites'
import { Facilities } from '../../libs/types'

describe('campsites', () => {
  describe('actions', () => {
    it('updateCampsites', () => {
      const facilities: Facilities = {
        toilets: "none",
        picnicTables: false,
        barbecues: "none",
        showers: "none",
        drinkingWater: false
      }
      const campsite = {
        _id: '1',
        _rev: '1',
        name: "A campsite",
        description: "A nice campsite",
        position: null,
        facilities: facilities,
        access: {
          caravans: false,
          trailers: false,
          car: false
        },
        parkName: 'A park',
        bookings: null
      }
      const campsites = [campsite]
      const expectedAction = {
        type: 'UPDATE_CAMPSITES',
        campsites: campsites
      }
      expect(actions.updateCampsites(campsites)).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, { type: "NOOP" })
      ).toEqual({})
    })

    it('should convert empty position for campsite to undefined', () => {
      let campsite = {
        _id: '1',
        _rev: 'a',
        name: "A campsite",
        description: "A nice campsite",
        position: null,
        facilities: {
          toilets: 'none' as 'none',
          picnicTables: false,
          barbecues: 'none' as 'none',
          showers: 'none' as 'none',
          drinkingWater: false
        },
        access: {
          caravans: false,
          trailers: false,
          car: false
        },
        parkName: "A park",
        bookings: null
      }
      expect(reducer(undefined, {
        type: 'UPDATE_CAMPSITES',
        campsites: [campsite]
      })).toEqual({
        '1': {
          _id: '1',
          _rev: 'a',
          name: "A campsite",
          description: "A nice campsite",
          position: null,
          facilities: {
            toilets: 'none' as 'none',
            picnicTables: false,
            barbecues: 'none' as 'none',
            showers: 'none' as 'none',
            drinkingWater: false
          },
          access: {
            caravans: false,
            trailers: false,
            car: false
          },
          parkName: "A park",
          bookings: null
        }
      })
    })

    it('should handle ADD_CAMPSITES with existing campsites', () => {
      const facilities: Facilities = {
        toilets: 'none',
        picnicTables: false,
        barbecues: 'none',
        showers: 'none',
        drinkingWater: false
      }
      const templateCampsite = {
        description: "",
        parkName: 'A park',
        access: {
          caravans: false,
          trailers: false,
          car: false
        },
        facilities: facilities,
        position: { lat: 1.0, lng: 2.0 },
        bookings: null
      }

      const campsite1 = {
        ...templateCampsite,
        _id: '1',
        _rev: 'a',
        name: "A campsite"
      }
      const campsite2 = {
        ...templateCampsite,
        _id: '2',
        _rev: 'a',
        name: "Another campsite"
      }
      const campsite3 = {
        ...templateCampsite,
        _id: '3',
        _rev: 'a',
        name: "And another"
      }
      expect(
        reducer({ 1: campsite1 }, {
          type: 'UPDATE_CAMPSITES',
          campsites: [campsite2, campsite3]
        })
      ).toEqual({ 1: campsite1, 2: campsite2, 3: campsite3 })
    })
  })
})
