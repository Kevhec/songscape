export interface WikiData {
  entities: Entities;
  success: number;
}

type Entities = Record<string, EntititesBody>;

export interface EntititesBody {
  type: string;
  id: string;
  claims: Claims;
}

export interface Claims {
  P18: P18[];
}

export interface P18 {
  mainsnak: Mainsnak;
  type: string;
  qualifiers: Qualifiers;
  'qualifiers-order': string[];
  id: string;
  rank: string;
}

export interface Mainsnak {
  snaktype: string;
  property: string;
  hash: string;
  datavalue: MainsnakDatavalue;
  datatype: string;
}

export interface MainsnakDatavalue {
  value: string;
  type: string;
}

export interface Qualifiers {
  P2096: P2096[];
  P585: P585[];
}

export interface P2096 {
  snaktype: string;
  property: string;
  hash: string;
  datavalue: P2096Datavalue;
  datatype: string;
}

export interface P2096Datavalue {
  value: PurpleValue;
  type: string;
}

export interface PurpleValue {
  text: string;
  language: string;
}

export interface P585 {
  snaktype: string;
  property: string;
  hash: string;
  datavalue: P585Datavalue;
  datatype: string;
}

export interface P585Datavalue {
  value: FluffyValue;
  type: string;
}

export interface FluffyValue {
  time: string;
  timezone: number;
  before: number;
  after: number;
  precision: number;
  calendarmodel: string;
}
