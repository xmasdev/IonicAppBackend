Ionic Backend
// written by ChatGPT

Important Schemas:
const companySchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  owner: {type: String, required: true},
  password: {type: String, required: true},
  members: {type: [String], default: []},
});

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});


const InvoiceSchema = new mongoose.Schema({
  companyDetails: {
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
  },
  clientCompanyDetails: {
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
  },
  items: {
    type: [{description: String, price: String}],
    required: true
  },
  taxRate: {
    type: String,
    required: true
  }
});


Overview

This project provides an authentication system for user and company management. It allows users to register, log in, and manage companies through a set of API endpoints. Below are the details of each endpoint and how to use them.

API Endpoints

    User Registration
        Endpoint: /auth/signup
        Method: POST
        Request Body:
            { "name": "User Name", "email": "user@example.com", "password": "userpassword" }
        Response:
            Success: { "success": true, "token": "JWTtoken" }
            Error: { "error": "errorMessage" } (Possible error messages include invalid email, missing fields, etc.)

    User Login
        Endpoint: /auth/login
        Method: POST
        Request Body:
            { "email": "user@example.com", "password": "userpassword" }
        Response:
            Success: { "success": true, "token": "JWTtoken" }
            Error: { "error": "errorMessage" } (Possible error messages include invalid credentials, user not found, etc.)

    Company Registration
        Endpoint: /auth-company/register
        Method: POST
        Headers:
            Authorization: <JWTtoken>
        Request Body:
            { "name": "Company Name", "email": "company@example.com", "password": "companypassword", "address": "Company Address" }
        Response:
            Success: { "success": true }
            Error: { "error": "message" } (Possible errors include missing fields, invalid data, etc.)

    Note: The company’s owner is automatically set as the email of the logged-in user whose JWT was passed in the Authorization header.

    Join a Company
        Endpoint: /auth-company/join
        Method: POST
        Headers:
            Authorization: <JWTtoken>
        Request Body:
            { "email": "user@example.com", "password": "userpassword" }
        Response:
            Success: { "success": true }
            Error: { "error": "message" }

        The user's email (from the JWT) will be added to the company's members array on succesfull join.

    Create Invoice
        Endpoint: /company/create-invoice
        Method: POST
        Headers:
            Authorization: <JWT of owner only>
        Request Body:
            {   companyEmail: "yourcompanyemail@gmail.com" // email of the company creating the invoice, other details will be fetched from the database,
                "clientCompanyDetails": {
                    "name": "Client Company Name",
                    "email": "clientemail@gmail.com",
                }
                "items": [
                    { "description": "Item 1", "price": "100" //string },
                    { "description": "Item 2", "price": "200" //string }
                ],
                "taxRate": "10" //string
            }

        Response:
            Success: { "success": true }
            Error: { "error": "message" }

        The invoice will be created and saved in the database.

    Get Invoices
        Endpoint: /company/get-invoices
        Method: POST
        Headers:
            Authorization: <JWT of owner or member>
        Request Body:
            { "companyEmail": "company email"}

        Response:
            Success: { "success": true, "invoices": [invoice1, invoice2, ...] }
            Error: { "error": "message" }

        The invoices for the company will be fetched from the database and returned in the response as an array.

Storing JWT Locally

Ensure that the JWT returned upon successful login or registration is stored securely in your application. You can store it in local storage, session storage, or cookies depending on your application needs and security considerations.

Error Handling

For all endpoints, errors will be returned in the following format:

    { "error": "errorMessage" }