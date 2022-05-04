const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const nishantMiddleware = (req, res, next) => {
    console.log(req);
    next();
}

app.use(nishantMiddleware);

app.use(express.static(path.join(__dirname, "public")));


app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.get('/hello1/:name', (req, res) => {
    res.send('Hello World!'+ req.params.name);
});


app.get('/about', (req, res) => {
    // res.send('About')
    //res.sendFile(path.join(__dirname, 'index.html'));
    res.json({"harry":34});

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})