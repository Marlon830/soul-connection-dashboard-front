import React from 'react';
import Modal from 'react-modal';
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface CreateEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  newEmployee: {
    email: string;
    password: string;
    name: string;
    surname: string;
    birthDate: string;
    gender: string;
    work: string;
  };
  errors: {
    email: string;
    password: string;
    name: string;
    surname: string;
    birthDate: string;
    work: string;
  };
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleCreateEmployeeChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCreateEmployeeSubmit: () => void;
  isFormValid: boolean;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
};

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({
  isOpen,
  onClose,
  newEmployee,
  errors,
  showPassword,
  togglePasswordVisibility,
  handleCreateEmployeeChange,
  handleCreateEmployeeSubmit,
  isFormValid
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel="Create Employee Account" ariaHideApp={false}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Create Employee Account</h2>
        <button onClick={onClose} className="text-black text-2xl font-bold leading-none">
          &times;
        </button>
      </div>
      <form className="flex flex-col space-y-4">
        <label className="block text-black">Email</label>
        <input
          type="email"
          name="email"
          placeholder="john.doe@example.com"
          value={newEmployee.email}
          onChange={handleCreateEmployeeChange}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="block text-black">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={newEmployee.password}
            onChange={handleCreateEmployeeChange}
            className="p-2 border border-gray-300 rounded text-black w-full"
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button type="button" onClick={togglePasswordVisibility} className="text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <label className="block text-black">Name</label>
        <input
          type="text"
          name="name"
          placeholder="John"
          value={newEmployee.name}
          onChange={handleCreateEmployeeChange}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label className="block text-black">Surname</label>
        <input
          type="text"
          name="surname"
          placeholder="Doe"
          value={newEmployee.surname}
          onChange={handleCreateEmployeeChange}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />
        {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}

        <label className="block text-black">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={newEmployee.birthDate}
          onChange={handleCreateEmployeeChange}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />
        {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}

        <label className="block text-black">Gender</label>
        <select
          name="gender"
          value={newEmployee.gender}
          onChange={handleCreateEmployeeChange}
          className="p-2 border border-gray-300 rounded text-black"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="block text-black">Work</label>
        <input
          type="text"
          name="work"
          placeholder="Coach"
          value={newEmployee.work}
          onChange={handleCreateEmployeeChange}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />
        {errors.work && <p className="text-red-500 text-sm">{errors.work}</p>}

        <button
          type="button"
          onClick={handleCreateEmployeeSubmit}
          className={`px-4 py-2 rounded ${isFormValid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Create Employee
        </button>
      </form>
    </Modal>
  );
};

export default CreateEmployeeModal;
