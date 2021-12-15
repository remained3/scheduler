export function getAppointmentsForDay(state, day) {
  const result = [];
  if(state.days){
    for(let y = 0; y < state.days.length; y++){
      if(state.days[y].name === day){
        for (let i = 0; i < state.days[y].appointments.length; i++){
            result.push(state.appointments[state.days[y].appointments[i]])
        }
      }
    }
  } else {
    return [];
  }
  return result;
}

export function getInterview (state, interview) {
  if (!interview) {
    return null;
  }
  const id = interview.interviewer
  return {
    student:interview.student,
    interviewer: {
      id: id,
      name: state.interviewers[id].name,
      avatar: state.interviewers[id].avatar
    }
  }
}