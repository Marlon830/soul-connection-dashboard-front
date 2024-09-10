import { useCheckAuth } from "@/utils/auth";
import { Customer, getCustomers } from "@/utils/customer";
import { useState } from "react";

export default function CustomerSelect({ handleSelectChange }: any) {
  const [customerList, setCustomerList] = useState<Array<Customer>>([]);
  const role = useCheckAuth();

  getCustomers(role).then((customers) => {
    setCustomerList(customers);
  });

  return (
    <div className="mb-6">
      <select
        id="customer-select"
        onChange={handleSelectChange}
        className="block text-black p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">-- Select a Customer --</option>
        {customerList.length > 0 && customerList.map((customer: Customer) => (
          <option key={customer.id} value={customer.id}>
            Customer: {customer.name} {customer.surname}
          </option>
        ))}
      </select>
    </div>
  );
}
