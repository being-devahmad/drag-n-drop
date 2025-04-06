"use client"

import { useState, useEffect } from "react"

const Sidebar = ({ isOpen, onClose, selectedDate, selectedUser, onPublish }) => {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "09:00:00",
    endTime: "05:00:00",
    note: "",
    color: "bg-green-400",
  })

  const [showColorPicker, setShowColorPicker] = useState(false)
  const [formattedDate, setFormattedDate] = useState("")
  const [displayDate, setDisplayDate] = useState("")

  // Available colors for shifts
  const colors = [
    { name: "Green", value: "bg-green-400" },
    { name: "Orange", value: "bg-orange-500" },
    { name: "Blue", value: "bg-blue-500" },
    { name: "Red", value: "bg-red-500" },
    { name: "Purple", value: "bg-purple-500" },
  ]

  // Update form when selected date or user changes
  useEffect(() => {
    if (selectedDate) {
      // Format date for input field (DD/MM/YYYY)
      const [month, day] = selectedDate.split("/")
      setFormattedDate(`${day}/${month}/2025`)

      // Format date for display (Day, Month DD, YYYY)
      const date = new Date(2025, Number.parseInt(month) - 1, Number.parseInt(day))
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
      const monthName = date.toLocaleDateString("en-US", { month: "short" })
      setDisplayDate(`${dayName}, ${monthName} ${day}, 2025`)
    }
  }, [selectedDate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color,
    })
    setShowColorPicker(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onPublish(formData)

    // Reset form
    setFormData({
      title: "",
      startTime: "09:00:00",
      endTime: "05:00:00",
      note: "",
      color: "bg-green-400",
    })
  }

  // Calculate hours between start and end time
  const calculateHours = () => {
    try {
      const [startHours, startMinutes] = formData.startTime.split(":").map(Number)
      const [endHours, endMinutes] = formData.endTime.split(":").map(Number)

      let hours = endHours - startHours
      let minutes = endMinutes - startMinutes

      if (minutes < 0) {
        hours -= 1
        minutes += 60
      }

      if (hours < 0) {
        hours += 24 // Assuming shift can go to next day
      }

      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} Hours`
    } catch (error) {
      console.log(error)
      return "20:00 Hours" // Default fallback
    }
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header with dynamic date */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-medium ml-2">{displayDate}</h2>
          </div>
        </div>

        {/* Shift Details */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-medium text-blue-800">Shift details</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <label className="text-gray-700 font-medium">Date</label>
            </div>
            <div className="relative">
              <input
                type="text"
                value={formattedDate}
                onChange={(e) => setFormattedDate(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center mb-2">
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
                <label className="text-gray-700 font-medium">Start</label>
              </div>
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <label className="text-gray-700 font-medium">End</label>
              </div>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2 text-right text-gray-700 font-medium">{calculateHours()}</div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-gray-700 font-medium">
                Shift title <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Type here"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-gray-700 font-medium">Job</label>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full ${formData.color} cursor-pointer`}
                onClick={() => setShowColorPicker(!showColorPicker)}
              ></div>
              <div className="relative flex-1 ml-2">
                <input
                  type="text"
                  value="Select Job"
                  readOnly
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                <svg
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>

                {/* Color Picker Dropdown */}
                {showColorPicker && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                    {colors.map((color) => (
                      <div
                        key={color.value}
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleColorSelect(color.value)}
                      >
                        <div className={`w-6 h-6 rounded-full ${color.value} mr-2`}></div>
                        <span>{color.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-gray-700 font-medium">Users</label>
            </div>
            <div className="flex items-center p-2 border rounded-md bg-gray-50">
              <div className="px-3 py-1 bg-gray-200 rounded-md flex items-center">
                <span>{selectedUser?.name}</span>
                <button type="button" className="ml-1 text-gray-500 hover:text-gray-700">
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="text-gray-700 font-medium">Note</label>
            </div>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Type here"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
            ></textarea>
            <button type="button" className="flex items-center mt-2 text-blue-600 hover:text-blue-800">
              <svg
                className="w-5 h-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
              Attach
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Publish
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-white text-gray-700 font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Save Draft
          </button>
          <button type="button" className="flex items-center text-blue-600 hover:text-blue-800">
            <span>Save as template</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

