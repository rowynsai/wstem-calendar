"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskModal from "@/components/TaskModal";
import Link from "next/link";

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

function formatDateTime(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);

  // Format date as dd/mm/yyyy
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  // Format time as HH:mm (24-hour clock, no seconds)
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


// Read-only modal for event details
function EventDetailsModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", minWidth: "300px" }}
      >
        <h2>{event.title || "No Title"}</h2>
        <p><strong>Description:</strong> {event.description || "No description available"}</p>
        <p><strong>Start:</strong> {formatDateTime(event.start)}</p>
        <p><strong>End:</strong> {formatDateTime(event.end)}</p>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // for Add Event (admin only)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // for read-only event details
  const [user, setUser] = useState(null);

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
          // Keep description as well for modal display
          const formattedEvents = data.events.map((event) => ({
            id: event.id,
            title: event.summary || event.title || "No Title",
            start: new Date(event.start?.dateTime || event.start?.date || new Date()),
            end: new Date(event.end?.dateTime || event.end?.date || new Date()),
            description: event.description || "",
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
          id: data.newEvent.id,
          title: data.newEvent.summary || data.newEvent.title || "No Title",
          start: new Date(data.newEvent.start?.dateTime || data.newEvent.start?.date || new Date()),
          end: new Date(data.newEvent.end?.dateTime || data.newEvent.end?.date || new Date()),
          description: data.newEvent.description || "",
        };
        setEvents((prev) => [...prev, newEvent]);
      }
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  // Clicking on event shows read-only details modal
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  // Open add event modal for admins
  const openAddEventModal = () => {
    setSelectedEvent(null); // no event pre-selected
    setIsTaskModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#fdf6e3] text-black font-[family-name:var(--font-geist-sans)] px-6 pt-6 pb-6">

      {/* logo clickable to home */}
      <Link href="/" className="absolute top-6 left-6 cursor-pointer z-50">
        <img
          src="/wstemlogo.png"
          alt="Home"
          width={120}
          height={38}
          className="object-contain"
        />
      </Link>

      <main className="p-6 sm:p-12 max-w-4xl mx-auto mt-20 bg-white/70 rounded-2xl shadow-xl backdrop-blur-sm">

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
            onSelectEvent={handleSelectEvent}
          />
        </div>

        {/* only show Add Event button if user is admin */}
        {user && user.isAdmin === true && (
          <div className="mt-6 flex justify-center">
            <button
              className="rounded-full bg-sky-400 text-white py-2 px-4 hover:bg-blue-700"
              onClick={openAddEventModal}
            >
              Add Event
            </button>
          </div>
        )}
      </main>

      {/* Read-only event details modal */}
      {isDetailsModalOpen && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {/* admin-only add event modal */}
      {isTaskModalOpen && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleSaveTask}
          existingTask={selectedEvent}
        />
      )}

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
