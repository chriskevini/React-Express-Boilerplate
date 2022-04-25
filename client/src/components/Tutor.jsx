import { FormGroup, FormControlLabel, Switch, Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Kalend, { CalendarView } from "kalend";
import "kalend/dist/styles/index.css";

function Tutor({ setUserType }) {
  const [students, setStudents] = useState([]);
  const [checked, setChecked] = useState({});
  const [events, setEvents] = useState([]);
  const [shownEvents, setShownEvents] = useState([]);
  const [disabled, setDisabled] = useState({});
  const [newEventFormState, setNewEventFormState] = useState(false);

  const generateColor = (id) => {
    return "#" + id.slice(-8, -2);
  };

  const fetchEvents = () => {
    axios
      .get("/students")
      .then(({ data: students }) => {
        axios
          .get("/events")
          .then(({ data: events }) => {
            events.forEach((event) => {
              event.id = event._id;
              console.log(event);
              event.startAt = event.startTime;
              event.endAt = event.endTime || event.startTime;
              event.summary = event.topic;
              event.color = generateColor(event.student);
            });
            setEvents(events);
            setShownEvents(events);

            let studentsWithEvents = events.map((event) => event.student);

            let disabled = {};
            console.log(students);
            students.forEach(
              (student) =>
                (disabled[student._id] = !studentsWithEvents.includes(
                  student._id
                ))
            );
            setDisabled(disabled);

            let checked = {};
            students.forEach(
              (student) =>
                (checked[student._id] = studentsWithEvents.includes(
                  student._id
                ))
            );
            setChecked(checked);
            console.log(checked);

            setStudents(students);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    toggleEvents();
  }, [checked]);

  const toggleEvents = () =>
    setShownEvents(events.filter((event) => checked[event.student]));

  //this "event" is not the same as a calendar event
  const handleSwitch = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const [formValues, setFormValues] = useState({
    dateTime: "",
    length: 60,
    student: "Please select a student",
    topic: "",
  });

  const handleForm = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitNewEvent = () => {
    const startTime = new Date(formValues.dateTime);
    axios
      .post("/events", {
        student: formValues.student,
        topic: formValues.topic,
        isTutorialSession: true,
        startTime: startTime,
        endTime: startTime.setMinutes(
          startTime.getMinutes() + formValues.length
        ),
      })
      .then(() => {
        alert("New Event Submitted");
        fetchEvents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ height: "80%" }}>
        <Kalend initialView={CalendarView.MONTH} events={shownEvents} />
      </div>
      <form className="tutorEventForm" hidden={!newEventFormState}>
        <input
          type="datetime-local"
          label="Date&Time picker"
          name="dateTime"
          value={formValues.dateTime}
          onChange={handleForm}
          renderInput={(params) => <TextField {...params} />}
        />
        <input
          type="range"
          name="length"
          min="30"
          max="120"
          step="30"
          value={formValues.length}
          onChange={handleForm}
        />
        <label for="length">{formValues.length + "mins"}</label>

        <select
          name="student"
          id="student"
          value={formValues.student}
          onChange={handleForm}>
          <option disabled selected>
            Please select a student
          </option>
          {students.map((student) => (
            <option value={student._id}>
              {student.firstName + " " + student.lastName}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="topic"
          id="topic"
          placeholder="Topics"
          value={formValues.topic}
          onChange={handleForm}
        />
      </form>
      {!newEventFormState ? (
        <>
          <Button
            variant="contained"
            label="Add New Event"
            onClick={() => setNewEventFormState(true)}>
            Schedule a tutorial
          </Button>
          <Button label="Go Back" onClick={() => setUserType("undecided")}>
            Go Back
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            label="Confirm add new event"
            onClick={() => submitNewEvent()}>
            Confirm
          </Button>
          <Button label="Go Back" onClick={() => setNewEventFormState(false)}>
            Go Back
          </Button>
        </>
      )}

      <FormGroup className="studentToggles">
        {students.map((student) => {
          return (
            <FormControlLabel
              key={student._id}
              control={
                <Switch
                  key={student._id}
                  checked={checked[student._id]}
                  disabled={disabled[student._id]}
                  onChange={handleSwitch}
                  name={student._id}
                  style={{
                    color: generateColor(student._id),
                  }}
                />
              }
              label={student.firstName + " " + student.lastName}
            />
          );
        })}
      </FormGroup>
    </>
  );
}

export default Tutor;
