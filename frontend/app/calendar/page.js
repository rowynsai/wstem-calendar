"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskModal from "@/components/TaskModal";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/calendar");
        const data = await response.json();

        if (Array.isArray(data.events)) {
          // Transform Google events to React Big Calendar events format
          const formattedEvents = data.events.map((event) => ({
            title: event.summary || event.title || "No Title",
            start: new Date(event.start?.dateTime || event.start?.date || new Date()),
            end: new Date(event.end?.dateTime || event.end?.date || new Date()),
            // Optionally you can add other props here
          }));
          setEvents(formattedEvents);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const handleSaveTask = async (task) => {
    try {
      const response = await fetch("http://localhost:5000/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (data.newEvent) {
        const newEvent = {
          title: data.newEvent.summary || data.newEvent.title || "No Title",
          start: new Date(data.newEvent.start?.dateTime || data.newEvent.start?.date || new Date()),
          end: new Date(data.newEvent.end?.dateTime || data.newEvent.end?.date || new Date()),
        };
        setEvents((prev) => [...prev, newEvent]);
      }
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Calendar</h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        defaultView="month"
      />

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add Task
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
}
