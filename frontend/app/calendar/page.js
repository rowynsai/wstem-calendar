"use client";

import { useState, useEffect } from "react";
import TaskModal from "@/components/TaskModal";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/calendar");
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleSaveTask = async (task) => {
    try {
      const response = await fetch("http://localhost:5000/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      });

      const data = await response.json();
      setEvents((prev) => [...prev, data.newEvent]);
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Calendar</h1>

      <ul>
        {events.map((event, index) => (
          <li key={index} className="mb-2">
            <strong>{event.summary || event.title}</strong> —{" "}
            {event.start?.date || event.date}
          </li>
        ))}
      </ul>

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
