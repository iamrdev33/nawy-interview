import {
    Request, Response,
} from 'express';
import GetApartmentsRequestDto from 'src/dtos/getApartmentsRequest.dto';
import PostApartmentRequestDto from 'src/dtos/postApartmentRequest.dto';
import * as apartmentService from 'src/service/apartment.service';

export const getApartmentsList = async (req: Request, res: Response) => {
    try {
        const apartmentQueryParams = req.query as unknown as GetApartmentsRequestDto;

        const data = await apartmentService.getApartmentsList(
            apartmentQueryParams
        );

        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};  


export const getApartmentDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: 'ID is required' });
        }

        const apartment = await apartmentService.getApartmentDetails(Number(id));

        res.json(apartment);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const addApartment = async (req: Request, res: Response) => {
    try {
      const apartmentBody = req.body as PostApartmentRequestDto;
    
      await apartmentService.addApartment(apartmentBody);

        res.status(201).json({ message: 'New apartment added successfully' });
    } catch (error: any) {
      res.status(500).json({ error: `Could not add new apartment, ${error}` });
    }
  };
