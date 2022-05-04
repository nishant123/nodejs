
const express = require('express');
const path = require('path');

const blogs = require('../data/blogs');

const router = express.Router();

router.get('/', (req, res) => {

    res.render('../home');

    //res.sendFile(path.join(__dirname, '../templates/index.html'));
});
router.get('/blog', (req, res) => {
console.log(blogs);
blogs.blogs.forEach(e=>{
    console.log(e.title);
});

    // blogs.forEach(e => {
    //     console.log(e.title)
    // });
    res.sendFile(path.join(__dirname, '../templates/bloghome.html'))
});
router.get('/blogpost/:slug', (req, res) => {
    console.log(blogs);
    myblog = blogs.blogs.filter(e=>{
        console.log(e.title);
        return e.slug == req.params.slug;
    });
    
    res.sendFile(path.join(__dirname, '../templates/blogpage.html'))
});

module.exports = router