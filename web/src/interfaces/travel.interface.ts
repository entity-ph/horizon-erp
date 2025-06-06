export enum TravelVoucherType {
  AIRLINES = "AIRLINES",
  SHIPPING = "SHIPPING"
}

export interface IAirline {
  id: string;
  name: string
  code: string
  dateOfTravel: Date
  dateOfArrival: Date
  etd: Date
  eta: Date
  origin: string
  destination: string
  travelId?: string
}

export interface IShipping {
  id: string;
  name: string;
  voyageNumber: string;
  dateOfTravel: Date;
  etd: Date;
  origin: string;
  destination: string;
  travelId?: string
}

export interface ITravelVoucher {
  id: string;
  transactiondId: string;
  type: TravelVoucherType
  airline?: IAirline
  shipping?: IShipping
  createdAt: Date;
  updatedAt: Date;
}
