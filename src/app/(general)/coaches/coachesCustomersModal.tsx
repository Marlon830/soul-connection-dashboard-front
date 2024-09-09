import React, { ChangeEvent } from "react";
import Modal from "react-modal";

interface Customer {
  id: number;
  name: string;
  surname: string;
  coachId: number;
  coachName: string | null;
}

interface Coach {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  lastConnection: string;
}

interface CustomersModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCoach: Coach | null;
  customers: Customer[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCustomersWithCoach: Customer[];
  handleToggleCustomer: (customerId: number) => void;
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

const CustomersModal: React.FC<CustomersModalProps> = ({
  isOpen,
  onClose,
  selectedCoach,
  customers,
  searchTerm,
  setSearchTerm,
  filteredCustomersWithCoach,
  handleToggleCustomer
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Customer List"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-bold mb-4 text-black">
        Assign Clients to {selectedCoach?.name} {selectedCoach?.surname}
      </h2>
      <input
        type="text"
        placeholder="Search clients..."
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
      />
      <div style={{ overflowY: "auto", flex: 1, paddingBottom: "1rem" }}>
        {filteredCustomersWithCoach.map((customer) => {
          const isAssignedToSelectedCoach = customer.coachId === selectedCoach?.id;
          const isAssignedToAnotherCoach =
            customer.coachId !== selectedCoach?.id &&
            customer.coachId !== null &&
            customer.coachId !== 0;

          return (
            <div
              key={customer.id}
              className={`flex justify-between items-center p-2 border ${
                isAssignedToSelectedCoach
                  ? "bg-green-300 border-green-500"
                  : isAssignedToAnotherCoach
                  ? "bg-blue-300 border-blue-500"
                  : "bg-gray-100 border-gray-300"
              } rounded mb-2 transition-colors`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`customer-${customer.id}`}
                  checked={isAssignedToSelectedCoach}
                  onChange={() => handleToggleCustomer(customer.id)}
                  className="mr-2"
                />
                <label htmlFor={`customer-${customer.id}`} className="text-black">
                  {customer.name} {customer.surname}
                  {customer.coachName && (
                    <span className="text-gray-500 text-sm ml-2">
                      {`(Coach: ${customer.coachName})`}
                    </span>
                  )}
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        style={{ marginTop: "1rem" }}
      >
        Close
      </button>
    </Modal>
  );
};

export default CustomersModal;
