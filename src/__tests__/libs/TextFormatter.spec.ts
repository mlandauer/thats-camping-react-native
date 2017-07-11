import * as TextFormatter from '../../libs/TextFormatter'

describe('TextFormatter', () => {
  describe("access", () => {
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
})
