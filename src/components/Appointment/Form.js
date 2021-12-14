import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //clear form of data
  const reset = () => {
    setInterviewer("null");
    setStudent("");
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  
  return ( <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        value={student}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onSubmit={event => event.preventDefault()} onClick={event => props.onSave(student, interviewer)}>Save</Button>
    </section>
  </section>
</main>)
}
