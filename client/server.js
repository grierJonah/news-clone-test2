const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');

app.use(express.static(path.join(__dirname, './build')));
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// app.listen(3000, () => console.log("server is up and running"));
app.listen(process.env.PORT || 8080, () => {
    console.log('Starting server');
  });