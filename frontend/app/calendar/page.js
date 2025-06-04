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

// subject colours
const subjectColors = {
  Math: "#f87171",  // red
  CPSC: "#60a5fa",  // blue
  Chem: "#ffa500",  // orange
  Biol: "#34d399",  // green
  Phys: "#fbbf24",  // yellow
  APSC: "#a78bfa",   // purple
};

function formatDateTime(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);

  // dd/mm/yyyy
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  // time formatted as hh:mm, 24 hr clock
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// read-only modal for event details (no edits)
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

//dropdown subject choices
function SubjectDropdown({ selectedSubjects, setSelectedSubjects, user }) {
  const [open, setOpen] = useState(false);
  const options = Object.keys(subjectColors);

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) => {
      let updated;
      if (subject === 'Select All') {
        updated = prev.length === options.length ? [] : options;
      } else {
        updated = prev.includes(subject)
          ? prev.filter((s) => s !== subject)
          : [...prev, subject];
      }

      // if user get their saved pref and update them
      if (user) {
        fetch(`http://localhost:5000/api/preferences`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user._id,
            preferences: { subjects: updated },
          }),
        }).catch((err) => console.error("Failed to save preferences", err));
      }

      return updated;
    });
  };

  const isChecked = (subject) =>
    subject === 'Select All'
      ? selectedSubjects.length === options.length
      : selectedSubjects.includes(subject);

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none"
          style={{ backgroundColor: '#3174ad' }}
        >
          Subjects
        </button>
      </div>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <label className="flex items-center px-4 py-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                checked={isChecked('Select All')}
                onChange={() => toggleSubject('Select All')}
              />
              Select All
            </label>
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-4 py-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isChecked(option)}
                  onChange={() => toggleSubject(option)}
                />
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: subjectColors[option] }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // for Add Event (admin only)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // for read-only event details
  const [user, setUser] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState(["Math", "CPSC", "Chem", "Biol", "Phys", "APSC"]);
  const profileLink = user ? "/profile" : "/register";

  // helps w null (no subject) case
  const filteredEvents = events.filter(
    (event) =>
      selectedSubjects.length === 0 || // show all if none selected
      !event.subject ||               // events without subject always shown
      selectedSubjects.includes(event.subject)
  );

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      const storedUser = localStorage.getItem("user");
      let userPrefs = null;
  
      if (storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
  
          if (parsedUser.preferences?.subjects) {
            setSelectedSubjects(parsedUser.preferences.subjects);
            userPrefs = parsedUser.preferences.subjects;
          }

        } catch (err) {
          console.error("Error parsing user from localStorage:", err);
          localStorage.removeItem("user");
        }
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/calendar");
        const data = await response.json();
  
        if (Array.isArray(data.events)) {
          const formattedEvents = data.events.map((event) => ({
            id: event.id,
            title: event.summary || event.title || "No Title",
            start: new Date(event.start?.dateTime || event.start?.date || new Date()),
            end: new Date(event.end?.dateTime || event.end?.date || new Date()),
            description: event.description || "",
            subject: event.extendedProperties?.private?.subject || null,
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
  
    fetchUserAndEvents();
  }, []);
  

  const handleSaveTask = async (task) => {
    console.log("handleSaveTask triggered", task);
    try {
      const postData = {
        title: task.summary || task.title || "No Title",
        description: task.description || "",
        date: task.date,
        startTime: task.startTime, // "14:30"
        endTime: task.endTime,     // "15:30"
        subject: task.subject || null, // TODO check taskModal
        user: user?.id || null,
      };

      const response = await fetch("http://localhost:5000/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (data.newEvent) {
        const newEvent = {
          id: data.newEvent.id,
          title: data.newEvent.summary || data.newEvent.title || "No Title",
          start: new Date(data.newEvent.start?.dateTime || data.newEvent.start?.date || new Date()),
          end: new Date(data.newEvent.end?.dateTime || data.newEvent.end?.date || new Date()),
          description: data.newEvent.description || "",
          subject: data.newEvent.extendedProperties?.private?.subject || null,
        };
        setEvents((prev) => [...prev, newEvent]);
      }

      //get emails from inbox
      await fetch('/api/email/scan', { method: 'POST' });
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  // Clicking on event shows read-only details modal
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#fdf6e3] text-black font-[family-name:var(--font-geist-sans)] px-6 pt-6 pb-6">
      <Link href="/" className="absolute left-0 top-0 cursor-pointer">
        <img
          src="/wstemlogo.png"
          alt="Home"
          width={175}
          height={100}
          className="object-contain"
        />
      </Link>

      <main className="p-6 sm:p-12 max-w-4xl mx-auto mt-20 bg-white/70 rounded-2xl shadow-xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4 relative">
        <a href={profileLink} className="absolute left-0">
          <img src="/profile.svg" alt="profile icon" className="w-10 h-10" />
        </a>

          <h1 className="text-2xl font-bold text-center w-full">Women in STEM Events</h1>

          <div className="absolute right-0">
            <SubjectDropdown
              selectedSubjects={selectedSubjects}
              setSelectedSubjects={setSelectedSubjects}
              user={user}
            />
          </div>
        </div>

        <div className="border border-gray-300 rounded overflow-hidden">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={["month", "week", "day"]}
            defaultView="month"
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(event) => {
              let bgColor = "#3174ad"; // default blue

              switch (event.subject) {
                case "Math":
                  bgColor = "#f87171"; // red
                  break;
                case "CPSC":
                  bgColor = "#60a5fa"; // blue
                  break;
                case "Chem":
                  bgColor = "#ffa500";  // orange
                  break;
                case "Biol":
                  bgColor = "#34d399"; // green
                  break;
                case "Phys":
                  bgColor = "#fbbf24"; // yellow
                  break;
                case "APSC":
                  bgColor = "#a78bfa"; // purple
                  break;
              }

              return {
                style: {
                  backgroundColor: bgColor,
                  borderRadius: "6px",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                },
              };
            }}
          />
        </div>

        {user?.isAdmin === true && (
          <div className="mt-6 flex justify-center">
            <button
              className="rounded-full bg-sky-400 text-white py-2 px-4 hover:bg-blue-700"
              onClick={() => setIsTaskModalOpen(true)}
            >
              Add Event
            </button>
          </div>
        )}
      </main>

      {isDetailsModalOpen && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}

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
          className="absolute top-10 right-7 nter gap-2 hover:underline hover:underline-offset-4 text-md"
          href="https://qualtricsxmrt5r3gxmc.qualtrics.com/jfe/form/SV_6Vwj1rfNTJLSXA2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suggest an event / newsletter !
        </a>
      </footer>

      <footer className="mt-12 flex justify-center">
      <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm px-6"
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/file.svg" alt="Globe icon" className="w-4 h-4" />
          About us
          </a>

        <a
          className="flex center nter gap-2 hover:underline hover:underline-offset-4 text-sm"
          href="mailto:rowynsai+calendar@gmail.com?subject=UBC Women in STEM Calendar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/globe.svg" alt="Globe icon" className="w-4 h-4" />
          Contact us !
        </a>
      </footer>

    </div>
  );
}
