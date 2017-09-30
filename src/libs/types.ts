export interface CampsiteNoId {
  name: string;
  description: string;
  position: Position | null;
  facilities: Facilities;
  access: Access;
  parkName: string;
}

// This is the how campsites are stored in the state
export interface Campsite extends CampsiteNoId {
  _id: string;
}

// This is how campsites are in the props
export interface CampsiteWithStarred extends Campsite {
  starred: boolean;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Access {
  caravans: boolean | undefined;
  trailers: boolean | undefined;
  car: boolean | undefined;
}

export interface Facilities {
  toilets: "flush" | "non_flush" | "none" | boolean | undefined;
  picnicTables: boolean | undefined;
  barbecues: "wood" | "gas_electric" | "none" | boolean | undefined;
  showers: "hot" | "cold" | "none" | boolean | undefined;
  drinkingWater: boolean | undefined;
}
