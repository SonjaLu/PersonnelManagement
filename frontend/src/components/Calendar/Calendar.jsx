import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/de';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

moment.locale('de', {
  week: {
    dow: 1,
  },
});

const germanMessages = {
  date: 'Datum',
  time: 'Zeit',
  event: 'Ereignis',
  allDay: 'Ganztägig',
  week: 'Woche',
  work_week: 'Arbeitswoche',
  day: 'Tag',
  month: 'Monat',
  previous: 'Zurück',
  next: 'Nächster',
  yesterday: 'Gestern',
  tomorrow: 'Morgen',
  today: 'Heute',
  agenda: 'Agenda',

  noEventsInRange: 'Es gibt keine Ereignisse in diesem Zeitraum.',


  dayNamesShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
};
const GermanWeekdayHeader = ({ date }) => {
  const weekday = moment(date).format('dd'); 
  return <span>{weekday}</span>;
};
const FullYearCalendar = () => {
  const [view, setView] = useState('month');
  const [selectedDays, setSelectedDays] = useState({}); // Speichert die ausgewählten Tage
  const [currentEventType, setCurrentEventType] = useState('sickness'); // Standardmäßig auf 'Krankheitstag' gesetzt
  const [date, setDate] = useState(new Date()); // Aktuelles Datum
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const newEvent = {
      start,
      end,
      title: currentEventType, // oder ein anderer Titel basierend auf der Art des Ereignisses
      type: currentEventType
    };

    // Hinzufügen des neuen Events zum Array
    setSelectedEvents([...selectedEvents, newEvent]);
    // Prüfen, ob ein einzelner Tag oder ein Bereich ausgewählt wurde
    if (moment(start).isSame(end, 'day')) {
      // Einzelner Tag ausgewählt
      const newSelectedDays = { ...selectedDays };
      newSelectedDays[moment(start).format('YYYY-MM-DD')] = currentEventType;
      setSelectedDays(newSelectedDays);
    } else {
      // Bereich ausgewählt
      let newSelectedDays = { ...selectedDays };
      let currentDay = moment(start);
  
      while (currentDay.isSameOrBefore(end, 'day')) {
        newSelectedDays[currentDay.format('YYYY-MM-DD')] = currentEventType;
        currentDay.add(1, 'day');
      }
  
      setSelectedDays(newSelectedDays);
    }
  };
  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

 
const saveSelection = () => {
  console.log(selectedDays);
  // Hier die Logik zum Speichern der Daten implementieren
};
const events = [
  { start: new Date(2024, 1, 5), end: new Date(2024, 1, 5), title: 'Krankheitstag', type: 'sickness' },
  // Weitere Events...
];
const eventPropGetter = (event) => {
  let newStyle = {};
  switch (event.type) {
    case 'sickness':
      newStyle.backgroundColor = 'yellow';
      break;
    case 'vacation':
      newStyle.backgroundColor = 'green';
      break;
    case 'rt':
      newStyle.backgroundColor = 'white';
      break;
    default:
      break;
  }
  return { style: newStyle };
};

const renderCalendars = () => {
  const months = [];
  const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

  for (let month = 0; month < 12; month++) {
    const date = new Date(currentYear, month);
    const monthName = moment(date).format('MMMM');
    date.setMonth(month);
    months.push(
      <div className="single-calendar" key={month}>
         <h3>{monthName}</h3>
        <Calendar
          localizer={localizer}
          events={events}
        onSelectEvent={event => handleDaySelect(event.start, event.type)}
        eventPropGetter={eventPropGetter}
          date={date}
          view={view}
          onView={handleViewChange}
            onNavigate={handleNavigate}
          toolbar={false}
          onSelectSlot={handleSelect}
          messages={germanMessages}
          components={{
            dayHeader: GermanWeekdayHeader
          }}
        />
         <button id="save-btn" onClick={saveSelection}>Auswahl speichern</button>
      </div>
    );
  }
  return months;
};

return (
  <>
  <h2>{new Date().getFullYear()}</h2>
  <div className="calendar-container">
    {renderCalendars()}
  
    <div className="calendar-legend">
  <button id="sick-btn"className="legend-item sickness-day"onClick={() => setCurrentEventType('sickness')}>Krankheitstag</button>
  <button id="vacation-btn"className="legend-item vacation-day"onClick={() => setCurrentEventType('vacation')}>Urlaubstag</button>
  <button id="rt-btn"className="legend-item rt-day"onClick={() => setCurrentEventType('rt')}>RT-Tag</button>
</div>
   </div>  
  </>
);
};

export default FullYearCalendar;







