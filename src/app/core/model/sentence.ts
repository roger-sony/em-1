import {Adjective} from './adjective';

export interface Sentence {
  id?: string;
  verb: SentenceVerb;
  noun: SentenceNoun;
  priority: number;
  movability: number;
  effort: number;
  lexicon?: string;
  plot?: string;
  blkUpdate?: number;
}

export interface SentenceNoun {
  active: boolean;
  adjectives: Adjective[];
  batchID: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  version: number;
}

export interface SentenceVerb {
  id?: string;
  name: string;
  description?: string;
}
