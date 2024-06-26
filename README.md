# Cleaning Supplies Store

Welcome to the Cleaning Supplies Store project! This platform serves as a dynamic marketplace for cleaning supplies enthusiasts.

## API Endpoints

- `/api/v1/register` - Register a new user.
- `/api/v1/login` - User login.
- `/api/v1/create-flash-sale-products` - Create flash sale products.
- `/api/v1/get-all-products` - Get all products.
- `/api/v1/get-flash-sale-products` - Get flash sale products.
- `/api/v1/get-trending-products` - Get trending products.
- `/api/v1/all-product` - Get products based on category.

## Usage

- Navigate to the homepage to view available products.
- Filter products by category, rating, or price range.
- Register or login to access additional features.

## Contributing

We welcome contributions from the community! Please fork the repository, make your changes, and submit a pull request.

## Credits

- Next.js
- Express.js
- MongoDB
- Material-UI

## Installation:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Rename `.env.example` to `.env`.
4. Run the server using `npm run dev`.

### Before Pushing Code:

1. Before pushing your code to the remote repository, ensure that you have run the following command in your terminal (Git Bash):
   ```bash
   rm -rf .git
   ```

## Configuration:

- Environment Variables:
  - `PORT`: Port number the server listens on. Default: 3000
  - `MONGODB_URI`: URI for MongoDB database.
  - `JWT_SECRET`: Secret key for JWT token generation.
  - `EXPIRES_IN`: Token expiration time.

## Usage:

- API Endpoints:

  - POST `/api/auth/login`

    - Description: Authenticates user and returns a JWT token.
    - Request:
      ```json
      {
        "email": "example@email.com",
        "password": "password"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "User registered successfully"
      }
      ```

  - POST `/api/auth/register`
    - Description: Registers a new user.
    - Request:
      ```json
      {
        "name": "John",
        "email": "example@email.com",
        "password": "password"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoMkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNzg1MDYyMSwiZXhwIjoxNzA3OTM3MDIxfQ.7EahSgmPLPNuZ_T9ok-B6TayWCJVdxPzi_Nx4UfrhvY"
      }
      ```

## Dependencies:

- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongodb`: MongoDB driver for Node.js.
- `nodemon`: Utility for automatically restarting the server during development.

‣汣慥楮杮猭灵汰敩 ⵳ 瑳牯彥慢正湥 ੤
