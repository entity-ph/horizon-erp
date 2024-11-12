
export interface IAccommodationVoucher {
  id: string;
  transactionId: string;
  transaction?: any;
  name: string;
  type: AccommodationType;
  checkinDate: Date;
  checkoutDate: Date;
  hotelConfirmationNumber: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}


export enum AccommodationType {
  HOTEL = 'HOTEL',
  RESORT = 'RESORT',
  AIRBNB = 'AIRBNB',
  OTHERS = 'OTHERS',
}

export interface IAddAccommodation {
  transactionId: string;
  name: string;
  type: AccommodationType;
  checkinDate: Date;
  checkoutDate: Date;
  hotelConfirmationNumber: string;
  remarks?: string;
}
