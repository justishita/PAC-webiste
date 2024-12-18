const express = require('express');
const dotenv = require('dotenv');
const DBconnect = require('./database/connection'); 
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

dotenv.config(); 
const app = express();

app.use(cors());
DBconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({useTempFiles: true, tempFileDir: path.join(__dirname, 'frontend', 'tmp')}));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
// app.use('/images', express.static(path.join(__dirname,'frontend', 'public', 'images')));

const galleryRoutes = require('./routes/galleryRoutes');
app.use('/api/gallery', galleryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
