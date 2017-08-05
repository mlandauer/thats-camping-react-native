import * as expect from 'expect'
import * as CampsitesJson from '../../libs/CampsitesJson'

describe('CampsitesJson', () => {
  describe('convertJson', () => {
    it('should convert empty position for campsite to undefined', () => {
      let park = {
        id: 1,
        name: "A park",
        description: "A nice park",
        campsite_ids: []
      }
      let campsite = {
        id: 1,
        name: "A campsite",
        description: "A nice campsite",
        position: {},
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
        park_id: 1
      }
      let json = {
        campsites: [campsite],
        parks: [park]
      }
      let expected = [{
        _id: '1',
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
      }]

      expect(CampsitesJson.convertJson(json)).toEqual(expected)
    })
  })
})
