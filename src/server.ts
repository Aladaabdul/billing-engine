import app from './app.js';
import { env } from './config/env.js';
const PORT = Number(env.port) || 8000;



app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${env.port}`);
});