import express, { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { createAccommodationVoucherSchema, updateAccommodationVoucherSchema } from '../schemas/accommodation-voucher.schema';
import { createAccommodationVoucher, deleteAccommodationVoucher, updateAccommodationVoucher } from '../services/accommodation-voucher.service';

const accommodationVoucherRouter = express.Router();

accommodationVoucherRouter.post('/', validate(createAccommodationVoucherSchema), async (req: Request, res: Response) => {
  try {
    const accommodationVoucher = await createAccommodationVoucher(req.body)

    if (!accommodationVoucher) { throw new Error('Failed to create accommodation voucher') }
    res.status(200).json({ message: "Successfully created accommodation voucher" })
  } catch (error) {
    res.status(500).json(error);
  }
});

accommodationVoucherRouter.put('/:id', validate(updateAccommodationVoucherSchema), async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const accommodationVoucher = await updateAccommodationVoucher(id, req.body)

    if (!accommodationVoucher) { throw new Error('Failed to create accommodation voucher') }
    res.status(200).json({ message: "Successfully created accommodation voucher" })
  } catch (error) {
    res.status(500).json(error);
  }
});

accommodationVoucherRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const accommodationVoucher = await deleteAccommodationVoucher(id)

    if (!accommodationVoucher) { throw new Error('Failed to delete accommodation voucher') }
    res.status(200).json({ message: "Successfully deleted accommodation voucher" })
  } catch (error) {
    res.status(500).json(error);
  }
});

export default accommodationVoucherRouter;
