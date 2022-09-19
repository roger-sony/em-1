import {ChecklistItem} from 'src/app/core/model/checklist-item';
import {Sentence} from './sentence';
import {CadenceForm} from './form/cadence-form';

export interface Paragraph {
  assignedTo: string[];
  assignedToUser: string[];
  cadence?: CadenceForm[];
  derivedEffort?: number;
  id?: string;
  lexicon?: string;
  movability: number;
  name: string;
  paragraphId: string;
  priority: number;
  score?: number;
  sentences?: Sentence[];
  startedAt?: string;
  startDateTime: Date;
  status?: string;
  unpleasantness: number;
  location?: string;
  category?: string;
  instructions?: string;
  checkList?: ChecklistItem[];
}
