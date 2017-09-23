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

export interface Fields {
  have: string[];
  notHave: string[];
  unknown: string[];
}

interface Field {
  have?: string;
  notHave?: string;
  unknown?: string;
}

function listAsText(list: string[]): string | null {
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

export function listAsTextCapitalized(list: string[]): string | null {
  let text = listAsText(list)
  if (text) {
    text = capitalizeFirstLetter(text)
  }
  return text
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function facilitiesFields(facilities: Facilities): Fields {
  let r: Fields = { "have": [], "notHave": [], "unknown": [] }
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
  if (t.unknown) {
    r.unknown.push(t.unknown)
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
      return { "unknown": "toilets"}
  }
}

export function picnicTables(picnicTables: boolean | undefined) {
  switch (picnicTables) {
    case true:
      return { "have": "picnic tables" }
    case false:
      return { "notHave": "picnic tables" }
    default:
      return { "unknown": "picnic tables" }
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
      return { "unknown": "BBQs" }
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
      return { "unknown": "showers" }
  }
}

export function drinkingWater(drinkingWater: boolean | undefined) {
  switch (drinkingWater) {
    case true:
      return { "have": "drinking water" }
    case false:
      return { "notHave": "drinking water" }
    default:
      return { "unknown": "drinking water" }
  }
}

export function accessFields(access: Access): Fields {
  var r: Fields = { "have": [], "notHave": [], "unknown": [] }
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
      return { "unknown": "caravans" }
  }
}

export function trailers(trailers: boolean | undefined) {
  switch (trailers) {
    case true:
      return { "have": "trailers" }
    case false:
      return { "notHave": "trailers" }
    default:
      return { "unknown": "trailers" }
  }
}

export function car(car: boolean | undefined) {
  switch (car) {
    case true:
      return { "have": "car camping" }
    case false:
      return { "notHave": "car camping" }
    default:
      return { "unknown": "car camping" }
  }
}
