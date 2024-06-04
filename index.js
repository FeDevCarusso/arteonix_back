// module imports
import dotenv from 'dotenv';

// local imports
import app from './src/app.js';
import sequelize from './src/database.js';
import { DataTypes } from 'sequelize';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Get the port from environment variables
const { PORT } = process.env

// Start the server
async function startServer(force) {
    try {
        // Connect to the database
        // await sequelize.authenticate()
        console.log("Database connected")

        // Sync the models with the database
        // await sequelize.sync({ force })
        console.log("Database synced")

        // Print the models
        console.log(sequelize.models)

        // Start the server
        app.listen(PORT, () => {
            console.log("Server running on port %s", PORT)
        })


        // Handle errors
    } catch (error) {
        console.log("Error connecting to database")
        console.error(error)
    }
}


// Starting the server
startServer(false)

