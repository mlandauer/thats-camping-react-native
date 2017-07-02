import * as TextFormatter from '../../libs/TextFormatter'

describe('TextFormatter', () => {
  describe("access", () => {
    it('accessText', () => {
      expect(TextFormatter.accessText({caravans: true, trailers: undefined, car: undefined})).toEqual("For caravans")
    })

    it('accessText', () => {
      expect(TextFormatter.accessText({caravans: true, trailers: true, car: true}))
        .toEqual("For caravans, trailers and car camping")
    })

    it('accessText', () => {
      expect(TextFormatter.accessText({caravans: false, trailers: true, car: true}))
        .toEqual("For trailers and car camping but not for caravans")
    })

    it('accessText', () => {
      expect(TextFormatter.accessText({caravans: false, trailers: true, car: false}))
        .toEqual("For trailers but not for caravans and car camping")
    })

    it('accessText', () => {
      expect(TextFormatter.accessText({caravans: false, trailers: false, car: false}))
        .toEqual("Not for caravans, trailers and car camping")
    })

    it('caravans', () => {
      expect(TextFormatter.caravans(true)).toEqual({"have": "caravans"})
      expect(TextFormatter.caravans(false)).toEqual({"notHave": "caravans"})
      expect(TextFormatter.caravans(undefined)).toEqual({})
    })

    it('trailers', () => {
      expect(TextFormatter.trailers(true)).toEqual({"have": "trailers"})
      expect(TextFormatter.trailers(false)).toEqual({"notHave": "trailers"})
      expect(TextFormatter.trailers(undefined)).toEqual({})
    })

    it('car', () => {
      expect(TextFormatter.car(true)).toEqual({"have": "car camping"})
      expect(TextFormatter.car(false)).toEqual({"notHave": "car camping"})
      expect(TextFormatter.car(undefined)).toEqual({})
    })
  })

  describe("facilities", () => {
    it('facilitiesText', () => {
      expect(TextFormatter.facilitiesText({toilets: "flush", picnicTables: true, drinkingWater: true, barbecues: undefined, showers: undefined}))
        .toEqual("Has flush toilets, picnic tables and drinking water")
    })

    it('facilitiesText', () => {
      expect(TextFormatter.facilitiesText({toilets: "flush", picnicTables: false, drinkingWater: true, barbecues: undefined, showers: undefined}))
        .toEqual("Has flush toilets and drinking water but no picnic tables")
    })

    it('facilitiesText', () => {
      expect(TextFormatter.facilitiesText({toilets: "flush", picnicTables: false, drinkingWater: false, barbecues: undefined, showers: undefined}))
        .toEqual("Has flush toilets but no picnic tables and drinking water")
    })

    it('facilitiesText', () => {
      expect(TextFormatter.facilitiesText({toilets: "none", picnicTables: false, drinkingWater: false, barbecues: undefined, showers: undefined}))
        .toEqual("No toilets, picnic tables and drinking water")
    })

    it('toilets', () => {
      expect(TextFormatter.toilets("flush")).toEqual({"have": "flush toilets"})
      expect(TextFormatter.toilets("non_flush")).toEqual({"have": "non-flush toilets"})
      expect(TextFormatter.toilets("none")).toEqual({"notHave": "toilets"})
      expect(TextFormatter.toilets(undefined)).toEqual({})
    })

    it('picnicTables', () => {
      expect(TextFormatter.picnicTables(true)).toEqual({"have": "picnic tables"})
      expect(TextFormatter.picnicTables(false)).toEqual({"notHave": "picnic tables"})
      expect(TextFormatter.picnicTables(undefined)).toEqual({})
    })

    it('barbecues', () => {
      expect(TextFormatter.barbecues("wood")).toEqual({"have": "wood BBQs"})
      expect(TextFormatter.barbecues("gas_electric")).toEqual({"have": "gas/electric BBQs"})
      expect(TextFormatter.barbecues("none")).toEqual({"notHave": "BBQs"})
      expect(TextFormatter.barbecues(undefined)).toEqual({})
    })

    it('showers', () => {
      expect(TextFormatter.showers("hot")).toEqual({"have": "hot showers"})
      expect(TextFormatter.showers("cold")).toEqual({"have": "cold showers"})
      expect(TextFormatter.showers("none")).toEqual({"notHave": "showers"})
      expect(TextFormatter.showers(undefined)).toEqual({})
    })

    it('drinkingWater', () => {
      expect(TextFormatter.drinkingWater(true)).toEqual({"have": "drinking water"})
      expect(TextFormatter.drinkingWater(false)).toEqual({"notHave": "drinking water"})
      expect(TextFormatter.drinkingWater(undefined)).toEqual({})
    })
  })

  it('merge', () => {
    var original = {"have": ["foo", "bar"], "notHave": ["squiggle"]}
    TextFormatter.merge(original, {})
    expect(original).toEqual({"have": ["foo", "bar"], "notHave": ["squiggle"]})
  })

  it('merge', () => {
    var original = {"have": ["foo", "bar"], "notHave": ["squiggle"]}
    TextFormatter.merge(original, {"have": "a"})
    expect(original).toEqual({"have": ["foo", "bar", "a"], "notHave": ["squiggle"]})
  })

  it('merge', () => {
    var original = {"have": ["foo", "bar"], "notHave": ["squiggle"]}
    TextFormatter.merge(original, {"notHave": "b"})
    expect(original).toEqual({"have": ["foo", "bar"], "notHave": ["squiggle", "b"]})
  })

  describe('capitaliseFirstLetter', () => {
    it("shouldn't do anything to an empty string", () => {
      expect(TextFormatter.capitaliseFirstLetter("")).toEqual("")
    })

    it("should capitalise the first letter", () => {
      expect(TextFormatter.capitaliseFirstLetter("a book")).toEqual("A book")
    })

    it("shouldn't do anything if the first letter is already capitalised", () => {
      expect(TextFormatter.capitaliseFirstLetter("Hello World")).toEqual("Hello World")
    })
  })

})
