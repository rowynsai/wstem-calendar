"use client";

import React, { useState, useEffect } from "react";

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  existingTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.summary || existingTask.title || "");
      setDescription(existingTask.description || "");
      
      const startDateTime = existingTask.start?.dateTime || existingTask.start?.date;
      const endDateTime = existingTask.end?.dateTime || existingTask.end?.date;

      if (startDateTime) {
        const [startDate, startTimeValue] = startDateTime.split("T");
        setDate(startDate);
        setStartTime(startTimeValue ? startTimeValue.slice(0, 5) : "");
      }

      if (endDateTime) {
        const [, endTimeValue] = endDateTime.split("T");
        setEndTime(endTimeValue ? endTimeValue.slice(0, 5) : "");
      }
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
    }
  }, [existingTask, isOpen]);

  const handleSubmit = () => {
    if (!title || !date || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedTask = {
      ...existingTask,
      summary: title,
      description,
      start: {
        dateTime: `${date}T${startTime}`,
        timeZone: "UTC",
      },
      end: {
        dateTime: `${date}T${endTime}`,
        timeZone: "UTC",
      },
    };

    onSave(updatedTask);
    onClose();
  };

  const handleDelete = () => {
    if (existingTask && onDelete) {
      onDelete(existingTask.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#fdf6e3] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {existingTask ? "View Event Details" : "Add Event"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="w-full border p-2 rounded mb-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <input
          type="time"
          className="w-full border p-2 rounded mb-4"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <div className="flex justify-between gap-2">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>

          {/* remove so users cant edit events <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save
          </button> */}
        </div>
      </div>
    </div>
  );
}
