import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //clear form of data
  const reset = () => {
    setInterviewer(null);
    setStudent("");
    setError("");
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  //make sure name is not left blank
  function validateForm () {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer)
  }

  
  return ( <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        data-testid="student-name-input"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        value={student}
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validateForm}>Save</Button>
    </section>
  </section>
</main>)
}