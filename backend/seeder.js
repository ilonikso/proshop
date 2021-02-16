const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

const users = require("./data/users");
const products = require("./data/products");

const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");

// This is seeder script for adding and deleting initial data to MongoDB

dotenv.config();

connectDB();


const importData = async () => {
    try {
        // Clear MondoDB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Add users to DB
        const createdUsers = await User.insertMany(users);

        // Add AdminUserStamp to each product
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser,
            };
        });

        // Add product
        await Product.insertMany(sampleProducts);

        console.log("Data imported".green.inverse);
        process.exit(1);
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Clear MondoDB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data destroyed".red.inverse);
        process.exit(1);
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check flag -d for seed script (to create or destroy DB using package.json scripts)
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
