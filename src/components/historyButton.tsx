import React, { useState } from "react";

interface HistoryButtonProps {
  history: string[];
  onSelect: (city: string) => void;
}

const HistoryButton: React.FC<HistoryButtonProps> = ({ history, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white flex justify-center items-center px-3 py-3 rounded-r-md"
          onClick={() => setOpen(!open)}
        >
          🕘
        </button>
        <div />
        

        {open && history.length > 0 && (
          <div className="right-0 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 z-10">
            {history.map((item, index) => (
              <button
                key={index}
                className="block w-full text-center px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                console.log("Selected city:", item);
                  onSelect(item);
                  setOpen(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryButton;
