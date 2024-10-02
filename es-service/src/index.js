const express = require('express');
const indexRoute = require('./routes/index.route');
const app = express();
const { createCleanEmployeeIndex, dataLoader } = require('./config/indexProcess');


app.use(express.json());
app.use('/', indexRoute);
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    createCleanEmployeeIndex();
    dataLoader();
    console.log('Server is running on port 3000');
});