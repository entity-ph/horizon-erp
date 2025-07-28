"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMemorandumNumber = getNextMemorandumNumber;
exports.getNextDtsNumber = getNextDtsNumber;
exports.getNextTransactionNumber = getNextTransactionNumber;
exports.getNextSerialNumber = getNextSerialNumber;
exports.getNextPurchaseRequestNumber = getNextPurchaseRequestNumber;
exports.getNextPackageNumber = getNextPackageNumber;
const dayjs_1 = __importDefault(require("dayjs"));
function getNextMemorandumNumber(lastMemoNumber, branch) {
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    let newNumber = 1;
    let branchCode;
    switch (branch) {
        case 'CEBU':
            branchCode = 'CEB';
            break;
        case 'CALBAYOG':
            branchCode = 'CAL';
            break;
        case 'FUENTE':
            branchCode = 'FUENTE';
            break;
    }
    if (lastMemoNumber) {
        const numericPart = parseInt(lastMemoNumber.split('-')[0]);
        newNumber = numericPart + 1;
    }
    const paddedNumber = String(newNumber).padStart(3, '0');
    return `${paddedNumber}-${today}-${branchCode}`;
}
function getNextDtsNumber(lastDtsNumber, officeBranch) {
    let newNumber = 1;
    let branchCode;
    switch (officeBranch) {
        case 'CEBU':
            branchCode = 'CEB';
            break;
        case 'CALBAYOG':
            branchCode = 'CAL';
            break;
        case 'FUENTE':
            branchCode = 'FUENTE';
            break;
    }
    if (lastDtsNumber) {
        const numericPart = parseInt(lastDtsNumber.slice(3, 8));
        newNumber = numericPart + 1;
    }
    const paddedNumber = String(newNumber).padStart(5, '0');
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    return `DTS${paddedNumber}-${today}-${branchCode}`;
}
function getNextTransactionNumber(lastTransactionNumber, branch) {
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    let newTransactionNumber = '001';
    let branchCode;
    switch (branch) {
        case 'CEBU':
            branchCode = 'CEB';
            break;
        case 'CALBAYOG':
            branchCode = 'CAL';
            break;
        case 'FUENTE':
            branchCode = 'FUENTE';
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
function getNextSerialNumber(lastSerialNumber, branch) {
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    let newNumber;
    let branchCode;
    switch (branch) {
        case 'CEBU':
            branchCode = 'CEB';
            newNumber = 251;
            break;
        case 'CALBAYOG':
            branchCode = 'CAL';
            newNumber = 1451;
            break;
        case 'FUENTE':
            branchCode = 'FUENTE';
            newNumber = 1;
            break;
    }
    if (lastSerialNumber) {
        const numericPart = parseInt(lastSerialNumber.slice(2, 7));
        newNumber = numericPart + 1;
    }
    const paddedNumber = String(newNumber).padStart(5, '0');
    return `SA${paddedNumber}-${today}-${branchCode}`;
}
function getNextPurchaseRequestNumber(lastSerialNumber, officeBranch) {
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    let newNumber;
    let branchCode;
    switch (officeBranch) {
        case 'CEBU':
            branchCode = 'CEB';
            newNumber = 551;
            break;
        case 'CALBAYOG':
            branchCode = 'CAL';
            newNumber = 2551;
            break;
        case 'FUENTE':
            branchCode = 'FUENTE';
            newNumber = 1;
            break;
    }
    if (lastSerialNumber) {
        const numericPart = parseInt(lastSerialNumber.slice(2, 7));
        newNumber = numericPart + 1;
    }
    const paddedNumber = String(newNumber).padStart(5, '0');
    return `PO${paddedNumber}-${today}-${branchCode}`;
}
function getNextPackageNumber(lastSerialNumber, officeBranch) {
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    let newNumber;
    let branchCode;
    switch (officeBranch) {
        case 'CEBU':
            branchCode = 'CEB';
            newNumber = 501;
            break;
        case 'CALBAYOG':
            branchCode = 'CAL';
            newNumber = 1;
            break;
        case 'FUENTE':
            branchCode = 'FUENTE';
            newNumber = 1;
            break;
    }
    if (lastSerialNumber) {
        const numericPart = parseInt(lastSerialNumber.slice(2, 7));
        newNumber = numericPart + 1;
    }
    const paddedNumber = String(newNumber).padStart(5, '0');
    return `P${paddedNumber}-${today}-${branchCode}`;
}
