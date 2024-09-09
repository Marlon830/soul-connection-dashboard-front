import React from 'react';
import Modal from 'react-modal';

interface Coach {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  lastConnection: string;
}

interface DeleteCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  coach: Coach | null;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
  },
};

const DeleteCoachModal: React.FC<DeleteCoachModalProps> = ({ isOpen, onClose, onConfirm, coach }) => {
  if (!coach) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Confirm Deletion"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-semibold mb-4 text-black">Confirm Deletion</h2>
      <p className="text-black">Are you sure you want to delete Coach <strong>{coach.name} {coach.surname}</strong>?</p>
      <div className="mt-6 flex justify-end">
        <button onClick={onClose} className="px-4 py-2 mr-4 bg-gray-300 text-black rounded hover:bg-gray-400">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteCoachModal;
