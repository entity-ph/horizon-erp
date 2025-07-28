"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionVoucherStatusSchema = exports.getTransactionsSchema = exports.TransactionTypeFilters = void 0;
const zod_1 = require("zod");
var TransactionTypeFilters;
(function (TransactionTypeFilters) {
    TransactionTypeFilters["TRAVEL"] = "TRAVEL";
    TransactionTypeFilters["ACCOMMODATION"] = "ACCOMMODATION";
    TransactionTypeFilters["TOUR"] = "TOUR";
    TransactionTypeFilters["TRANSPORTATION"] = "TRANSPORTATION";
})(TransactionTypeFilters || (exports.TransactionTypeFilters = TransactionTypeFilters = {}));
exports.getTransactionsSchema = zod_1.z.object({
    query: zod_1.z.object({
        skip: zod_1.z.string().refine(skip => !isNaN(Number(skip)), {
            message: 'Invalid skip value'
        }).optional(),
        take: zod_1.z.string().refine(skip => !isNaN(Number(skip)), {
            message: 'Invalid take value'
        }).optional(),
        search: zod_1.z.string().optional(),
        // filters: z.enum([TransactionTypeFilters.TOUR, TransactionTypeFilters.TRAVEL, TransactionTypeFilters.ACCOMMODATION, TransactionTypeFilters.TRANSPORTATION]).optional().array()
    })
});
exports.updateTransactionVoucherStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['ACTIVE', 'VOID', 'PAID']),
    }),
});
