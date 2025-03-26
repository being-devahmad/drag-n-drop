import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ScheduleTable from "./components/ScheduleTable";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamic data states
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [days, setDays] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Generate days for the current week
    const generatedDays = [
      {
        day: "Mon",
        date: "03/24",
        hours: "0.00",
        shifts: 0,
        users: 0,
        highlight: false,
      },
      {
        day: "Tue",
        date: "03/25",
        hours: "-4.00",
        shifts: 1,
        users: 1,
        highlight: false,
      },
      {
        day: "Wed",
        date: "03/26",
        hours: "-4.00",
        shifts: 1,
        users: 1,
        highlight: false,
      },
      {
        day: "Thu",
        date: "03/27",
        hours: "-4.00",
        shifts: 1,
        users: 1,
        highlight: true,
      },
      {
        day: "Fri",
        date: "03/28",
        hours: "0.00",
        shifts: 0,
        users: 0,
        highlight: false,
      },
      {
        day: "Sat",
        date: "03/29",
        hours: "0.00",
        shifts: 0,
        users: 0,
        highlight: false,
      },
      {
        day: "Sun",
        date: "03/30",
        hours: "0.00",
        shifts: 0,
        users: 0,
        highlight: false,
      },
    ];

    // Sample users - matching the screenshot
    const fetchedUsers = [
      {
        id: "MM",
        name: "mobile",
        hours: "-4.00",
        shifts: 1,
        color: "bg-teal-500",
      },
      {
        id: "MH",
        name: "mehran",
        hours: "-8.00",
        shifts: 2,
        color: "bg-green-500",
      },
      {
        id: "TT",
        name: "test tes9",
        hours: "0.00",
        shifts: 0,
        color: "bg-teal-500",
      },
    ];

    // Sample shifts - matching the screenshot
    const fetchedShifts = [
      {
        id: "1",
        userId: "MM",
        userName: "mobile",
        day: "03/25",
        time: "2p - 10a",
        text: "sadf",
        color: "bg-orange-500",
      },
      {
        id: "2",
        userId: "MH",
        userName: "mehran",
        day: "03/26",
        time: "2p - 10a",
        text: "test",
        color: "bg-orange-500",
      },
      {
        id: "3",
        userId: "MH",
        userName: "mehran",
        day: "03/27",
        time: "2p - 10a",
        text: "hello - ahfck",
        color: "bg-green-400",
      },
    ];

    setDays(generatedDays);
    setUsers(fetchedUsers);
    setShifts(fetchedShifts);
    setLoading(false);
  };

  const handleCellClick = (userId, userName, day) => {
    setSelectedUser({ id: userId, name: userName });
    setSelectedDate(day);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handlePublish = (shiftData) => {
    // Create a new shift with the form data
    const newShift = {
      id: `shift-${Date.now()}`, // Ensure unique ID
      userId: selectedUser.id,
      userName: selectedUser.name,
      day: selectedDate,
      time: `${shiftData.startTime.substring(
        0,
        2
      )}p - ${shiftData.endTime.substring(0, 2)}a`,
      text: shiftData.title || "",
      color: shiftData.color || "bg-green-400",
    };

    // Add the new shift to the shifts array
    setShifts((prevShifts) => [...prevShifts, newShift]);

    // Close the sidebar
    setSidebarOpen(false);
  };

  // Handle shift move
  const handleMoveShift = (shiftId, targetUserId, targetDay) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === shiftId
          ? {
              ...shift,
              userId: targetUserId,
              userName:
                users.find((u) => u.id === targetUserId)?.name ||
                shift.userName,
              day: targetDay,
            }
          : shift
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center space-x-2 bg-white">
                  <span>View Options</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center space-x-2 bg-white">
                  <span>Week</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 border border-gray-300 rounded-md bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-gray-700">Mar 24 - Mar 30</span>
                <button className="p-2 border border-gray-300 rounded-md bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded-md bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <ScheduleTable
              days={days}
              users={users}
              shifts={shifts}
              onCellClick={handleCellClick}
              onMoveShift={handleMoveShift}
            />
          </div>
        </div>

        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
          selectedDate={selectedDate}
          selectedUser={selectedUser}
          onPublish={handlePublish}
        />
      </div>
    </DndProvider>
  );
}

export default App;
