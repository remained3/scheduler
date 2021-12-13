import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const apptTime = () => {
    if (!props.time) {
      return "No appointments"
    } else {
      return `Appointment at ${props.time}`
    }
  }
  return <article className="appointment">{apptTime()}</article>
}