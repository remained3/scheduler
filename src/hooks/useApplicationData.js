import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments:{},
    interviewers:{}
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

     const newState = {
      ...state,
      appointments,
     };
      
     return axios
     .put(`/api/appointments/${id}`, {interview})
     .then (() => {
       setState(prev => ({...prev, appointments}));
       updateSpots(newState, id);
     })
   }
 
   const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview:  null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };

     return axios.delete(`/api/appointments/${id}`)
     .then(() => { updateSpots(newState, id);
     });
   }

   const updateSpots = function (state, id) {

    const currentDay = state.days.find((d) => d.appointments.includes(id));
  
    const dayIndex = state.days.findIndex((d) => d.id === currentDay.id)
  
    const nullAppointments = currentDay.appointments.filter(id => !state.appointments[id].interview) 
    const spots = nullAppointments.length 

    const newDay = { ...currentDay, spots };
    const newDays = state.days.map((d) => { return d.name === state.day ? newDay : d});

    setState({ ...state, days: newDays });

    return newDays;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
} 