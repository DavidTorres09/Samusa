import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import TicketsTable from "../../components/TicketsTable";
import "../../Css/Template.css"
import "../../Css/datatables.min.css"
import "../../Css/datatables.css"

import $ from 'jquery';
import jszip from 'jszip';
import DataTable from 'datatables.net-dt';
import 'datatables.net-autofill-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-colreorder-dt';
import 'datatables.net-fixedcolumns-dt';
import 'datatables.net-fixedheader-dt';
import 'datatables.net-keytable-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-rowgroup-dt';
import 'datatables.net-rowreorder-dt';
import 'datatables.net-scroller-dt';
import 'datatables.net-select-dt';

import React, { useEffect } from 'react';

const AdminTickets = () => {

  const data = [
    { id: 1, status: 'Pending', description: 'First ticket' },
      { id: 2, status: 'Completed', description: 'Second ticket' },
      { id: 3, status: 'Pending', description: 'Third ticket' },
      { id: 4, status: 'Completed', description: 'Fourth ticket' },
      { id: 5, status: 'Pending', description: 'Fifth ticket' },
      { id: 6, status: 'Completed', description: 'Sixth ticket' },
      { id: 7, status: 'Pending', description: 'Seventh ticket' },
      { id: 8, status: 'Completed', description: 'Eighth ticket' },
      { id: 9, status: 'Pending', description: 'Ninth ticket' },
      { id: 10, status: 'Completed', description: 'Tenth ticket' },
      { id: 11, status: 'Pending', description: 'Eleventh ticket' },
      { id: 12, status: 'Completed', description: 'Twelfth ticket' }
  ];

  const sortedData = data.sort((a, b) => {
    if (a.status === 'Pending' && b.status === 'Completed') {
      return -1; 
    } else if (a.status === 'Completed' && b.status === 'Pending') {
      return 1; 
    } else {
      return 0;
    }
  });


  return (
    <>
      <LayoutAdmin/>
      <TicketsTable data={sortedData}/>
      <Footer/>
    </>
  );
};

export default AdminTickets;