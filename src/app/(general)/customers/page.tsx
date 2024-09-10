"use client";
import { useState, useEffect } from 'react';
import Spin from '@/components/spin';
import { useCheckAuth } from '@/utils/auth';
import CustomerSelect from '@/app/(general)/customers/customer-select';
import CustomerInfo from './customer-info';
import CustomerMeetings from './customer-meetings';
import CustomerPayments from './customer-payments';
import { Customer, Encounter, getCustomers, Payment } from '@/utils/customer';
import { getImage } from '@/utils/getImage';

const CustomersPage = () => {
  const role = useCheckAuth();
  const [customerList, setCustomerList] = useState<Array<Customer>>([]); // Stocke les données des clients
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [customerPayments, setCustomerPayments] = useState<Array<Payment>>([]);
  const [customerMeetings, setCustomerMeetings] = useState<Array<Encounter>>([]);
  const [customerImage, setCustomerImage] = useState("");

  // Utilise useEffect pour récupérer les données des clients quand le composant est monté
  useEffect(() => {
    if (role === "") return;
    getCustomers(role).then((data) => setCustomerList(data));
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

  return (
    <div>
      <CustomerSelect handleSelectChange={handleSelectChange} />
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