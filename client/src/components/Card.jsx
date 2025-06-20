const Card = ({ note, time, onDelete }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg space-y-3 border border-indigo-100 w-full">
      <h2 className="text-lg font-semibold text-gray-800 break-words">
        {note}
      </h2>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-medium">Remind Me at:</span>
        <span className="text-gray-800">
          {time}
        </span>
      </div>

      <div className="pt-2">
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md text-sm transition duration-200 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
