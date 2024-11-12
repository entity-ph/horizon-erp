export interface ICreateAccommodationVoucher {
  transactionId: string
  type: AccommodationType
  name: string
  hotelConfirmationNumber: string
  checkinDate: Date
  checkoutDate: Date
  remarks?: string
}
export interface IUpdateAccommodationVoucher {
  type: AccommodationType
  name: string
  hotelConfirmationNumber: string
  checkinDate: Date
  checkoutDate: Date
  remarks?: string
}

import { AccommodationType } from "@prisma/client"
import prisma from "../utils/db.utils";

export async function createAccommodationVoucher(data: ICreateAccommodationVoucher) {
  return await prisma.accommodation.create({
    data
  })
}
export async function updateAccommodationVoucher(id: string, data: IUpdateAccommodationVoucher) {
  return await prisma.accommodation.update({
    where: {
      id: id
    },
    data
  })
}
export async function deleteAccommodationVoucher(id: string) {
  return await prisma.accommodation.delete({
    where: {
      id: id
    },
  })
}
