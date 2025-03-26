import { useDrag } from "react-dnd";

const ShiftItem = ({ shift }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "SHIFT",
    item: { id: shift.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`${
        shift.color
      } text-white p-2 rounded-md mb-1 relative cursor-move group
        ${isDragging ? "opacity-50" : ""}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="flex items-center">
        <span className="font-medium">{shift.time}</span>
        <svg
          className="w-4 h-4 ml-1"
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
      </div>
      <div className="text-sm truncate">{shift.text}</div>
      <button className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
    </div>
  );
};

export default ShiftItem;
