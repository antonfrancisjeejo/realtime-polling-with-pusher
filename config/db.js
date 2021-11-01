const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jeejo13:jeejo13@cluster0.i61ei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
