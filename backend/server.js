const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Get access to read request body
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

// Using product routes config
app.use("/api/products", productRoutes);
// Using user routes config
app.use("/api/users", userRoutes);
// Using order routes config
app.use("/api/orders", orderRoutes);

// Using order routes config
app.use("/api/upload", uploadRoutes);

// paypal config
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Custom error handlers connect
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
