import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RtDays from './RTdays.jsx'; 
import SickDays from './Sickdays.jsx';
import Vacation from './Vacation.jsx';
import FullYearCalendar from '../Calendar/Calendar.jsx'; 


function ParentComponent() {
  const { staffName, type } = useParams();
   
    const handleOpenCalendar = () => {
      window.open('/calendar', '_blank');
    };

    let ComponentToShow;
    if (type === 'sick') {
        ComponentToShow = <SickDays staffName={staffName} onOpenCalendar={handleOpenCalendar} type={type} />;
    } else if (type === 'rt') {
        ComponentToShow = <RtDays staffName={staffName} onOpenCalendar={handleOpenCalendar} type={type} />;
    } else if (type === 'vacation') {
    ComponentToShow = <Vacation staffName={staffName} onOpenCalendar={handleOpenCalendar} type={type} />;
    }

    return (
      <div>
        {ComponentToShow}
    </div>
);
}
    export default ParentComponent;