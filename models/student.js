const mongoose = require("mongoose");

const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: { type: String, maxlength: 30, required: true },
    lastName: { type: String, maxlength: 30, required: true },
    grade: { type: Number, min: 0, max: 13 },
    // grade 0 is pre-school and grade 13 is post-secondary
    email: { type: String, validate: [isEmail, "Invalid Email"] },
});

exports.Student = mongoose.model("Student", StudentSchema);
exports.StudentSchema = StudentSchema;