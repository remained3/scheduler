import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments:{},
    interviewers:[]
   });
 
 const setDay = day => setState(prev => ({...prev, day}));
 
   useEffect(() => {
     Promise.all([
       axios.get("/api/days"),
       axios.get("/api/appointments"),
       axios.get("/api/interviewers")
     ])
   .then((response) => {
     setState(prev => ({...prev, days: response[0].data, 
       appointments: response[1].data, 
       interviewers: response[2].data}))
   });
   }, [])
  
   function bookInterview(id, interview) {
     //console.log(id, interview);
     const appointment = {
       ...state.appointments[id],
       interview: {...interview}
     };
 
     const appointments = {
       ...state.appointments,
       [id]:appointment
     };
 
     return axios
     .put(`/api/appointments/${id}`, {interview})
     .then (() => {
       setState(prev => ({...prev, appointments}));
     })
   }
 
   const cancelInterview = (id) => {
     return axios.delete(`/api/appointments/${id}`)
   }
} 