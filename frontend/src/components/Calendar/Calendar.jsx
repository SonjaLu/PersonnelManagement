import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'moment/locale/de';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { StaffContext } from '../Staff/StaffProvider.jsx';
import { useNavigate, useParams } from 'react-router-dom';

moment.updateLocale('de', {
  week: {
    dow: 1,
  },
});



const FullYearCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const { staffList, setStaffList } = useContext(StaffContext);
  const [currentEventType, setCurrentEventType] = useState('sickness');
  const [markedDates, setMarkedDates] = useState([]);

  const currentYear = new Date().getFullYear();
  const formatDay = (locale, date) => moment(date).format('dd');

  const eventColors = {
    sick: 'yellow',
    rt: 'white',
    vacation: 'green',
  };

  const tileClassName = ({ date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const foundDate = markedDates.find(d => d.date === formattedDate);
    return foundDate ? `highlight-${foundDate.type}` : '';
  };


  const handleDaySelect = (value) => {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    const newMarkedDate = {
      date: formattedDate,
      type: currentEventType
    };
    setMarkedDates([...markedDates, newMarkedDate]);
  };

  
  const saveSelection = () => {
    const updatedStaffList = staffList.map(staff => {
      const staffEvents = selectedEvents.filter(event => event.type === currentEventType);
      if (currentEventType === 'sick') {
        staff.sickDays += staffEvents.length;
      } else if (currentEventType === 'vacation') {
        staff.vacationDays += staffEvents.length;
      } else if (currentEventType === 'rt') {
        staff.rtDays += staffEvents.length;
      }
      console.log(`Saving selection for month: ${monthIndex}`);
      return staff;
    });
    setStaffList(updatedStaffList);
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
    setSelectedEvents([]);
  };
  const { staffName } = useParams();
  const navigate = useNavigate();

const closeWindow = () => {
  navigate(`/workflowstaff/${staffName}`); 
};

  const renderColorBox = (color) => (
    <div style={{ width: '15px', height: '15px', backgroundColor: color, marginRight: '5px' }}></div>
  );

  const renderCalendars = () => {
    return Array.from({ length: 12 }, (_, month) => (
   
      <div className="single-calendar" key={month}>
      <h3>{moment(new Date(currentYear, month)).format('MMMM')}</h3>
      <Calendar
        onChange={value => setSelectedDate(value)}
        value={selectedDate}
        onClickDay={handleDaySelect}
        tileClassName={tileClassName}
        view='month'
      />
      
    </div>
  ));
};

  return (
  
    <div className="calender-wrapper">
      <h2>{currentYear}</h2>
      <div className="calendar-container">
        {renderCalendars()}
      </div>
      <div className="calendar-legend">
      <button id="sick-btn"className="legend-item sickness-day" onClick={() => setCurrentEventType('sick')}>
          {renderColorBox(eventColors.sick)}
          Krankheitstag
        </button>
        <button id="vacation-btn" className="legend-item vacation-day" onClick={() => setCurrentEventType('vacation')}>
          {renderColorBox(eventColors.vacation)}
          Urlaubstag
        </button>
        <button id="rt-btn" className="legend-item rt-day" onClick={() => setCurrentEventType('rt')}>
          {renderColorBox(eventColors.rt)}
          RT-Tag
        </button>
        <button id="save-all-btn" onClick={saveSelection}>Alle speichern</button>
        <button onClick={closeWindow} className="back-btn">
          {renderColorBox('transparent')}
          Zurück
        </button>
      </div>
    </div>
  );
};

  


export default FullYearCalendar;







