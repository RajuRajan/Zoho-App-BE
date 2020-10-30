import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import http from 'http';

import accessEnv from '#utils/accessEnv';
import errorHandler from '#middlewares/error';
import router from '#routes/index';
import database from '#db/connection';
import { initCron } from '#jobs/cron';

/* << CONSTANTS >> */
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const port = accessEnv('PORT');
const env = accessEnv('NODE_ENV', 'development');
/* << --------- >> */
const app = express();
const server = http.Server(app);

// SETUP SOCKET CONNECTION

/* MIDDLEWARES */
app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());
app.use('/api', router);
app.use(errorHandler);
app.use('*', (req, res) => {
  return res.status(404).send({
    message: `Path ${req.originalUrl} not found`,
    statusCode: 404,
  });
});
/* << --------- >> */

console.info('👾 Environment:', env);
database.authenticate().catch(e => {
  console.error(e);
  process.exit(e ? 1 : 0);
});

server
  .listen(port, () => {
    console.log(`🤖 Server started on: http://localhost:${port}/`);
    initCron();
  })
  .on('error', e => console.error(e));
