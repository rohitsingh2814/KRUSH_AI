// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, title, children, iframeSrc}) => {
  if (!isOpen) return null; // Don't render if closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full h-[80vh] shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* If iframeSrc is passed, show iframe. Otherwise, show children */}
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            title={title}
            className="flex-grow w-full border rounded"
          ></iframe>
        ) : (
          <div className="max-h-80 overflow-y-auto text-sm">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
