import { TransportServiceType, VehicleType } from "@prisma/client"
import prisma from "../utils/db.utils";

export interface ICreateTransportVoucher {
  transactionId: string
  driverName: string
  driverContact: string
  remarks?: string
  vehiclePlateNumber: string
  serviceType: TransportServiceType
  vehicleType: VehicleType
  attachments?: string[];
  timeBegins?: Date;
  timeEnds?: Date;
  dateOfService?: Date;
}
export interface IUpdateTransportVoucher {
  id: string
  driverName: string
  driverContact: string
  remarks?: string
  vehiclePlateNumber: string
  serviceType: TransportServiceType
  vehicleType: VehicleType
  attachments?: string[];
  timeBegins?: Date;
  timeEnds?: Date;
  dateOfService?: Date;
}

export async function createTransportVoucher(data: ICreateTransportVoucher) {

  return await prisma.transportation.create({
    data
  })
}
export async function updateTransportVoucher({ id, ...data }: IUpdateTransportVoucher) {
  return await prisma.transportation.update({
    where: {
      id: id
    },
    data
  })
}
export async function deleteTransportVoucher(id: string) {
  return await prisma.transportation.delete({
    where: {
      id: id
    }
  })
}
