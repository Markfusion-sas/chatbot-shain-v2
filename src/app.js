import express from 'express';
import { helmetConfig } from './middlewares/helmet.middleware.js';
import { generalLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import router from './routes/index.js';
import { cors } from '#middlewares/cors.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.set('trust proxy', 1);

//Cabeceras de seguridad
app.use(helmetConfig);

//Limita trafico
app.use(generalLimiter);

//Cors
app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookies
app.use(cookieParser());

//Configurar rutas
app.use('/api/v1', router);

//Atrapar errores
app.use(errorHandler);

export default app;
