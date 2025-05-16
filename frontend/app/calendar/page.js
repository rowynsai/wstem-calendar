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
  const [user, setUser] = useState(null); // 👈 store user info

  useEffect(() => {
    const fetchUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/calendar");
        const data = await response.json();

        if (Array.isArray(data.events)) {
          const formattedEvents = data.events.map((event) => ({
            title: event.summary || event.title || "No Title",
            start: new Date(event.start?.dateTime || event.start?.date || new Date()),
            end: new Date(event.end?.dateTime || event.end?.date || new Date()),
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

    fetchUser();
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
    <div className="min-h-screen bg-[#fdf6e3] text-black font-[family-name:var(--font-geist-sans)] p-6 sm:p-12">
      <main className="max-w-4xl mx-auto mt-12 bg-white/70 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">W.STEM Calendar</h1>

        <div className="border border-gray-300 rounded overflow-hidden">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={["month", "week", "day"]}
            defaultView="month"
          />
        </div>

        {/* only show this if user is admin */}
        {user?.isAdmin && (
          <div className="mt-6 flex justify-center">
            <button
              className="rounded-full bg-sky-400 text-white py-2 px-4 hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              Add Task
            </button>
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />

      <footer className="mt-12 flex justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm"
          href="mailto:rowynsai+calendar@gmail.com?subject=Suggestion for Women in STEM UBC Calendar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/globe.svg" alt="Globe icon" className="w-4 h-4" />
          Suggest an event / newsletter !
        </a>
      </footer>
    </div>
  );
}
