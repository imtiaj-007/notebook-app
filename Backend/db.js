const mongoose = require('mongoose');

const connectToMongo = async (url) => {
    return await mongoose.connect(url);
};

module.exports = connectToMongo;