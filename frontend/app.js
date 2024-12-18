const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    res.render('home',{ title: "PAC Photography Club" })
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/add',(req,res)=>{
    res.render('add')
})
app.get('/sports', (req, res) => {
    res.render('sports'); 
});
app.get('/architecture', (req, res) => {
    res.render('architecture'); 
});
app.get('/landscape', (req, res) => {
    res.render('landscape'); 
});
app.get('/street', (req, res) => {
    res.render('street');
});
app.get('/astrophotography', (req, res) => {
    res.render('Astrophotography');
});
app.get('/blackandwhite', (req, res) => {
    res.render('blackandwhite');
});
app.get('/wildlife', (req, res) => {
    res.render('wildlife');
});
app.get('/portraits', (req, res) => {
    res.render('portraits');
});

app.get('/gallery', (req, res) => {
    res.render('gallery');
});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


