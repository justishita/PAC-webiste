const express = require('express');
const app = express();
const path = require('path');
const { engine } = require('express-handlebars');
const fs = require('fs');

app.engine(
    "handlebars",  
    engine({
      layoutsDir: path.join(__dirname, "views", "layouts"),
      partialsDir: path.join(__dirname, "views", "partials" ),
    })
  );

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/about', (req, res) => {
  fs.readFile('public/data/AboutUs.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading about us JSON file:', err);
      return;
    }
    const teamMembersData = JSON.parse(data);
    res.render('aboutus', {
      title: 'Welcome to PAC-Photography & Cinematography Club',
      content: 'At PAC, we inspire creativity and community through photography.',
      teamMembers: teamMembersData, 
    });
  });
});

app.listen(3002, () => {
  console.log('Handlebars server running on http://localhost:3002');
});
