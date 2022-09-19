export interface InventoryAttributesDto {
  _display_name: InventoryAttributeDto;
  _transaction_type: InventoryAttributeDto;
  _created: InventoryAttributeDto;
  _trigger: InventoryAttributeDto;
  perishable: InventoryAttributeDto;
  expiry_date: InventoryAttributeDto;
  type: InventoryAttributeDto;
  source: InventoryAttributeDto;
  maker: InventoryAttributeDto;
  category: InventoryAttributeDto;
  subcategory: InventoryAttributeDto;
  master_item: InventoryAttributeDto;
  unit_of_measure: InventoryAttributeDto;
  location: InventoryAttributeDto;
  qty: InventoryAttributeDto;
  model: InventoryAttributeDto;
  sku: InventoryAttributeDto;
  color: InventoryAttributeDto;
  edit_reason: InventoryAttributeDto;
  _id: InventoryAttributeDto;
  __v: InventoryAttributeDto;
}

export interface InventoryAttributeDto {
  defaultValue?: boolean;
  enumValues?: {[key: string]: string | number | boolean}[] | (string | number)[];
  getters: {[key: string]: string | number | boolean}[] | (string | number)[];
  instance: string;
  isRequired?: boolean;
  options: OptionsDto;
  originalRequiredValue?: boolean;
  path: string;
  regExp?: string;
  setters: {[key: string]: string | number | boolean}[] | (string | number)[];
  validators: ValidatorDto[];
  _index?: string;
}

interface OptionsDto {
  auto?: boolean;
  default?: boolean;
  required?: boolean;
}

export interface ValidatorDto {
  message: string;
  type: string;
}
