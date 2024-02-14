import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStaff } from './StaffProvider.jsx';
import FullYearCalendar from '../Calendar/Calendar.jsx'; 


function ParentComponent() {
  const { staffName } = useParams();
  const { staffList } = useStaff();
  const [markedDates, setMarkedDates] = useState([]);
  const { updateStaffAndCalendarData } = useStaff();
  

  useEffect(() => {
    const selectedStaff = staffList.find(staff => staff.name === staffName);
    if (selectedStaff) {
      const loadedMarkedDates = [];

      selectedStaff.sickDaysDates?.forEach(date => {
        loadedMarkedDates.push({ date, type: 'sick' });
      });

      selectedStaff.vacationDaysDates?.forEach(date => {
        loadedMarkedDates.push({ date, type: 'vacation' });
      });

      selectedStaff.rtDaysDates?.forEach(date => {
        loadedMarkedDates.push({ date, type: 'rt' });
      });

      setMarkedDates(loadedMarkedDates);
    }
  }, [staffName, staffList]);

  return (
    <div>
      <FullYearCalendar staffName={staffName} markedDates={markedDates} />
    </div>
  );
}

export default ParentComponent;
