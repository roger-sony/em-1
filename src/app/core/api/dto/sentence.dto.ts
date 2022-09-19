import {Adjective} from '../../model/adjective';

export interface SentenceDto {
  _id?: string;
  verb: SentenceVerbDto;
  noun: SentenceNounDto;
  priority: number;
  movability: number;
  effort: number;
  lexicon: string;
  plot: string;
  blkUpdate?: number;
}

export interface SentenceNounDto {
  active: boolean;
  adjectives: Adjective[];
  batchID: string;
  createdAt: string;
  _id: string;
  name: string;
  updatedAt: string;
  version: number;
}

export interface SentenceVerbDto {
  _id?: string;
  name: string;
  description?: string;
}
