import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ title, children, onClose, isOpen }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure you have a `div` with id `modal-root` in your HTML.
  );
};

export default Modal;
