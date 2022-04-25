import React, { useState } from "react";
import { Button } from "@mui/material";
import Home from "./Home.jsx";
import Register from "./Register.jsx";
import "./styles.css";
import Tutor from "./Tutor.jsx";

function App() {
  console.log(process.env.DB_CONNECTION);
  const [userType, setUserType] = useState("undecided");
  return (
    <>
      {userType == "undecided" && <Home setUserType={setUserType} />}
      {userType == "tutor" && <Tutor setUserType={setUserType} />}
      {userType == "student" && (
        <>
          <h1>Student Home Page: access calendar and add tests/projects</h1>
          <Button label="Go Back" onClick={() => setUserType("undecided")}>
            Go Back
          </Button>
        </>
      )}
      {userType == "prospector" && <Register setUserType={setUserType} />}
    </>
  );
}

export default App;
