const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUri =
    "mongodb+srv://basantsingh2601:ZlVqHQISNb97KB8u@cluster0.q6oq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const connect = await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
