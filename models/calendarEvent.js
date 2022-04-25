const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    topic: { type: String, maxlength: 30, required: true },
    isTutorialSession: { type: Boolean, required: true, default: false },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
});

exports.CalendarEvent = mongoose.model("CalendarEvent", CalendarEventSchema);
exports.CalendarEventSchema = CalendarEventSchema;