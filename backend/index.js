const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
// const {authMiddleware} = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(authMiddleware);
const corsOption = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOption));

app.listen(port, () => {
    console.log(`Your Port is ${port}`);
});

require('./db');

require('./models/Buyer');
require('./models/Seller');
require('./models/User');
require('./models/Wallet');
require('./models/Transaction');
require('./models/Request');


// const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
// const walletRoutes = require('./routes/walletRoutes');
const userRoutes = require('./routes/userRoutes');
const walletsRoutes = require('./routes/walletsRoutes');
const transactionRoutes = require('./routes/transaction');
const requestRoutes = require('./routes/requestRoute');


// app.use(buyerRoutes);
app.use(sellerRoutes);
// app.use(walletRoutes);
app.use(userRoutes);
app.use(walletsRoutes);
app.use(transactionRoutes);
app.use(requestRoutes);

app.use((req, res, next) => {
    const error = new Error('Route not Found');
    error.status = 404;
    next(error);
});

app.use(express.json());
app.use(cors());

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message });
});

// Import and start the mail server
const startMailServer = require('./mailserver');
startMailServer();