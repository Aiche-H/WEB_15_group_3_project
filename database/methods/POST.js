// database/methods/POST.js
const User = require("../../models/user");

const createUser = async (req, res) => {
  try {
    const {
      user_id,
      username,
      email,
      password,
      first_name,
      last_name,
      role,
      avatar,
      registration_date,
      last_login,
      last_activity,
      email_verification,
      verification_token,
    } = req.body;

    // Create a new user instance with the provided data
    const newUser = new User({
      user_id,
      username,
      email,
      password,
      first_name,
      last_name,
      role,
      avatar,
      registration_date: registration_date || new Date(), // Set default if not provided
      last_login,
      last_activity,
      email_verification: email_verification || false, // Default to false
      verification_token,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log("Added user:", savedUser);

    // Respond with a 201 Created status and the saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error adding user:", err);
    // Respond with a 500 Internal Server Error status and the error message
    res.status(500).json({
      error: "Failed to create user",
      details: err.message,
    });
  }
};

module.exports = { createUser };

// --- Explanation and Potential Improvements ---

// Explanation of Changes:

// 1. Destructuring req.body:
//    - The code now destructures the expected fields from the `req.body` for cleaner access.

// 2. Handling Optional Fields with Defaults:
//    - `registration_date`: If not provided in the request body, it defaults to the current date using `new Date()`.
//    - `email_verification`: If not provided, it defaults to `false`.
//    - You might want to consider default values for other fields like `role` if your application has a default user role.

// 3. More Specific Error Message:
//    - The error response now includes a more user-friendly `error` message ("Failed to create user") along with the detailed `err.message` for debugging.

// Potential Improvements and Considerations:

// 1. Input Validation:
//    - **Crucially important:** You should add input validation to ensure that the required fields are present in the `req.body` and that the data types are correct. You can use libraries like `express-validator` for this.
//    - Example of basic validation:
//      ```javascript
//      const { username, email, password, first_name, last_name } = req.body;
//      if (!username || !email || !password || !first_name || !last_name) {
//        return res.status(400).json({ error: 'Missing required fields.' });
//      }
//      // Add more validation for email format, password complexity, etc.
//      ```

// 2. Password Hashing:
//    - **Security Risk:** You should NEVER store plain-text passwords in your database. Before saving the `newUser`, you must hash the `password` using a library like `bcrypt`.
//    - Example using bcrypt:
//      ```javascript
//      const bcrypt = require('bcrypt');
//      const saltRounds = 10; // You can adjust the number of salt rounds

//      const createUser = async (req, res) => {
//        try {
//          // ... (destructure req.body) ...

//          const hashedPassword = await bcrypt.hash(password, saltRounds);

//          const newUser = new User({
//            // ... other fields ...
//            password: hashedPassword, // Store the hashed password
//            // ... other fields ...
//          });

//          // ... (save user and send response) ...

//        } catch (err) {
//          // ... (error handling) ...
//        }
//      };
//      ```

// 3. Unique Constraints:
//    - Ensure that your `User` model in Mongoose has unique constraints defined for fields like `username` and `email` to prevent duplicate entries. This will automatically trigger an error during the `save()` operation if a duplicate is found. You can then handle this specific error in your `catch` block and send a more informative response (e.g., "Username already exists").

// 4. Error Handling for Specific Mongoose Errors:
//    - Mongoose errors can have specific codes (e.g., for validation errors or duplicate key errors). You can check `err.code` in your `catch` block to provide more tailored error messages to the client.

// 5. Consider Middleware:
//    - For more complex applications, you might consider using middleware to handle tasks like input validation or data sanitization before reaching your route handler.

// 6. JWT (JSON Web Tokens) for Authentication:
//    - After successfully creating a user, you might want to generate and send a JWT to the client to establish an authenticated session. This is typically done in a separate login route, but it's a related concept.
