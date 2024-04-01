import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin, googleCalendarPlugin]}
      initialView="dayGridMonth"
      googleCalendarApiKey="AIzaSyA0qZHEVS0vh_-BD-fnyLNw5Lj8pEUx9Z4" //Key del api google
      events={{
        googleCalendarId: "es.cr#holiday@group.v.calendar.google.com",
      }}
      headerToolbar={
        {
            start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay' // will normally be on the right. if RTL, will be on the left
          }
      }
      height={"100vh"}
    />
  );
};

export default Calendar;