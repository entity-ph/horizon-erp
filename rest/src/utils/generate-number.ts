import { OfficeBranch } from "@prisma/client";
import dayjs from "dayjs";

export function getNextMemorandumNumber(lastMemoNumber: string | null, branch: string) {
  const today = dayjs().format('MMDDYYYY');
  let newNumber = 1;
  let branchCode
  switch (branch) {
    case 'CEBU': branchCode = 'CEB'
      break;
    case 'CALBAYOG': branchCode = 'CAL'
      break;
    case 'FUENTE': branchCode = 'FUENTE'
      break;
  }

  if (lastMemoNumber) {
    const numericPart = parseInt(lastMemoNumber.split('-')[0]);
    newNumber = numericPart + 1;
  }

  const paddedNumber = String(newNumber).padStart(3, '0');

  return `${paddedNumber}-${today}-${branchCode}`;
}


export function getNextDtsNumber(lastDtsNumber: string | null, officeBranch: string) {
  let newNumber = 1;
  let branchCode
  switch (officeBranch) {
    case 'CEBU': branchCode = 'CEB'
      break;
    case 'CALBAYOG': branchCode = 'CAL'
      break;
    case 'FUENTE': branchCode = 'FUENTE'
      break;
  }

  if (lastDtsNumber) {
    const numericPart = parseInt(lastDtsNumber.slice(3, 8));
    newNumber = numericPart + 1;
  }
  const paddedNumber = String(newNumber).padStart(5, '0');
  const today = dayjs().format('MMDDYYYY');

  return `DTS${paddedNumber}-${today}-${branchCode}`;
}


export function getNextTransactionNumber(lastTransactionNumber: string | null, branch: OfficeBranch) {
  const today = dayjs().format('MMDDYYYY');
  let newTransactionNumber = '001';
  let branchCode
  switch (branch) {
    case 'CEBU': branchCode = 'CEB'
      break;
    case 'CALBAYOG': branchCode = 'CAL'
      break;
    case 'FUENTE': branchCode = 'FUENTE'
      break;
  }

  if (lastTransactionNumber) {
    const numericPart = lastTransactionNumber.slice(1, 4);

    if (numericPart) {
      newTransactionNumber = (parseInt(numericPart) + 1).toString().padStart(3, '0');
    }
  }

  return `T${newTransactionNumber}-${today}-${branchCode}`;
}


export function getNextSerialNumber(lastSerialNumber: string | null, branch: string) {
  const today = dayjs().format('MMDDYYYY');
  let newNumber
  let branchCode
  switch (branch) {
    case 'CEBU': branchCode = 'CEB'
      newNumber = 251
      break;
    case 'CALBAYOG': branchCode = 'CAL'
      newNumber = 1451
      break;
    case 'FUENTE': branchCode = 'FUENTE'
      newNumber = 1
      break;
  }

  if (lastSerialNumber) {
    const numericPart = parseInt(lastSerialNumber.slice(2, 7));
    newNumber = numericPart + 1;
  }

  const paddedNumber = String(newNumber).padStart(5, '0');


  return `SA${paddedNumber}-${today}-${branchCode}`;
}

export function getNextPurchaseRequestNumber(lastSerialNumber: string | null, officeBranch: string) {
  const today = dayjs().format('MMDDYYYY');
  let newNumber
  let branchCode
  switch (officeBranch) {
    case 'CEBU': branchCode = 'CEB'
      newNumber = 551
      break;
    case 'CALBAYOG': branchCode = 'CAL'
      newNumber = 2551
      break;
    case 'FUENTE': branchCode = 'FUENTE'
      newNumber = 1
      break;
  }
  if (lastSerialNumber) {
    const numericPart = parseInt(lastSerialNumber.slice(2, 7));
    newNumber = numericPart + 1;
  }

  const paddedNumber = String(newNumber).padStart(5, '0');

  return `PO${paddedNumber}-${today}-${branchCode}`;
}


export function getNextPackageNumber(lastSerialNumber: string | null, officeBranch: string) {
  const today = dayjs().format('MMDDYYYY');
  let newNumber
  let branchCode
  switch (officeBranch) {
    case 'CEBU': branchCode = 'CEB'
      newNumber = 501
      break;
    case 'CALBAYOG': branchCode = 'CAL'
      newNumber = 1
      break;
    case 'FUENTE': branchCode = 'FUENTE'
      newNumber = 1
      break;
  }
  if (lastSerialNumber) {
    const numericPart = parseInt(lastSerialNumber.slice(2, 7));
    newNumber = numericPart + 1;
  }

  const paddedNumber = String(newNumber).padStart(5, '0');

  return `P${paddedNumber}-${today}-${branchCode}`;
}
