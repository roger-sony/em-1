import {QuantityDto} from './quantity.dto';

export interface InventoryItemDto {
  _id: string;
  __v: number;
  _display_name: string;
  _edited: boolean;
  active: boolean;
  category: string;
  last_updated: string;
  maker: string;
  master_item: string;
  qty: QuantityDto;
  source: string;
  subcategory: string;
  unit_of_measure: string;
  type: string;
  perishable: boolean;
  location: string;
  expiry_date: string;
  sku: string;
  color: string;
  model: string;
  _chapterIDs: string[];
}
