import {Quantity} from './quantity';

export interface InventoryItem {
  active: boolean;
  category: string;
  chapterIds?: string[];
  color: string;
  displayName: string;
  edited: boolean;
  expiryDate: Date;
  id: string;
  lastUpdated: Date;
  location: string;
  maker: string;
  masterItem: string;
  model: string;
  perishable: boolean;
  quantity: Quantity;
  sku: string;
  source: string;
  subcategory: string;
  type: string;
  unitOfMeasure: string;
}
