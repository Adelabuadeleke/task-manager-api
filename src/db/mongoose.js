const mongoose = require('mongoose')

// mongodb://localhost:27017/poddin✔
// mongodb://127.0.0.1/task-manager-api✖
mongoose.connect('mongodb://localhost:27017/task-manager-api',{ 
  useNewUrlParser:true, 
  useCreateIndex:true, 
  useUnifiedTopology: true
})





