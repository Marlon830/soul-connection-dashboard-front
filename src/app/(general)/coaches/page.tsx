"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCheckAuth } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa';

import Spin from "@/components/spin";

import CustomersModal from './coachesCustomersModal';
import CreateEmployeeModal from './coachesCreateEmployeeModal';
import DeleteCoachModal from './coachesDeleteCoachModal';
import { Customer } from '@/utils/customer';
import { Employee } from '@/utils/employee';

interface EmployeeError {
  email: string;
  password: string;
  name: string;
  surname: string;
  birth_date: string;
  work: string;
}

const AccountManagement: React.FC = () => {
  const router = useRouter();
  const workName = useCheckAuth();

  const [coaches, setCoaches] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Employee | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [coachToDelete, setCoachToDelete] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State for employee creation modal
  const [isCreateEmployeeModalOpen, setIsCreateEmployeeModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    email: '',
    password: '',
    name: '',
    surname: '',
    birth_date: '',
    gender: 'Male',
    work: '',
  });
  const [errors, setErrors] = useState<EmployeeError>({
    email: "",
    password: "",
    name: "",
    surname: "",
    birth_date: "",
    work: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (workName === '') return;

    if (workName === 'Coach') {
      router.push('/');
    }

    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/all_employees`, { withCredentials: true });
        const employees = response.data;

        const filteredEmployees = employees.filter((employee: any) => employee.work === 'Coach').map((employee: any) => {
          return {
            id: employee.id,
            name: employee.name,
            surname: employee.surname,
            birth_date: employee.birth_date,
            lastConnection: employee.lastConnection,
          };
        });
        filteredEmployees.sort((a: Employee, b: Employee) => a.id - b.id);
        setCoaches(filteredEmployees);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers/all_customers`, { withCredentials: true });
        const customers = response.data;

        const filteredCustomers = customers.map((customer: any) => {
          return {
            id: customer.id,
            name: customer.name,
            surname: customer.surname,
            coachId: customer.coachId || 0,
          };
        });
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }
    fetchData();
  }, [workName]);

  if (workName === '') {
    return (
      <Spin />
    );
  }

  if (workName === 'Coach') {
    return null;
  }

  const openDeleteModal = (coach: Employee) => {
    setCoachToDelete(coach);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCoachToDelete(null);
  };

  const handleDeleteCoach = async () => {
    if (!coachToDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${coachToDelete.id}`, { withCredentials: true });
      setCoaches((prevCoaches) => prevCoaches.filter((coach) => coach.id !== coachToDelete.id));
      toast.success('Coach deleted successfully!');
    } catch (error) {
      console.error('Error deleting coach:', error);
      toast.error('Failed to delete coach.');
    } finally {
      closeDeleteModal();
    }
  };

  const openModal = (coach: Employee) => {
    setSelectedCoach(coach);
    setIsCustomerModalOpen(true);
  };

  const closeCustomerModal = () => {
    setIsCustomerModalOpen(false);
    setSelectedCoach(null);
    setSearchTerm('');
  };

  const handleToggleCustomer = async (customerId: number) => {
    if (!selectedCoach) return;

    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    const newCoachId = customer.coachId === selectedCoach.id ? 0 : selectedCoach.id;

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${newCoachId}/assign_client/${customerId}`, {}, { withCredentials: true });

      const updatedCustomer: Customer[] = customers.map((c) =>
        c.id === customerId ? { ...c, coachId: newCoachId === 0 ? null : newCoachId } : c
      ) as Customer[];

      setCustomers(updatedCustomer);
    } catch (error) {
      console.error('Error assigning/retiring customer:', error);
    }
  };

  const filteredCustomers = searchTerm.length >= 1
    ? customers.filter(
      (customer) =>
        (customer.name.toLowerCase() + ' ' + customer.surname.toLowerCase()).includes(searchTerm.toLowerCase()) ||
        (customer.surname.toLowerCase() + ' ' + customer.name.toLowerCase()).includes(searchTerm.toLowerCase())
    )
    : customers;

  const filteredCustomersWithCoach = filteredCustomers.map((customer) => {
    const coach = coaches.find((c) => c.id === customer.coachId);
    return {
      ...customer,
      coachName: coach ? `${coach.name} ${coach.surname}` : null,
    };
  });

  const openCreateEmployeeModal = () => {
    setIsCreateEmployeeModalOpen(true);
  };

  const closeCreateEmployeeModal = () => {
    setIsCreateEmployeeModalOpen(false);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid.";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required.";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters.";
        }
        break;
      case "name":
        if (!value) {
          error = "Name is required.";
        }
        break;
      case "surname":
        if (!value) {
          error = "Surname is required.";
        }
        break;
      case "birth_date":
        if (!value) {
          error = "Birth Date is required.";
        }
        break;
      case "work":
        if (!value) {
          error = "Work field is required.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleCreateEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleCreateEmployeeSubmit = async () => {
    const newErrors = Object.keys(newEmployee).reduce((acc, key) => {
      const error = validateField(key, (newEmployee[key as keyof typeof newEmployee]) as string);
      if (error) acc[key as keyof EmployeeError] = error;
      return acc;
    }, {} as typeof errors);

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, newEmployee, { withCredentials: true });
      if (response.status === 200) {
        setNewEmployee({
          id: 0,
          email: '',
          password: '',
          name: '',
          surname: '',
          birth_date: '',
          gender: 'Male',
          work: '',
        });
        setErrors({
          email: "",
          password: "",
          name: "",
          surname: "",
          birth_date: "",
          work: "",
        });
        closeCreateEmployeeModal();
        toast.success("Employee created successfully!");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/all_employees`, { withCredentials: true });
        const employees = response.data;

        const filteredEmployees = employees.filter((employee: any) => employee.work === 'Coach').map((employee: any) => {
          return {
            id: employee.id,
            name: employee.name,
            surname: employee.surname,
            birth_date: employee.birth_date,
            lastConnection: employee.lastConnection || 'N/A',
          };
        });
        filteredEmployees.sort((a: Employee, b: Employee) => a.id - b.id);
        setCoaches(filteredEmployees);
      } else {
        toast.error(`Error creating employee: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`Error creating employee: ${(error as Error).message || "Unknown error"}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = Object.values(errors).every((error) => !error) && Object.values(newEmployee).every((value) => value);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable={false} pauseOnFocusLoss />
  
      <div className="flex sm:justify-end justify-start">
        <button
          onClick={openCreateEmployeeModal}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
        >
          Create Employee
        </button>
      </div>
  
      <div className="">
        <table className="w-full bg-white border border-gray-200 table-fixed">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b" style={{ wordWrap: 'break-word' }}>#</th>
              <th className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b" style={{ wordWrap: 'break-word' }}>Name</th>
              <th className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b" style={{ wordWrap: 'break-word' }}>Birth Date</th>
              <th className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b" style={{ wordWrap: 'break-word' }}>Customers</th>
              <th className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b" style={{ wordWrap: 'break-word' }}>Last connection</th>
              <th className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b" style={{ wordWrap: 'break-word' }}></th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.id} className="bg-gray-100 even:bg-gray-200">
                <td className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b text-black text-center" style={{ wordWrap: 'break-word' }}>{coach.id}</td>
                <td className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b text-black text-center" style={{ wordWrap: 'break-word' }}>{coach.name} {coach.surname}</td>
                <td className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b text-black text-center" style={{ wordWrap: 'break-word' }}>{coach.birth_date.split('-').reverse().join('-')}</td>
                <td className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b text-center" style={{ wordWrap: 'break-word' }}>
                  <button
                    onClick={() => openModal(coach)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit list...
                  </button>
                </td>
                <td className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b text-black text-center" style={{ wordWrap: 'break-word' }}>{coach.lastConnection?.toString().split('T')[0].split('-').reverse().join('-') || 'N/A'}</td>
                <td className="sm:py-2 sm:px-4 py-0.5 px-1 sm:text-base text-xs border-b text-center" style={{ wordWrap: 'break-word' }}>
                  <button
                    onClick={() => openDeleteModal(coach)}
                    className="text-white bg-red-500 sm:p-3 p-2 rounded-lg hover:bg-red-600 transition-colors transform hover:scale-105 duration-300 ease-in-out"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {selectedCoach && (
        <CustomersModal
          isOpen={isCustomerModalOpen}
          onClose={closeCustomerModal}
          selectedCoach={selectedCoach}
          customers={customers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCustomersWithCoach={filteredCustomersWithCoach}
          handleToggleCustomer={handleToggleCustomer}
        />
      )}
  
      <CreateEmployeeModal
        isOpen={isCreateEmployeeModalOpen}
        onClose={closeCreateEmployeeModal}
        newEmployee={newEmployee}
        errors={errors}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        handleCreateEmployeeChange={handleCreateEmployeeChange}
        handleCreateEmployeeSubmit={handleCreateEmployeeSubmit}
        isFormValid={isFormValid}
      />
  
      <DeleteCoachModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteCoach}
        coach={coachToDelete}
      />
    </div>
  );
};

export default AccountManagement;
