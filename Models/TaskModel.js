const mongoose = require('mongoose')
const taskSchema = mongoose.Schema(
    {
        title:{ type: String, required: true },
        description:{ type: String },
        dueDate:{ type: Date },
        status:{ type: String, enum: ['pending', 'completed', 'in-progress'] }

    },
    {
        timestamp: true
    }
)
const Task =  mongoose.model('Task', taskSchema);
module.exports = Task ;