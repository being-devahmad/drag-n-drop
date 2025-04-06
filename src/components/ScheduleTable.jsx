"use client";

import { useState } from "react";
import { useDrop } from "react-dnd";
import ShiftItem from "./ShiftItem";

const ScheduleTable = ({
  days,
  users,
  shifts,
  onCellClick,
  onMoveShift,
  weeklyTotals,
}) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const handleMouseEnter = (userId, day) => {
    setHoveredCell(`${userId}-${day}`);
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const getShiftsForCell = (userId, day) => {
    return shifts.filter(
      (shift) => shift.userId === userId && shift.day === day
    );
  };

  return (
    <div className="w-full border border-gray-200 rounded-md bg-white">
      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="w-64 p-4 border-r border-b border-gray-200 bg-white sticky left-0 z-10">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search Users"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <svg
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </th>
              {days.map((day, index) => (
                <th
                  key={index}
                  className={`min-w-[150px] p-2 text-center border-b border-r border-gray-200 ${
                    day.highlight ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <div className="font-medium text-gray-800">
                    {day.day} {day.date}
                  </div>
                  <div className="flex justify-center items-center text-sm text-gray-500 mt-1 space-x-2">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{day.hours}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      <span>{day.shifts}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>{day.users}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Unassigned Shifts Row */}
          <tr>
            <td className="p-4 border-r border-b border-gray-200 bg-white sticky left-0 z-10">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span className="text-gray-700">Unassigned Shifts</span>
              </div>
            </td>
            {days.map((day, index) => (
              <DropCell
                key={index}
                userId="unassigned"
                day={day.date}
                className={`p-2 border-b border-r border-gray-200 ${
                  day.highlight ? "bg-blue-50" : "bg-white"
                }`}
                onMoveShift={onMoveShift}
              >
                {getShiftsForCell("unassigned", day.date).map((shift) => (
                  <ShiftItem key={shift.id} shift={shift} />
                ))}
              </DropCell>
            ))}
          </tr>

          {/* User Rows */}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-4 border-r border-b border-gray-200 bg-white sticky left-0 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`${user.color} text-white rounded-full w-8 h-8 flex items-center justify-center mr-3`}
                    >
                      {user.id}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <svg
                          className="w-4 h-4 mr-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{user.hours}</span>
                        <svg
                          className="w-4 h-4 ml-2 mr-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <span>{user.shifts}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </td>

              {days.map((day, index) => {
                const isHovered = hoveredCell === `${user.id}-${day.date}`;
                const cellShifts = getShiftsForCell(user.id, day.date);

                return (
                  <DropCell
                    key={index}
                    userId={user.id}
                    day={day.date}
                    className={`p-2 border-b border-r border-gray-200 relative min-h-[100px] ${
                      day.highlight ? "bg-blue-50" : "bg-white"
                    }`}
                    onMouseEnter={() => handleMouseEnter(user.id, day.date)}
                    onMouseLeave={handleMouseLeave}
                    onMoveShift={onMoveShift}
                  >
                    {cellShifts.map((shift) => (
                      <ShiftItem key={shift.id} shift={shift} />
                    ))}

                    {isHovered && cellShifts.length === 0 && (
                      <button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full p-1 shadow-lg hover:bg-blue-600 focus:outline-none"
                        onClick={() =>
                          onCellClick(user.id, user.name, day.date)
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    )}
                  </DropCell>
                );
              })}
            </tr>
          ))}

          {/* Weekly Totals Row */}
          <tr>
            <td className="p-4 border-r border-b border-gray-200 bg-gray-50 sticky left-0 z-10">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Weekly Totals</span>
                <button className="text-gray-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </td>
            <td
              colSpan={7}
              className="p-4 border-b border-r border-gray-200 bg-gray-50"
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-medium text-gray-700">Hours</span>
                <span className="ml-2 text-gray-700">{weeklyTotals}</span>
              </div>
            </td>
          </tr>
        </table>
      </div>

      {/* Add More Users Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center text-blue-600 font-medium">
          <span>Add more users</span>
          <svg
            className="w-4 h-4 ml-1 transform rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Drop target cell component
const DropCell = ({
  userId,
  day,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onMoveShift,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "SHIFT",
    drop: (item) => {
      onMoveShift(item.id, userId, day);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <td
      ref={drop}
      className={`${className} ${isOver ? "bg-blue-100" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="min-h-[40px]">{children}</div>
    </td>
  );
};

export default ScheduleTable;
