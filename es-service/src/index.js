const express = require('express');
const cors = require('cors');
const indexRoute = require('./routes/index.route');
const app = express();
const { createCleanEmployeeIndex, dataLoader } = require('./config/indexProcess');

// enable cors
app.use(cors());
app.use(express.json());
app.use('/', indexRoute);

app.listen(5000, () => {
    createCleanEmployeeIndex();
    dataLoader();
    console.log('Server is running on port 5000');
});