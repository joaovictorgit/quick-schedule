import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './config/database';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './docs/swagger.json';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

connectMongo();

app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
