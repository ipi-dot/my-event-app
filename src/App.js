import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import EventPage from './components/EventPage';
import EventForm from './components/EventForm';
import { EventProvider } from './context/EventContext';

function App() {
  return (
    <Router>
      <EventProvider>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/add-event" element={<EventForm />} />
          <Route path="/edit/:id" element={<EventForm />} />
        </Routes>
      </EventProvider>
    </Router>
  );
}

export default App;
