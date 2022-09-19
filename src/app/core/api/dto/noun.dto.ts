import {Adjective} from '../../model/adjective';

export interface NounDto {
  active: boolean;
  adjectives: Adjective[];
  batchID?: string;
  chapterIDs: string[];
  createdBy: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  version?: number;
}

export interface NounFromServiceDto {
  active: boolean;
  adjectives: Adjective[];
  batchID?: string;
  chapterIDs?: string[];
  createdAt?: string;
  createdBy?: string;
  name: string;
  updatedAt: string;
  ['__v']?: number;
  ['_id']?: string;
}

export class Noun {
  private noun: NounDto = {
    active: true,
    adjectives: [],
    batchID: null,
    id: null,
    name: null,
    createdAt: null,
    createdBy: null,
    chapterIDs: [],
    updatedAt: null,
    version: 0,
  };

  constructor(noun: NounFromServiceDto) {
    this.noun.active = noun.active;
    this.noun.adjectives = noun.adjectives;
    this.noun.batchID = noun.batchID || null;
    this.noun.chapterIDs = noun.chapterIDs;
    this.noun.createdBy = noun.createdBy;
    this.noun.createdAt = noun.createdAt;
    this.noun.id = noun['_id'];
    this.noun.name = noun.name;
    this.noun.updatedAt = noun.updatedAt;
    this.noun.version = noun['__v'];
  }

  getNoun() {
    return this.noun;
  }
}
