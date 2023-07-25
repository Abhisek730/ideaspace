const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const ideaSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true
    }, 
    briefs: [
        {
          brief: {
            type: String,
            
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
   
})

mongoose.model("IDEA", ideaSchema)