# Simple User Register Web-App

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![EJS](https://img.shields.io/badge/EJS-B4AE65?style=for-the-badge&logo=tostring&logoColor=white)](https://ejs.co)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/coderooz/simple-nodejs-mongodb-user-register-web-app)](https://github.com/coderooz/simple-nodejs-mongodb-user-register-web-app/issues)
[![GitHub Stars](https://img.shields.io/github/stars/coderooz/simple-nodejs-mongodb-user-register-web-app)](https://github.com/coderooz/simple-nodejs-mongodb-user-register-web-app/stargazers)

Welcome to the Simple User Register Web-App! This project is a web application built with Node.js, Express, and MongoDB, designed to manage user information. The application allows users to register, view, update, and delete their details, including uploading and displaying profile images.

## Project Description

This web application provides a straightforward system for managing user data. It leverages Node.js and Express for the backend and MongoDB with Mongoose for database management. The frontend is designed with EJS for templating. Users can register with their name, email, phone number, and profile picture. The app supports CRUD operations and includes search, sorting, and pagination features.

### Key Features

- **User Registration**: Add new users with their details and profile pictures.
- **User Listing**: View a list of registered users with their information and images.
- **User Updates**: Edit existing user details and update their profile pictures.
- **User Deletion**: Remove users from the system.
- **Search and Sort**: Search users by name and sort the list by different criteria.
- **Pagination**: Navigate through large sets of user data with pagination controls.

## Directory Structure

Here's an overview of the project directory structure:

```
./
├── models/
│   └── users.ejs           # EJS template for user model (if applicable)
├── node_modules/           # Node.js modules
├── routes/
│   └── routes.ejs          # EJS template for routes (if applicable)
├── uploads/                # Directory for uploaded images
├── views/
│   ├── index.ejs           # EJS template for the home page
│   ├── about.ejs           # EJS template for the about page
│   ├── contact.ejs         # EJS template for the contact page
│   ├── add_users.ejs       # EJS template for adding users
│   ├── edit_users.ejs      # EJS template for editing users
│   └── layout/
│       ├── header.ejs      # EJS template for the header layout
│       └── footer.ejs      # EJS template for the footer layout
├── main.ejs                # Main EJS template (if applicable)
├── .env                    # Environment variables
├── README.md               # Project documentation
├── package.json            # Node.js package descriptor
└── package-lock.json       # Locked dependencies versions
```

## Installation

To get started with this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/coderooz/simple-nodejs-mongodb-user-register-web-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd simple-nodejs-mongodb-user-register-web-app
   ```

3. **Install dependencies:**

   ```bash
   npm install dotenv ejs express express-session mongoose multer
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGODB_URI=<your-mongodb-uri>
   PORT=5000
   ```

5. **Start the development server:**

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000` and serve the frontend application.

## Usage

1. **Access the Application:**
   Open your web browser and go to `http://localhost:5000` to view the application.

2. **Register a New User:**
   Use the registration form to add new users with their name, email, phone number, and profile picture.

3. **View Users:**
   Navigate to the user list page to view all registered users with their details and images.

4. **Update User Details:**
   Click on the edit button next to a user to modify their information and profile picture.

5. **Delete Users:**
   Click on the delete button next to a user to remove them from the system.

6. **Search and Sort:**
   Use the search form to find users by name and use the sorting links to order the list by different criteria.

## Acknowledgments

This project was created based on a tutorial by [DCodeMania](https://www.youtube.com/@DCodeMania) on YouTube. Their guidance was invaluable in understanding and implementing the features of this web application.
- **Tutoral Name**: [CRUD App With Image Upload Using NodeJs, ExpressJs, MongoDB & EJS Templating Engine](https://www.youtube.com/playlist?list=PL6u82dzQtlfvJoAWdyf5mUxPQRnNKCMGt)

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributors

Thanks to all the contributors who have helped build this project!

<a href="https://github.com/coderooz/simple-nodejs-mongodb-user-register-web-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=coderooz/simple-nodejs-mongodb-user-register-web-app" alt="contributors" />
</a>

## Contact

For any questions or feedback, please contact:

- [Coderooz](https://github.com/coderooz)

Thank you for checking out the Simple User Register Web-App!
