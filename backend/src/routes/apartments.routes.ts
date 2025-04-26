import express, { Router } from "express";
import * as apartmentController from 'src/controllers/apartment.controller';

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/apartments:
 *   get:
 *     summary: Get a list of apartments
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for apartment titles and project names. If a number is provided, the apartment with this ID is returned
 *       - in: query
 *         name: cities
 *         schema:
 *           type: string
 *         description: Comma-separated list of cities
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Maximum price
 *       - in: query
 *         name: minAreaInSqM
 *         schema:
 *           type: integer
 *         description: Minimum area in square meters
 *       - in: query
 *         name: maxAreaInSqM
 *         schema:
 *           type: integer
 *         description: Maximum area in square meters
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 *         description: Bedroom count
 *       - in: query
 *         name: bathroom
 *         schema:
 *           type: integer
 *         description: Bathroom count
 *       - in: query
 *         name: createdBefore
 *         schema:
 *           type: date
 *         description: Last date of creation (YYYY-MM-DD)
 *       - in: query
 *         name: createdAfter
 *         schema:
 *           type: date
 *         description: First date of creation (YYYY-MM-DD)
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: integer
 *         description: ID of project to which the apartment belongs
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: string
 *         description: Type of listing (e.g., rent, sale)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *         default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           default: 10
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of filtered apartments with pagination
 *       400:
 *        description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/', apartmentController.getApartmentsList);

/**
 * @openapi
 * /api/v1/apartments/details/{id}:
 *   get:
 *     summary: Get details of a single apartment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the apartment
 *     responses:
 *       200:
 *         description: Apartment details
 *       400:
 *         description: ID is required
 *       500:
 *         description: Internal server error
 */
router.get('/details/:id', apartmentController.getApartmentDetails);

/**
 * @openapi
 * /api/v1/apartments:
 *   post:
 *     summary: Add a new apartment
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *                type: string
 *                example: Cozy 2-bedroom apartment in the city center
 *              city:
 *                type: string
 *                example: Maadi
 *              listingType:
 *                type: string
 *                enum: [sale, rent]
 *                example: rent
 *              price:
 *                type: integer
 *                example: 2000
 *              areaInSqM:
 *                type: integer
 *                example: 120
 *              bedrooms:
 *                type: integer
 *                example: 2
 *              bathrooms:
 *                type: integer
 *                example: 3
 *              projectId:
 *                type: integer
 *                example: 3
 *              description:
 *                type: string
 *                example: This apartment is located in a quiet neighborhood with easy access to public transport.
 *              fullAddress:
 *                type: string
 *                example: 123 Main St, Maadi, Cairo
 *              contactId:
 *                type: string
 *                example: 8
 *     responses:
 *       201:
 *         description: New apartment added successfully
 *       500:
 *         description: Could not add new apartment
 */
router.post('/', apartmentController.addApartment);

export default router;
