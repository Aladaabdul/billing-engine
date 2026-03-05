import express from 'express';
import healthRoutes from './routes/health.routes.js';
import eventRoutes from './routes/event.routes.js';


const app = express();


app.use(express.json());
app.use('/health', healthRoutes);
app.use('/api/v1', eventRoutes);



export default app;