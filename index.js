import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const { PORT } = process.env

app.listen(PORT, () => {
    console.log("server running on port %s", PORT)
})

