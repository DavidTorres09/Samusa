import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import TicketsModal from "./TicketsModal";
import TicketModal from "./TicketsModal";

const TicketsTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleEdit(row.original)} // Pass the entire row data to handleEdit
            >
              <FaEdit />
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(row.original.id)}
            >
              <FaTrash />
            </button>
          </>
        ),
      },
    ],
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket); // Set the selected ticket data
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = (id) => {
    // Handle delete action here
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      <div className="mx-4">
        <table
          {...getTableProps()}
          className="Cliente-table w-full table-auto border-collapse rounded"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-200"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-4 px-6 text-gray-800 border border-gray-500"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border border-gray-500">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={`py-4 px-6 border border-gray-500 ${
                        cell.column.id === "actions" ? "text-center" : ""
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 mx-4 flex items-center justify-between">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50 mx-2"
        >
          {"<"}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50 mx-2"
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50"
        >
          {">>"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
      {isModalOpen && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setIsModalOpen(false)}
          isEditing={true}
        />
      )}
    </>
  );
};

export default TicketsTable;
