import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import "../../Css/Template.css";
import Calendar from "../../components/Calendar";

import React from "react";

const CalendarPage = () => {
  return (
    <>
      <body className="skin-dark">
        <LayoutAdmin />
        <div className="content-body">
          <Calendar />
        </div>
        <Footer />
      </body>
    </>
  );
};

export default CalendarPage;
