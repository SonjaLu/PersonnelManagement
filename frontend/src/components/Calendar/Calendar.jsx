import React, { useState, useContext, useEffect } from 'react';
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
  const { staffList, setStaffList, calculateValidVacationDays  } = useContext(StaffContext);
  const [currentEventType, setCurrentEventType] = useState('sickness');
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const currentYear = new Date().getFullYear();
  const { staffName } = useParams();
  const [availableVacationDays, setAvailableVacationDays] = useState(0);
  const [showPopup, setShowPopup] = useState(false);   
  const [remainingDaysForSelection, setRemainingDaysForSelection] = useState(0); // Verbleibende Tage, die noch ausgewählt werden können
  

  const eventColors = {
    sick: 'yellow',
    rt: 'white',
    vacation: 'green',
  };




  useEffect(() => {
    const loadedStaffList = JSON.parse(localStorage.getItem('staffList')) || [];
    if (loadedStaffList.length > 0) {
      setStaffList(loadedStaffList);
    }
  }, []);

  useEffect(() => {
    const selectedStaff = staffList.find(staff => staff.name === staffName);
    if (selectedStaff) {
      const loadedMarkedDates = [];
      const validDays = calculateValidVacationDays(staffName);
      setAvailableVacationDays(validDays);
  
      selectedStaff.sickDaysDates.forEach(date => loadedMarkedDates.push({ date, type: 'sick' }));
      selectedStaff.vacationDaysDates.forEach(date => loadedMarkedDates.push({ date, type: 'vacation' }));
      selectedStaff.rtDaysDates.forEach(date => loadedMarkedDates.push({ date, type: 'rt' }));
  
        selectedStaff.sickDaysDates.forEach(date => {
        loadedMarkedDates.push({ date, type: 'sick' });
      });
  
      selectedStaff.vacationDaysDates.forEach(date => {
        loadedMarkedDates.push({ date, type: 'vacation' });
      });
  
      selectedStaff.rtDaysDates.forEach(date => {
        loadedMarkedDates.push({ date, type: 'rt' });
      });

      setMarkedDates(loadedMarkedDates);
    }
  }, [staffName, staffList, calculateValidVacationDays]);


  const handleDaySelect = (value) => {
    
    if (currentEventType === 'vacation' && availableVacationDays <= 0) {
      alert('Keine verfügbaren Urlaubstage mehr');
      return;  
    }
  
    setShowPopup(true);
  setRemainingDaysForSelection(availableVacationDays - 1);

  const formattedDate = moment(value).format('YYYY-MM-DD');
    const newMarkedDate = { date: formattedDate, type: currentEventType };
    setMarkedDates([...markedDates, newMarkedDate]);
  
    if (currentEventType === 'vacation') {
      setAvailableVacationDays(availableVacationDays - 1);
    }
  };

  const tileClassName = ({ date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const foundDate = markedDates.find(d => d.date === formattedDate);
    return foundDate ? `highlight-${foundDate.type}` : '';
  };

  const renderColorBox = (color) => (
    <div style={{ width: '15px', height: '15px', backgroundColor: color, marginRight: '5px' }}></div>
  );

  const saveSelection = () => {
    const updatedStaffList = staffList.map(staff => {
      if (staff.name === staffName) {
        let vacationTaken = staff.vacationTaken;
        let vacationPlanned = staff.vacationPlanned;
        let sickDays = staff.sickDays;
        let plannedRtDays = staff.plannedRtDays;
        let takenRtDays = staff.takenRtDays;
        
  
        markedDates.forEach(mark => {
          const markDate = new Date(mark.date);
          const today = new Date();
  
          if (mark.type === 'vacation') {
            if (markDate < today) {
              vacationTaken++;
            } else {
              vacationPlanned++;
            }
          } else  if (mark.type === 'sick' && !staff.sickDaysDates.includes(mark.date)) {
            sickDays++;
          } else if (mark.type === 'rt') {
            if (markDate < today) {
              takenRtDays++;
            } else {
              plannedRtDays++;
            }
          }
        });
  
        return {
          ...staff,
          vacationTaken,
          vacationPlanned,
          sickDays,
          plannedRtDays,
          takenRtDays,
          sickDaysDates: markedDates.filter(mark => mark.type === 'sick').map(mark => mark.date),
          vacationDaysDates: markedDates.filter(mark => mark.type === 'vacation').map(mark => mark.date),
          rtDaysDates: markedDates.filter(mark => mark.type === 'rt').map(mark => mark.date)
        };
      }
      return staff;
    });
  
    setStaffList(updatedStaffList);
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
    setSelectedEvents([]);
  };
  

 
  const navigate = useNavigate();

const closeWindow = () => {
  navigate(`/workflowstaff/${staffName}`); 
};

const openMonthCalendar = (month) => {
  setSelectedMonth(month);
};

const renderMonthCalendar = () => {
  if (selectedMonth === null) return null;

  const monthStartDate = new Date(currentYear, selectedMonth, 1);

  return (
    <div>
    <h3>{moment(monthStartDate).format('MMMM YYYY')} - {staffName}</h3>
    <Calendar
      onChange={value => handleDaySelect(value)}
      value={selectedDate}
      tileClassName={tileClassName}
      view='month'
      activeStartDate={monthStartDate}
      showNeighboringMonth={false} 
      />
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
        <button onClick={() => setSelectedMonth(null)} className="back-btn">
          {renderColorBox('transparent')}
          Zurück zur Jahresansicht
        </button>
  </div>
  </div>
);
};

const renderCalendars = () => {
  return Array.from({ length: 12 }, (_, month) => (
  <div className="single-calendar" key={month} onClick={() => openMonthCalendar(month)}>
    <h3>{moment(new Date(currentYear, month)).format('MMMM')}</h3>
    <Calendar
        value={new Date(currentYear, month, 1)}
        tileClassName={tileClassName}
        view='month'
        />
   </div>
    ));
};


const Popup = ({ onClose, remainingDays }) => (
  <div className="popup-overlay-cal">
    <div className="popup-content-cal">
      <h2>Verfügbare Urlaubstage</h2>
      <p>Sie haben noch {remainingDays} Urlaubstage.</p>
      <button onClick={onClose}>Schließen</button>
    </div>
  </div>
);
return (
  <div className="calendar-wrapper"> {/* Stellen Sie sicher, dass die Klasse konsistent benannt ist */}
    {selectedMonth === null && <h2>{currentYear} - {staffName}</h2>}
    <div className="calendar-container">
      {selectedMonth === null ? renderCalendars() : renderMonthCalendar()}
    </div>
    {showPopup && (
      <Popup
        remainingDays={remainingDaysForSelection}
        onClose={() => setShowPopup(false)}
      />
    )}
    {selectedMonth === null && (
      <div className="calendar-legend">
        <button id="save-all-btn" onClick={saveSelection}>Alle speichern</button>
        <button onClick={closeWindow} className="back-btn">
          {renderColorBox('transparent')}
          Zurück
        </button>
      </div>
    )}
  </div>
);}

  


export default FullYearCalendar;







