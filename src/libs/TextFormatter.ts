import { Facilities, Access } from '../libs/types'

export function distanceText(distance: number | undefined): string {
  if (distance == undefined) {
    return "";
  }

  // Distance needs to be in metres
  var units = undefined
  if (distance > 1000) {
    distance /= 1000;
    units = "km";
  }
  else {
    units = "m"
  }
  return (distance.toFixed(0) + " " + units);
}

export function bearingText(bearing: number | undefined): string {
  if (bearing == undefined) {
    return "";
  }
  // Dividing the compass into 8 sectors that are centred on north
  var sector = Math.floor(((bearing + 22.5) % 360.0) / 45.0);
  var sectorNames = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return sectorNames[sector];
}

interface Fields {
  have: string[];
  notHave: string[];
}

interface Field {
  have?: string;
  notHave?: string;
}

export function listAsText(list: string[]): string | null {
  if (list.length == 0) {
    return null;
  }
  else if (list.length == 1) {
    return list[0];
  }
  else {
    return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
  }
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function facilitiesFields(facilities: Facilities): Fields {
  let r: Fields = { "have": [], "notHave": [] }
  merge(r, toilets(facilities.toilets))
  merge(r, picnicTables(facilities.picnicTables))
  merge(r, barbecues(facilities.barbecues))
  merge(r, showers(facilities.showers))
  merge(r, drinkingWater(facilities.drinkingWater))
  return r;
}

// WARNING changes r
export function merge(r: Fields, t: Field): Fields {
  // TODO Generalise this
  if (t.have) {
    r.have.push(t.have)
  }
  if (t.notHave) {
    r.notHave.push(t.notHave)
  }
  return r
}

export function toilets(toilets: string | undefined) {
  switch (toilets) {
    case "flush":
      return { "have": "flush toilets" }
    case "non_flush":
      return { "have": "non-flush toilets" }
    case "none":
      return { "notHave": "toilets" }
    default:
      return {}
  }
}

export function picnicTables(picnicTables: boolean | undefined) {
  switch (picnicTables) {
    case true:
      return { "have": "picnic tables" }
    case false:
      return { "notHave": "picnic tables" }
    default:
      return {}
  }
}

export function barbecues(barbecues: string | undefined) {
  switch (barbecues) {
    // TODO: show whether you need to bring your own firewood elsewhere
    // Like "You will need to bring firewood (if you want to use the wood BBQs) and drinking water"
    case "wood":
      return { "have": "wood BBQs" }
    case "gas_electric":
      return { "have": "gas/electric BBQs" }
    case "none":
      return { "notHave": "BBQs" }
    default:
      return {}
  }
}

export function showers(showers: string | undefined) {
  switch (showers) {
    case "hot":
      return { "have": "hot showers" }
    case "cold":
      return { "have": "cold showers" }
    case "none":
      return { "notHave": "showers" }
    default:
      return {}
  }
}

export function drinkingWater(drinkingWater: boolean | undefined) {
  switch (drinkingWater) {
    case true:
      return { "have": "drinking water" }
    case false:
      return { "notHave": "drinking water" }
    default:
      return {}
  }
}

export function accessFields(access: Access): Fields {
  var r: Fields = { "have": [], "notHave": [] }
  merge(r, caravans(access.caravans))
  merge(r, trailers(access.trailers))
  merge(r, car(access.car))
  return r
}

export function caravans(caravans: boolean | undefined) {
  switch (caravans) {
    case true:
      return { "have": "caravans" }
    case false:
      return { "notHave": "caravans" }
    default:
      return {}
  }
}

export function trailers(trailers: boolean | undefined) {
  switch (trailers) {
    case true:
      return { "have": "trailers" }
    case false:
      return { "notHave": "trailers" }
    default:
      return {}
  }
}

export function car(car: boolean | undefined) {
  switch (car) {
    case true:
      return { "have": "car camping" }
    case false:
      return { "notHave": "car camping" }
    default:
      return {}
  }
}
