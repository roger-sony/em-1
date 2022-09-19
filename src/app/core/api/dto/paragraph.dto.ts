import {CadenceFormDto} from './cadence-form.dto';
import {SentenceDto} from './sentence.dto';

export interface ParagraphDto {
  assignedTo: string[];
  assignedToUser: string[];
  derivedEffort: number;
  _id: string;
  lexicon: string;
  movability: number;
  name: string;
  paragraphID: string;
  priority: number;
  cadence: CadenceFormDto[];
  score: number;
  sentences: SentenceDto[];
  startedAt: string;
  startDateTime: Date;
  status: string;
  unpleasantness?: number;
}
