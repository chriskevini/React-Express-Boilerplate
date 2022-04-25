import React, { useState } from "react";
import validator from "validator";

import {
  Button,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";

function Register({ setUserType }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    grade: "",
    email: "",
  });

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validateRequired = (field) => {
    if (!values[field].trim() == "") {
      setErrorMessage({ ...errorMessage, [field]: "" });
    } else {
      setErrorMessage({ ...errorMessage, [field]: "This field is required" });
    }
  };

  const validateEmail = (value) => {
    if (value.trim() == "") {
      setErrorMessage({ ...errorMessage, email: "This field is required" });
    } else if (!validator.isEmail(value.trim())) {
      setErrorMessage({
        ...errorMessage,
        email: "The entered email address is invalid",
      });
    } else {
      setErrorMessage({ ...errorMessage, email: "" });
    }
  };

  const everythingIsKosher = () => {
    return (
      Object.values(errorMessage).reduce((acc, error) => acc + error, "") == ""
    );
  };

  const submit = () => {
    axios
      .post("/students", values)
      .then((response) => {
        console.log(response.data);
        alert("You've succesfully been registered!");
        setUserType("student");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container height="100vh" alignItems="center" justifyContent="center">
      <Grid item>
        <Paper elevation={3}>
          <form>
            <Grid
              container
              className="home"
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={1.5}>
              <Grid item>
                <Typography variant="h4" padding="0 1em" align="center">
                  Register as a new student
                </Typography>
              </Grid>

              <Grid item>
                <TextField
                  required={true}
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  error={errorMessage.firstName != ""}
                  helperText={errorMessage.firstName}
                  onChange={handleInput}
                  onBlur={(e) => validateRequired(e.target.name)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required={true}
                  label="Last Name"
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  error={errorMessage.lastName != ""}
                  helperText={errorMessage.lastName}
                  onChange={handleInput}
                  onBlur={(e) => validateRequired(e.target.name)}
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  style={{ minWidth: 120 }}
                  label="Grade"
                  name="grade"
                  type="number"
                  value={values.grade}
                  onChange={handleInput}>
                  <MenuItem value={0}>Pre-School</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>Post-Secondary</MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  placeholder="Email"
                  name="email"
                  required={true}
                  value={values.email}
                  error={errorMessage.email != ""}
                  helperText={errorMessage.email}
                  onChange={handleInput}
                  onBlur={(e) => {
                    validateEmail(values.email);
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  label="Go Back"
                  onClick={() => setUserType("undecided")}>
                  Go Back
                </Button>
                <Button
                  label="Register"
                  disabled={values.firstName == "" || values.lastName == ""}
                  onClick={() => {
                    if (everythingIsKosher()) submit();
                  }}>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;
