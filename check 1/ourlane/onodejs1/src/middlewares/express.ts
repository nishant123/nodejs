import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import * as rateLimit from 'express-rate-limit';
import morgan from '../utils/morgan';
import routes from '../routes/v1/index';
import errorHandler from './errorHandler';
import LogsQueue from './logsQueue';
import swaggerDocument from '../swagger/swagger';
import { vars } from '../config/vars';
import '../queue/rabittmq/connection';
import logger from '../utils/logger';
import { errorManager } from '../config/errorManager';

const { env, port, limiter } = vars;

const ratelimiter = rateLimit({
  windowMs: limiter.rateTime * 60 * 1000,
  max: limiter.rateRequest,
  message: errorManager.TOO_MANY_REQUEST
});

const usernamePassword = rateLimit({
  windowMs: limiter.loginTime * 60 * 1000,
  max: limiter.loginRequest,
  message: errorManager.TOO_MANY_LOGIN_ATTEMPT,
  keyGenerator: (req, res) => req.body.email
});

/**
 * Express instance
 * @public
 */
const app = express();

// log all requests
app.use(morgan);


//  Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '100mb'}));
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000
  })
);

// gzip compression
app.use(compress());

// enable CORS - Cross Origin Resource Sharing
// TODO : Define CORS policy
app.use(cors());
// middleware for selected language
app.disable('x-powered-by');
app.use(LogsQueue.requestReponseLogs);

// rate limiter
app.use(`${vars.basePath}/auth`, ratelimiter);
app.use(`${vars.basePath}/auth`, usernamePassword);

// mount api v1 routes
app.use(vars.basePath, routes);

// Serving Swagger Docs through here
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// if error is not an instanceOf CustomError, convert it.
app.use(errorHandler.handle);

// catch 404 and forward to error handler
app.use(errorHandler.notFound);

app.listen(port, () => {
  logger.info('server started on port %s for environment %s', port, env);
});

export default app;
