import React from 'react';
import { ModalProps } from '../../interface/modalProps';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  onTitleChange,
  onBodyChange,
  onSubmit,
  error,
  modalTitle,
}) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
      onClick={handleOutsideClick}
    >
      <div 
        className="modal-box bg-white p-6 rounded shadow-lg relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-6"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            id="Isolation_Mode" 
            data-name="Isolation Mode" 
            viewBox="0 0 24 24" 
            width="30" 
            height="30" 
            fill="red"
          >
            <polygon 
              points="24.061 2.061 21.939 -0.061 12 9.879 2.061 -0.061 -0.061 2.061 9.879 12 -0.061 21.939 2.061 24.061 12 14.121 21.939 24.061 24.061 21.939 14.121 12 24.061 2.061"
            />
          </svg>
        </button>
        <h2 className="text-2xl mb-4">
          {modalTitle}
        </h2>
        <form 
          onSubmit={onSubmit} 
          className="form-control"
        >
          <div className="mb-4">
            <label className="label">
              <span className="label-text text-black">
                Title
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              className="input input-bordered w-full bg-slate-100"
            />
          </div>
          <div className="mb-4">
            <label className="label">
              <span className="label-text text-black">
                Description
              </span>
            </label>
            <textarea
              value={body}
              onChange={onBodyChange}
              className="textarea textarea-bordered w-full bg-slate-100"
            />
          </div>
          <button 
            type="submit" 
            className="btn bg-slate-600 hover:bg-gray-500"
          >
            Save
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};
