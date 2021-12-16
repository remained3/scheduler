import React, {Fragment} from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode"

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const EDIT = "EDITING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

   const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };

  function deleteAppointment() {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }


  return (<article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    
    {mode === SHOW && (<Show student={props.interview.student} 
    interviewer={props.interview.interviewer} 
    onEdit={() => transition(EDIT)}
    onDelete={() => transition(CONFIRM)}/> 
    )}

    {mode === CREATE && <Form name={props.name} 
    interviewers={props.interviewers} 
    onCancel={back}
    onSave={save}/>}

    {mode === SAVING && (<Status message="SAVING"/>)}

    {mode === EDIT && ( <Form student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}/> )}

    {mode === CONFIRM && (<Confirm onCancel={back}
    onConfirm={deleteAppointment}
    message="Are you sure you would like delete this interview?"/>)}
      
    {mode === DELETING && (<Status message="Deleting" /> )}

    {mode === ERROR_DELETE && (<Error message ="There was an error cancelling appointment"
    onCancel={() => transition(SHOW)} /> )}

    {mode === ERROR_SAVE && (<Error message = "Failed to save appointment"
    onCancel={() => transition(SHOW)} /> )}

    </article>
  );  
}