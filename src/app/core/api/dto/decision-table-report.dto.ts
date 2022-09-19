import {DecisionTableFactDto, DecisionTableRuleDto} from './decision-table.dto';

export interface DecisionTableReportDto {
  table_rules: DecisionTableRuleDto[];
  ref_fact: DecisionTableFactDto[];
  _id: string;
  triggerActions: boolean;
  dtableID: string;
  display_name: string;
  _dateCreated: string;
  __v: number;
}
