"use client";
import { useState, useEffect } from 'react';
import Spin from '@/components/spin';
import { useCheckAuth } from '@/utils/auth';
import axios from 'axios';
import CustomerSelect from '@/app/general/customers/customer-select';
import CustomerInfo from './customer-info';
import CustomerMeetings from './customer-meetings';
import CustomerPayments from './customer-payments';

interface Payment {
  date: string;
  payment_method: string;
  amount: number;
  comment: string;
}

interface Encounter {
  date: string;
  rating: number;
  comment: string;
  source: string;
}

interface Customer {
  id: number;
  name: string;
  surname: string;
  birth_date: string;
  imageId: string;
  payments: Array<Payment>;
  encounters: Array<Encounter>;
  address: string;
}

const CustomersPage = () => {
  const role = useCheckAuth();
  const [customerList, setCustomerList] = useState<Array<Customer>>([]); // Stocke les données des clients
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [customerPayments, setCustomerPayments] = useState<Array<Payment>>([]);
  const [customerMeetings, setCustomerMeetings] = useState<Array<Encounter>>([]);
  const [customerImage, setCustomerImage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getCustomers = async () => {
    try {
      const apiURL = role === "Coach" ? "/employees/my_clients" : "/customers/all_customers";
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${apiURL}`, {
        withCredentials: true,
      });
      setCustomerList(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const getImage = async (imageId: string | undefined): Promise<string> => {
    if (!imageId) return "";
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${imageId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching customer image:", error);
    }
    return "";
  };

  // Utilise useEffect pour récupérer les données des clients quand le composant est monté
  useEffect(() => {
    if (role === "") return;
    getCustomers();
  }, [role]);

  // Fonction pour gérer la sélection d'un client
  const handleSelectChange = async (event: any) => {
    const customerId = event.target.value;
    const customer = customerList.find(cust => cust.id === parseInt(customerId));
    if (customer)
      setSelectedCustomer(customer);

    const payments = customer?.payments || [];
    const meetings = customer?.encounters || [];
    const image = await getImage(customer?.imageId);

    setCustomerPayments(payments);
    setCustomerMeetings(meetings);
    setCustomerImage(image);
  };

  if (role === "") {
    return (<Spin />);
  }

  const handleCollapseChange = (collapsed: any) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div>
      <CustomerSelect customerList={customerList} handleSelectChange={handleSelectChange} />
      {selectedCustomer && (
        <div className="mt-6 flex space-x-6">
          <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-inner">
            <CustomerInfo name={selectedCustomer.name} surname={selectedCustomer.surname} birth_date={selectedCustomer.birth_date} address={selectedCustomer.address} img={customerImage} />
            <CustomerMeetings customerMeetings={customerMeetings} length={customerMeetings.length} />
          </div>
          {role != "Coach" && (
            <CustomerPayments customerPayments={customerPayments} length={customerPayments.length} />
          )}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;