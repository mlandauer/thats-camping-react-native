import * as expect from 'expect'
import * as CampsitesJson from '../../libs/CampsitesJson'

describe('CampsitesJson', () => {
  describe('convertJson', () => {
    it('should keep null position for campsite as null', () => {
      let campsite = {
        id: 1,
        name: "A campsite",
        parkName: "A park",
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
      }
      let json = [campsite]
      let expected = [{
        _id: '1',
        name: "A campsite",
        parkName: "A park",
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
        }
      }]

      expect(CampsitesJson.convertJson(json)).toEqual(expected)
    })
  })
})
