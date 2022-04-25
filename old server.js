const express = require("express");
const { EnvironmentPlugin } = require("webpack");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const db = require("./db");
const { CalendarEvent } = require("./models/calendarEvent");
const { Student, StudentSchema } = require("./models/student");

db.once("open", () => {
    console.log("connected!");
    app.listen(port, () => console.log("listening at port " + port));
});

app.use(express.static("client/dist"));
app.use(express.urlencoded({ extended: true }));

app.post("/students", (req, res) => {
    let student = new Student(req.body);

    student.save((error) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message: "Student succesfully registered",
                data: student,
            });
        }
    });
});

app.post("/events", (req, res) => {
    Student.findOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).exec((error, student) => {
        if (error) {
            res.status(500).json(error);
        } else if (!student) {
            res.send("No student with that name found!");
        } else {
            req.body.student = student._id;
            console.log(req.body.student);
            let event = new CalendarEvent(req.body);

            event.save((error) => {
                if (error) {
                    res.status(500).json(error);
                } else {
                    res.status(200).json({
                        message: "Event succesfully saved",
                        data: event,
                    });
                }
            });
        }
    });
});

app.get("/students", (req, res) => {
    Student.find().exec((error, result) => {
        if (error) {
            res.status(500).json(error);
        } else if (result.length === 0) {
            res.send("There were no students found");
        } else {
            res.json(result);
        }
    });
});

app.get("/events", (req, res) => {
    CalendarEvent.find().exec((error, result) => {
        if (error) {
            res.status(500).json(error);
        } else if (result.length === 0) {
            res.send("There were no calendar events found");
        } else {
            res.json(result);
        }
    });
});

app.get("/events/filter", (req, res) => {
    CalendarEvent.find(req.query)
        .where("student")
        .in(req.body.students)
        .exec((error, result) => {
            if (error) {
                res.status(500).json(error);
            } else if (result.length === 0) {
                res.send("There were no calendar events found");
            } else {
                res.json(result);
            }
        });
});