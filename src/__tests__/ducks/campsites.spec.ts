import * as expect from 'expect'
import * as actions from '../../ducks/campsites'
import reducer from '../../ducks/campsites'
import { Facilities } from '../../libs/types'

describe('campsites', () => {
  describe('actions', () => {
    it('addCampsites', () => {
      const facilities: Facilities = {
        toilets: "none",
        picnicTables: false,
        barbecues: "none",
        showers: "none",
        drinkingWater: false
      }
      const campsite = {
        id: 1,
        name: "A campsite",
        description: "A nice campsite",
        position: null,
        facilities: facilities,
        access: {
          caravans: false,
          trailers: false,
          car: false
        },
        parkName: 'A park'
      }
      const campsites = [campsite]
      const expectedAction = {
        type: 'ADD_CAMPSITES',
        campsites: campsites
      }
      expect(actions.addCampsites(campsites)).toEqual(expectedAction)
    })
  }),

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {type: "NOOP"})
      ).toEqual({})
    })

    it('should convert empty position for campsite to undefined', () => {
      let campsite = {
        id: 1,
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
        parkName: "A park"
      }
      expect(reducer(undefined, {
        type: 'ADD_CAMPSITES',
        campsites: [campsite]
      })).toEqual({1: {
        id: 1,
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
        parkName: "A park"
      }})
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
        position: {lat: 1.0, lng: 2.0}
      }

      const campsite1 = Object.assign({}, templateCampsite, {
        id: 1,
        name: "A campsite"
      })
      const campsite2 = Object.assign({}, templateCampsite, {
        id: 2,
        name: "Another campsite"
      })
      const campsite3 = Object.assign({}, templateCampsite, {
        id: 3,
        name: "And another"
      })
      expect(
        reducer({1: campsite1}, {
          type: 'ADD_CAMPSITES',
          campsites: [campsite2, campsite3]
        })
      ).toEqual({1: campsite1, 2: campsite2, 3: campsite3})
    })
  })
})
