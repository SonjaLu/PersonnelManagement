import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);


const MyCalendarComponent = () => {
  const handleSelect = ({ start, end }) => {
    
    console.log(start, end);
};
  return (
    <div className="calendar-container">
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      selectable
      onSelectSlot={handleSelect}
    />
       </div>
  );
};

  export default MyCalendarComponent;