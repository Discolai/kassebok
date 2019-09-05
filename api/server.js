const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use('/api/giftcards', require('./routes/giftcards.js'));


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
