````markdown
# Laundry Management System Backend

## Introduction

This repository contains the backend code for the Laundry Management System, an open-source project aimed at managing laundry services. The backend is built using modern web technologies and follows industry best practices for security, scalability, and maintainability.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building the server-side application.
- **Express.js**: A fast, unopinionated, and minimalist web framework for Node.js, used for building RESTful APIs.
- **MongoDB**: A NoSQL database, chosen for its scalability and flexibility in handling large amounts of unstructured data.
- **JWT (JSON Web Tokens)**: Used for securing API endpoints by providing authentication and authorization mechanisms.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution to model data.
- **bcrypt**: A library for hashing passwords to ensure secure storage of user credentials.
- **dotenv**: A module for loading environment variables from a `.env` file into `process.env`, used for managing configuration.
- **Nodemon**: A utility that automatically restarts the Node.js application when file changes are detected, useful during development.

## Project Structure

The project follows a standard MVC (Model-View-Controller) architecture:

- **models/**: Contains the Mongoose schemas and models for MongoDB.
- **controllers/**: Contains the logic for handling requests and returning responses.
- **routes/**: Defines the API routes and connects them with the appropriate controllers.
- **middlewares/**: Contains middleware functions for tasks like authentication, validation, etc.
- **config/**: Holds configuration files, such as database connection settings.
- **utils/**: Utility functions that can be used across the project.

## Installation

To get started with the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Open-Source-Community-Nigeria/laundary-mgt-system-be.git
   ```
````

2. **Navigate to the project directory**:

   ```bash
   cd laundary-mgt-system-be
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:

   ```bash
   PORT=9000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

5. **Run the application**:
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:9000`.

## Contributing

We welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your forked repository.
4. Submit a pull request with a description of your changes.

## Coding Guidelines

- **Use consistent indentation**: 2 spaces per indentation level.
- **Write meaningful commit messages**: Describe the purpose of each commit in a clear and concise manner.
- **Follow the MVC pattern**: Keep your code organized by adhering to the Model-View-Controller architecture.
- **Write comments where necessary**: Ensure your code is well-documented, especially for complex logic.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue or contact the project maintainers.

The updated MongoDB schema, including a **Users** collection:

### 1. **Users Collection**

| Field Name      | Data Type | Description                                       |
| --------------- | --------- | ------------------------------------------------- |
| `_id`           | ObjectId  | Primary Key. Unique identifier for each user.     |
| `username`      | String    | The username of the user.                         |
| `email`         | String    | The email address of the user.                    |
| `password_hash` | String    | Hashed password of the user for authentication.   |
| `role`          | String    | The role of the user (e.g., "admin," "user").     |
| `created_at`    | ISODate   | Timestamp when the user account was created.      |
| `updated_at`    | ISODate   | Timestamp when the user account was last updated. |

### 2. **Clients Collection**

| Field Name     | Data Type | Description                                                            |
| -------------- | --------- | ---------------------------------------------------------------------- |
| `_id`          | ObjectId  | Primary Key. Unique identifier for each client.                        |
| `name`         | String    | The name of the client.                                                |
| `address`      | String    | The address of the client.                                             |
| `phone_number` | String    | The phone number of the client.                                        |
| `email`        | String    | The email address of the client.                                       |
| `created_by`   | ObjectId  | Foreign Key. References the `Users` collection (who added the client). |
| `created_at`   | ISODate   | Timestamp when the client was added.                                   |
| `updated_at`   | ISODate   | Timestamp when the client information was last updated.                |

### 3. **Items Collection**

| Field Name       | Data Type  | Description                                                          |
| ---------------- | ---------- | -------------------------------------------------------------------- |
| `_id`            | ObjectId   | Primary Key. Unique identifier for each item.                        |
| `name`           | String     | The name of the item (e.g., "Shirt").                                |
| `category_id`    | ObjectId   | Foreign Key. References the `Categories` collection.                 |
| `price`          | Decimal128 | The price of the item.                                               |
| `stock_quantity` | Integer    | The current quantity of the item in stock.                           |
| `created_by`     | ObjectId   | Foreign Key. References the `Users` collection (who added the item). |
| `created_at`     | ISODate    | Timestamp when the item was added.                                   |
| `updated_at`     | ISODate    | Timestamp when the item was last updated.                            |

### 4. **Categories Collection**

| Field Name   | Data Type | Description                                                              |
| ------------ | --------- | ------------------------------------------------------------------------ |
| `_id`        | ObjectId  | Primary Key. Unique identifier for each category.                        |
| `name`       | String    | The name of the category (e.g., "Men's Wear").                           |
| `created_by` | ObjectId  | Foreign Key. References the `Users` collection (who added the category). |
| `created_at` | ISODate   | Timestamp when the category was added.                                   |
| `updated_at` | ISODate   | Timestamp when the category was last updated.                            |

### 5. **Orders Collection**

| Field Name    | Data Type             | Description                                                                                        |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| `_id`         | ObjectId              | Primary Key. Unique identifier for each order.                                                     |
| `client_id`   | ObjectId              | Foreign Key. References the `Clients` collection.                                                  |
| `order_date`  | ISODate               | The date and time when the order was placed.                                                       |
| `status`      | String                | The status of the order (e.g., "received," "in process," "completed").                             |
| `total_price` | Decimal128            | The total price of the order.                                                                      |
| `items`       | Array of Subdocuments | List of items included in the order. Each subdocument contains `item_id`, `quantity`, and `price`. |
| `created_by`  | ObjectId              | Foreign Key. References the `Users` collection (who created the order).                            |
| `created_at`  | ISODate               | Timestamp when the order was added.                                                                |
| `updated_at`  | ISODate               | Timestamp when the order was last updated.                                                         |

### 6. **Inventory_Logs Collection** (Optional)

| Field Name        | Data Type | Description                                                                         |
| ----------------- | --------- | ----------------------------------------------------------------------------------- |
| `_id`             | ObjectId  | Primary Key. Unique identifier for each log record.                                 |
| `item_id`         | ObjectId  | Foreign Key. References the `Items` collection.                                     |
| `change_quantity` | Integer   | The amount by which the inventory changed (e.g., +10, -5).                          |
| `change_type`     | String    | The type of change (e.g., "order," "restock").                                      |
| `log_date`        | ISODate   | The date and time when the inventory change was recorded.                           |
| `created_by`      | ObjectId  | Foreign Key. References the `Users` collection (who recorded the inventory change). |
| `created_at`      | ISODate   | Timestamp when the log was added.                                                   |

### Key Points:

- **User Tracking:** The `created_by` field in each collection tracks which user added or modified a record.
- **Security & Role Management:** The `Users` collection contains roles, which can be used for managing permissions within the application.
- **Object References:** Use ObjectId references to link related data across different collections, as shown with `created_by` referencing the `Users` collection.

This schema should allow you to efficiently manage users alongside clients, inventory, and orders in your MongoDB database.
