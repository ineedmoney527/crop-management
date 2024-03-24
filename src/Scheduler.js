import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEvent from "./AddEvent"; // Import the AddEventModal component
import "./Calendar.css"; // Import the CSS file

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialDate, setInitialDate] = useState("");

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddEvent = (newEvent) => {
    const color = generateRandomColor(); // Generate a random color
    newEvent.backgroundColor = color; // Assign the color to the event
    setEvents([...events, newEvent]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr; // Extract the date from the cell
    setShowModal(true);
    setInitialDate(clickedDate); // Set the initial date for the modal
  };

  const handleEventClick = (arg) => {
    if (window.confirm(`Delete event "${arg.event.title}"?`)) {
      arg.event.remove(); // Remove the event from FullCalendar
    }
  };

  const handleEventDrop = (arg) => {
    const updatedEvents = events.map((event) =>
      event === arg.event ? { ...event, start: arg.event.start } : event
    );
    setEvents(updatedEvents);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
      />
      <AddEvent
        show={showModal}
        handleClose={handleCloseModal}
        handleAddEvent={handleAddEvent}
        initialDate={initialDate} // Pass initialDate to the modal
      />
    </>
  );
};

export default Calendar;
