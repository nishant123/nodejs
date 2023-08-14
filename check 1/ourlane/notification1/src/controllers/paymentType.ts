import { NextFunction, Request, Response } from 'express';
import CustomResponse from '../utils/response';
import PaymentTypeService from '../services/paymentType/paymentType';

export default class AddressController {

    static async getPaymentType(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const result = await PaymentTypeService.getPaymentType();
            const response = new CustomResponse(res);
            response.setResponse({ result });
        }
        catch (err) {
            next(err);
        }
    }
}