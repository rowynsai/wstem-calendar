import { useState }from 'react';

const Calendar = ({ onDateClick }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <h2>Calendar</h2>
            <button onClick={() => onDateClick(selectedDate)}>Add
                Task</button>
        </div>
    );
};

export default Calendar;