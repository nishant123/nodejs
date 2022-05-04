const express = require('express')
const path = require('path')
var exphbs  = require('express-handlebars');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000


//app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "home"}));
app.set('view engine', 'handlebars');

var hbs = exphbs.create({ /* config */ });

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);

// const abcMiddleware = (req, res, next) => {
//     console.log(req)
// }

// app.use(express.static(path.join(__dirname, "public")))

app.use('/', require(path.join(__dirname, 'routes/blog.js')))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/about', (req, res) => {
//     // res.send('About')
//     res.sendFile(path.join(__dirname, '../templates/index.html'))
// })

app.listen(port, () => {
    console.log(`blog app listening at http://localhost:${port}`)
})