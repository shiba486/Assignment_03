const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true
      },
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      status: { type: String, require: true },
},{timestamps:true, versionKey:false});

const Todo = mongoose.model("Todo",todoSchema);



module.exports =Todo