import React, { useState } from 'react';
import RtDays from './RTdays.jsx'; 
import FullYearCalendar from '../Calendar/Calendar.jsx'; 


function ParentComponent() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
    const handleOpenCalendar = () => {
      // setIsCalendarOpen(true); 
      window.open('/calendar', '_blank');
    };
    return (
        <div>
          <RtDays onOpenCalendar={handleOpenCalendar} />
          {/* {isCalendarOpen && <FullYearCalendar />} */}
        </div>
      );
    }

    export default ParentComponent;