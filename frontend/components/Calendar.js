import { useState, useEffect } from 'react';

const Calendar = ({ onDateClick, userId }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [calendarDays, setCalendarDays] = useState([]);
    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Fetch Google Calendar events
    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/calendar/events');
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                console.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user tasks if logged in
    const fetchTasks = async () => {
        if (!userId) return;
        
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/tasks/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Generate calendar days for current month view
    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        
        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        
        // Day of week for the first day (0-6, 0 is Sunday)
        const firstDayOfWeek = firstDay.getDay();
        
        const days = [];
        
        // Add days from previous month to fill the first week
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false
            });
        }
        
        // Add days of current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true
            });
        }
        
        // Add days from next month to fill the last week
        const remainingDays = 42 - days.length; // 6 rows x 7 days = 42
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false
            });
        }
        
        setCalendarDays(days);
    };

    // Handle month navigation
    const navigateMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    // Check if a day has events
    const hasEvents = (day) => {
        return events.some(event => {
            const eventDate = new Date(event.start.dateTime || event.start.date);
            return eventDate.toDateString() === day.date.toDateString();
        });
    };

    // Check if a day has tasks
    const hasTasks = (day) => {
        return tasks.some(task => {
            const taskDate = new Date(task.date);
            return taskDate.toDateString() === day.date.toDateString();
        });
    };

    // Handle date selection
    const handleDateClick = (day) => {
        setSelectedDate(day.date);
        onDateClick(day.date);
    };

    // Initialize calendar and fetch data
    useEffect(() => {
        generateCalendarDays();
        fetchEvents();
    }, [currentMonth]);

    useEffect(() => {
        if (userId) {
            fetchTasks();
        }
    }, [userId]);

    return (
        <div className="border rounded-lg shadow bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                    {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div>
                    <button 
                        onClick={() => navigateMonth(-1)}
                        className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        &lt;
                    </button>
                    <button 
                        onClick={() => setCurrentMonth(new Date())}
                        className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Today
                    </button>
                    <button 
                        onClick={() => navigateMonth(1)}
                        className="px-3 py-1 mx-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center font-medium p-2">
                        {day}
                    </div>
                ))}
                
                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                    <div 
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={`
                            border p-2 h-24 overflow-hidden cursor-pointer transition-colors
                            ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'}
                            ${selectedDate && day.date.toDateString() === selectedDate.toDateString() 
                                ? 'border-blue-500 border-2' : ''}
                            hover:bg-blue-50
                        `}
                    >
                        <div className="flex justify-between">
                            <span>{day.date.getDate()}</span>
                            <div className="flex gap-1">
                                {hasEvents(day) && (
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                )}
                                {hasTasks(day) && (
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isLoading && (
                <div className="text-center mt-4">
                    <p>Loading...</p>
                </div>
            )}

            <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-4">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        <span>Google Calendar Events</span>
                    </div>
                    {userId && (
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                            <span>Your Tasks</span>
                        </div>
                    )}
                </div>
                <button 
                    onClick={() => onDateClick(selectedDate)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default Calendar;