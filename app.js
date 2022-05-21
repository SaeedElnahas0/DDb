require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
  
//connect to Database
const connectDB = require('./db/connect');

// routers
const personRouter = require('./routes/personRoute');
const ssnRouter = require('./routes/snnRoute');
const workRouter = require('./routes/workRoute');
const museumRouter = require('./routes/museumRoute');
const bookRouter = require('./routes/bookRoute');
const authorRouter = require('./routes/authorRoute');
const aggRouter = require('./routes/aggRoute');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('<h1>Saeed</h1>');
});


// routes
app.use('/person', personRouter);
app.use('/ssn', ssnRouter);
app.use('/work', workRouter);
app.use('/museum', museumRouter);
app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/agg', aggRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
