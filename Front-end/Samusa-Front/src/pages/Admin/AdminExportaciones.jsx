import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import ExportaTable from "../../components/ExportaTable";
import "../../Css/Template.css"
import "../../Css/datatables.min.css"
import "../../Css/datatables.css"

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

import React from 'react';

const AdminImportaciones = () => {
    return (
        <>
        <body className="skin-dark">
        <LayoutAdmin/>
            <div className="content-body">
            <ExportaTable/>
            </div>
            <Footer/>
        </body>
        </>
    );
}

export default AdminImportaciones;