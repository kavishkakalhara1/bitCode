import { Modal, Table, Button, Select, Label, Checkbox } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import * as XLSX from "xlsx";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const tableRef = useRef(null);
  const [columnVisibility, setColumnVisibility] = useState({
    memberID:false,
    specialization: true,
    city: true,
    district: true,
    suggestions: true,
  });

  const columns = [
    { key: "no", label: "No" },
    columnVisibility.memberID &&{ key: "trend2", label: "Member ID" },
    { key: "isMember", label: "Membership" },
    { key: "firstname", label: "First Name" },
    { key: "lastname", label: "Last Name" },
    { key: "batch", label: "Batch" },
    { key: "passedoutyear", label: "Graduated Year" },
    columnVisibility.specialization &&{ key: "specialization", label: "Specialization" },
    { key: "universityregistrationnumber", label: "University Reg No" },
    { key: "internationalmobilenumber", label: "Contact No" },
    { key: "email", label: "Email" },
    { key: "occupation", label: "Occupation" },
    columnVisibility.city && { key: "city", label: "Home City" },
    columnVisibility.district && { key: "district", label: "District" },
    { key: "country", label: "Country" },
    { key: "address", label: "Address" },
    { key: "residinginsrilanka", label: "Residing in Sri Lanka" },
    { key: "workplacename", label: "Work Place" },
    { key: "professionalqualifications", label: "Pro Qualifications" },
    { key: "otherqualifications", label: "Other Qualifications" },
    { key: "postgraduateachievements", label: "Postgraduate Achievements" },
    { key: "areyoucoporatemember", label: "Cooperate Member" },
    { key: "internationalprofessionalengineer", label: "IPE" },
    columnVisibility.suggestions && {
      key: "suggestions",
      label: "Suggestions",
    },
    { key: "isAdmin", label: "isAdmin" },
  ];

  const handleColumnChange = (e, index) => {
    const { checked } = e.target;
    setSelectedColumns((prevSelected) =>
      checked ? [...prevSelected, index] : prevSelected.filter((i) => i !== index)
    );
  };

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name]: checked,
    }));
  };

  // const visibleColumns = columns.filter(column => columnVisibility[column.key] !== false);
  const visibleColumns = columns.filter(Boolean).filter(column => columnVisibility[column.key] !== false);


  const filteredBatch = selectedBatch
    ? users.filter((user) => user.batch === selectedBatch)
    : users;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          // if (data.users.length < 9) {
          //   setShowMore(false);
          // }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const exportSelectedData = () => {
    const selectedData = filteredBatch.map((user) => {
      return selectedColumns
        .map((columnIndex) => {
          const column = columns[columnIndex];
          return user[column.key];
        })
        .join(",");
    });

    const headerRow = selectedColumns
      .map((columnIndex) => columns[columnIndex].label)
      .join(",");
    const csvContent = [headerRow, ...selectedData].join("\n");

    const ws = XLSX.utils.aoa_to_sheet([
      headerRow.split(","),
      ...selectedData.map((row) => row.split(",")),
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Apply styles to header row
    const headerRange = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cell_address = XLSX.utils.encode_cell({ c: C, r: 0 });
      if (!ws[cell_address]) continue;
      ws[cell_address].s = {
        fill: {
          fgColor: { rgb: "FF0000" }, // Yellow background
        },
        font: {
          color: { rgb: "FFFFFF" }, // Red text
          bold: true,
        },
      };
    }

    XLSX.writeFile(wb, "selected_data.xlsx");
  };

  // const handleShowMore = async () => {
  //   const startIndex = users.length;
  //   try {
  //     const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
  //     const data = await res.json();
  //     if (res.ok) {
  //       setUsers((prev) => [...prev, ...data.users]);
  //       if (data.users.length < 100) {
  //         setShowMore(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        // console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditUserMembership = async (userId, newMembershipStatus) => {
    try {
      const response = await fetch(`/api/user/upgrade/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isMember: newMembershipStatus }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update the local state if necessary
      setUsers(
        users.map((user) =>
          user._id === userId
            ? { ...user, isMember: newMembershipStatus }
            : user
        )
      );

      // console.log("User membership status updated:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  return (
    <div className="p-3 table-auto md:mx-auto ">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <div className="mt-5 mb-5 ml-5">
            <Label htmlFor="status" value="Filter by Batch" className="mb-5" />
            <Select
              id="status"
              onChange={handleBatchChange}
              value={selectedBatch}
              className="mt-3 mb-5 w-60 focus:ring-0"
            >
              <option value="">All</option>
              <option value="1st Batch">1st Batch</option>
              <option value="2nd Batch">2nd Batch</option>
              <option value="3rd Batch">3rd Batch</option>
              <option value="4th Batch">4th Batch</option>
              <option value="5th Batch">5th Batch</option>
              <option value="6th Batch">6th Batch</option>
              <option value="7th Batch">7th Batch</option>
              <option value="8th Batch">8th Batch</option>
              <option value="9th Batch">9th Batch</option>
              <option value="10th Batch">10th Batch</option>
              <option value="11th Batch">11th Batch</option>
              <option value="12th Batch">12th Batch</option>
              <option value="13th Batch">13th Batch</option>
              <option value="14th Batch">14th Batch</option>
              <option value="15th Batch">15th Batch</option>
              <option value="16th Batch">16th Batch</option>
              <option value="17th Batch">17th Batch</option>
              <option value="18th Batch">18th Batch</option>
              <option value="19th Batch">19th Batch</option>
              <option value="20th Batch">20th Batch</option>
              <option value="21st Batch">21st Batch</option>
              <option value="22nd Batch">22nd Batch</option>
              <option value="23rd Batch">23rd Batch</option>
              <option value="24th Batch">24th Batch</option>
              <option value="25th Batch">25th Batch</option>
            </Select>
            {selectedColumns.length > 0 && (
              <Button
                onClick={exportSelectedData}
                className="mb-5 w-60 focus:ring-0 bg-refaa-blue hover:bg-blue-900"
              >
                Export Selected Data
              </Button>
            )}
          </div>
          <div className="mt-5 mb-5 ml-5">
            <Label
              htmlFor="status"
              value="Select Columns to Show"
              className="mb-5"
            />
            <div className="flex gap-4 mb-5">
              <label className="mt-3">
                <input
                  type="checkbox"
                  name="city"
                  checked={columnVisibility.city}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Show City
              </label>
              <label className="mt-3">
                <input
                  type="checkbox"
                  name="district"
                  checked={columnVisibility.district}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Show District
              </label>
              <label className="mt-3">
                <input
                  type="checkbox"
                  name="suggestions"
                  checked={columnVisibility.suggestions}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Show Suggestions
              </label>
              <label className="mt-3">
                <input
                  type="checkbox"
                  name="specialization"
                  checked={columnVisibility.specialization}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Show Specialization
              </label>
              <label className="mt-3">
                <input
                  type="checkbox"
                  name="memberID"
                  checked={columnVisibility.memberID}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Show Member ID
              </label>
            </div>
          </div>

          <div className="relative ml-5 overflow-x-auto scrollbar-track-gray-200 scrollbar-thumb-refaa-red">
            <Table hoverable className="mb-20 shadow-2xl" ref={tableRef}>
              <Table.Head>
                {visibleColumns.map((column, index) => (
                  <Table.HeadCell
                    key={column.key}
                    className={`cursor-pointer ${
                      selectedColumns.includes(index) ? "bg-blue-200" : ""
                    } max-w-80 bg-refaa-red text-white font-bold`}
                    style={{
                      maxHeight: "10px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.label}
                    <Checkbox
                      className="ml-2"
                      checked={selectedColumns.includes(index)}
                      onChange={(e) => handleColumnChange(e, index)}
                    />
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="divide-y">
                {filteredBatch.map((user, rowIndex) => (
                  <Table.Row
                  className="text-gray-600 bg-white border-gray-800 border-1 dark:border-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  key={user._id}
                >
                  {visibleColumns.map((column, index) => (
                    <Table.Cell key={column.key}>
                    {column.key === 'no' ? users.length - rowIndex : user[column.key]}
                  </Table.Cell>
                  ))}
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className="font-medium text-red-500 cursor-pointer hover:underline"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {/* {showMore && (
            <button
              onClick={handleShowMore}
              className="self-center w-full text-sm text-teal-500 py-7"
            >
              Show more
            </button>
          )} */}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <Button onClick={handleClearTrend2} className="px-4 py-2 mt-5 text-white bg-blue-500 rounded">
        Clear Trend2
      </Button> */}
    </div>
  );
}
