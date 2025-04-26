# Nawy Real Estate Platform

## About the Project

The Nawy interview task is a real estate platform that allows you to browse and search apartment listings. It provides features such as filtering apartments by various criteria, viewing detailed information about individual apartments, and adding new apartment listings.

## Technologies Used

- **Backend**: Node.js, Express.js, TypeORM
- **Frontend**: React.js
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Other Tools**: Swagger for API documentation, Class Transformer for DTOs

## How to Run the Project

1. Ensure you have Docker and Docker Compose installed.
2. Run the batch script to start the project:
   ```bash
   ./start-project.bat
   ```
3. Wait for the following message to appear in the terminal:
   ```
   🚀 App is up and running at http://localhost:3000
   ```
4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the website.

### Notes:
- The first time you run the project, it may take some time due to initial setup and compilation.
- The database is seeded automatically during the first run, so you will have sample data to work with.

## API Documentation

The API documentation is available at [http://localhost:3002/api-docs](http://localhost:3002/api-docs) once the backend service is running.