import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(interviewerObject => 
    
    <InterviewerListItem
    key = {interviewerObject.id}
    name = {interviewerObject.interviewer}
    avatar = {interviewerObject.avatar}
    selected={interviewerObject.id === props.value}
    setInterviewer={() => props.onChange(interviewerObject.id)}
    />
  );
  
  
  return (<section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
    );

}