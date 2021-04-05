// Use bcrypt for encrypting passwords in our db
const bcrypt = require("bcryptjs");

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("1234567", 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

module.exports = users;
