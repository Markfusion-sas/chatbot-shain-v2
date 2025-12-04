import express from 'express';
import { helmetConfig } from './middlewares/helmet.middleware.js';
import { generalLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.set('trust proxy', 1);

//Cabeceras de seguridad
app.use(helmetConfig);

//Limita trafico
app.use(generalLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurar rutas
app.use('/', (req, res) => res.status(200).send('Funcionando correctamente'));

//Atrapar errores
app.use(errorHandler);

export default app;
