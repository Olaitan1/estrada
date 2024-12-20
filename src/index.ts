import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import sequelize from './config/database';

dotenv.config();

const app: Application = express();


app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5500;


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'A simple task management API with authentication and roles',
    },
  },
  apis: ['./src/routes/*.ts'], 
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);



sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(port, () => console.log(`Server is running on port ${port}`));