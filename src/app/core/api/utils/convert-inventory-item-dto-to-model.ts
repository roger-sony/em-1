import {InventoryItem} from '../../model/inventory-item';
import {InventoryItemDto} from '../dto/inventory-item.dto';

export function convertInventoryItemDtoToModel(dto: InventoryItemDto): InventoryItem {
  return {
    active: dto.active,
    category: dto.category,
    color: dto.color,
    displayName: dto._display_name,
    edited: dto._edited,
    expiryDate: dto.expiry_date && new Date(dto.expiry_date),
    id: dto._id,
    lastUpdated: dto.last_updated && new Date(dto.last_updated),
    location: dto.location,
    maker: dto.maker,
    masterItem: dto.master_item,
    model: dto.model,
    perishable: dto.perishable,
    quantity: dto.qty,
    sku: dto.sku,
    source: dto.source,
    subcategory: dto.subcategory,
    type: dto.type,
    unitOfMeasure: dto.unit_of_measure,
    chapterIds: dto._chapterIDs || [],
  };
}
