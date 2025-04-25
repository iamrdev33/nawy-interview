import express, { Router } from "express";
import * as apartmentController from 'src/controllers/apartment.controller';

const router: Router = express.Router();

router.get('/', apartmentController.getApartmentsList);
router.get('/details/:id', apartmentController.getApartmentDetails);
router.post('/', apartmentController.addApartment);

export default router;
