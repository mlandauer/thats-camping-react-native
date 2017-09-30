export interface CampsiteNoId {
  name: string;
  description: string;
  position: Position | null;
  facilities: Facilities;
  access: Access;
  parkName: string;
  // Use the following two fields to capture where this data is coming from
  // This defines a namespace in which the source_ids are unique
  source?: string;
  sourceId?: string;
}

// This is the how campsites are stored in the state
export interface Campsite extends CampsiteNoId {
  _id: string;
}

export interface CampsiteWithRev extends Campsite {
  _rev: string;
}

// This is how campsites are in the props
export interface CampsiteWithStarredRev extends CampsiteWithRev {
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
