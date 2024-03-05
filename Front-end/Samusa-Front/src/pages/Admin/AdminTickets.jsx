import Footer from "../../components/Footer";
import LayoutAdmin from "../../components/LayoutAdmin";
import TicketsTable from "../../components/TicketsTable";

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