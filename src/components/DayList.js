import React from "react";
import "components/DayListItem";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const Days = props.days.map((day) => {
    return (
      <DayListItem
      key={props.id}
      id={props.id}
      name={props.name}
      spots={props.spots}
      selected={props.name === props.value}
      setDay={props.onChange}
      />
    )
  
    })
  
    return <ul>{Days}</ul>
 }