import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from '../routes/v1/index';
import errorHandler from './errorHandler';
import { vars } from '../config/vars';
import * as cors from 'cors';

const { env, port, limiter,mqttUrl } = vars;

/**
 * Express instance
 * @public
 */
const app = express();

const http = require('http').Server(app);




app.get('/', function (req, res) {
  console.log("herre", req);
  console.log("there");
  res.sendFile(__dirname + '/chat.html');
});
app.get('/yes', function (req, res) {
  console.log("herre");
  console.log("there");
  res.send("here");
});


// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '100mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000
  })
);

app.use(cors());

// mount api v1 routes
app.use(vars.basePath, routes);

// Serving Swagger Docs through here
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// if error is not an instanceOf CustomError, convert it.
app.use(errorHandler.handle);

// catch 404 and forward to error handler
app.use(errorHandler.notFound);

http.listen(port, () => {
  console.log('server started on port %s for environment %s', port, env);
});

export default app;
