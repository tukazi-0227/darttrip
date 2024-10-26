export interface Genre {
  Name: string;
}

export interface Station {
  Name: string;
  Distance?: number;
}

export interface Geometry {
  Coordinates: string;
}

export interface Property {
  Genre?: Genre[];
  Address?: string;
  Tel1?: string;
}

export interface SearchResultItem {
  Name?: string;
  Genre?: string;
  Category?: string[];
  Property?: Property;
  Station?: Station[];
  Geometry?: Geometry;
}