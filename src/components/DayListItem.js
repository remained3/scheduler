import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = function (props) {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining"
    } else {
      return props.spots + " spots remaining";
    }  
  };

  const dayClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2>{props.name}</h2>
      <h3> {formatSpots(props)}</h3>
    </li>
  );
}