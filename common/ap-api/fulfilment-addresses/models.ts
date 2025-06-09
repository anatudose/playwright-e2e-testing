export interface FulfillmentAddresses {
  id?: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  createdBy?: string;
  updatedBy?: string;
  code?: string;
  type?: string;
  name?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string
  country?: Country;
}

export interface Country {
  countryCode?: string;
  countryName?: string;
}
