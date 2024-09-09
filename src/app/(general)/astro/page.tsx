"use client";
import { useState, useEffect } from 'react';
import Spin from '@/components/spin';
import { useCheckAuth } from '@/utils/auth';
import { checkCompatibility } from './astroCompatibility';
import axios from 'axios';

const AstroPage = () => {
  const role = useCheckAuth();
  const [customersData, setCustomersData] = useState([]);
  const [selectedCustomer1, setSelectedCustomer1] = useState(null);
  const [selectedCustomer2, setSelectedCustomer2] = useState(null);
  const [customer1Astro, setCustomer1Astro] = useState(null);
  const [customer2Astro, setCustomer2Astro] = useState(null);
  const [compatibility, setCompatibility] = useState(null);

  const getCustomers = async () => {
    try {
      const url = role === "Coach"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/my_clients`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/customers/all_customers`;
      const response = await axios.get(url, { withCredentials: true });
      setCustomersData(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const getAstro = async (customerId: number) => {
    return customersData.find(cust => cust.id === customerId)?.astrological_sign;
  };

  useEffect(() => {
    if (role === "") return;
    getCustomers();
  }, [role]);

  const handleSelect1Change = async (event: any) => {
    const customerId = event.target.value;
    const customer = customersData.find(cust => cust.id === parseInt(customerId));
    setSelectedCustomer1(customer);

    const astro_sign = await getAstro(parseInt(customerId));
    setCustomer1Astro(astro_sign);
  };

  const handleSelect2Change = async (event: any) => {
    const customerId = event.target.value;
    const customer = customersData.find(cust => cust.id === parseInt(customerId));
    setSelectedCustomer2(customer);

    const astro_sign = await getAstro(parseInt(customerId));
    setCustomer2Astro(astro_sign);
  };

  const getCompatibility = () => {
    if (customer1Astro && customer2Astro) {
      const result = checkCompatibility(customer1Astro, customer2Astro);
      setCompatibility(result);
    }
  };

  if (role === "") {
    return (<Spin />);
  }

  return (
    < div className="mt-10 bg-pink-200 p-8 rounded-lg shadow-lg" >
      <h2 className="text-center text-6xl font-bold text-pink-400 mb-6 font-filxgirl">
        Astrological Compatibility
      </h2>
      <div className="flex justify-center space-x-4">
        {/* Sélecteur Client 1 */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <label htmlFor="customer1" className="block text-gray-700 mb-2">Client 1</label>
          <select
            id="customer1"
            value={selectedCustomer1?.id || ''}
            onChange={handleSelect1Change}
            className="p-2 border border-gray-300 rounded-lg text-black">
            <option value="">select a customer</option>
            {customersData.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name} {customer.surname}
              </option>
            ))}
          </select>
          {customer1Astro && (
            <p className="mt-2 text-gray-600">Astrological Sign : {customer1Astro}</p>
          )}
        </div>

        {/* Sélecteur Client 2 */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <label htmlFor="customer2" className="block text-gray-700 mb-2">Client 2</label>
          <select
            id="customer2"
            value={selectedCustomer2?.id || ''}
            onChange={handleSelect2Change}
            className="p-2 border border-gray-300 rounded-lg text-black">
            <option value="">select a customer</option>
            {customersData.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name} {customer.surname}
              </option>
            ))}
          </select>
          {customer2Astro && (
            <p className="mt-2 text-gray-600">Astrological Sign : {customer2Astro}</p>
          )}
        </div>
      </div>

      {/* Bouton Test de compatibilité */}
      <div className="mt-8 text-center">
        <button
          onClick={getCompatibility}
          className="px-6 py-3 bg-pink-400 text-white font-bold rounded-lg hover:bg-pink-600 transition duration-300">
          Test Compatibility
        </button>
      </div>

      {/* Résultat */}
      {
        compatibility && (
          <div className="mt-8 text-center relative w-80 h-80 mx-auto">
            {/* Image du coeur */}
            <img
              src="/coeur.png"
              alt="coeur"
              className="w-full h-full object-contain"
            />
            {/* Texte du pourcentage centré par-dessus */}
            <div className="absolute inset-0 flex items-center justify-center ml-5 mb-7">
              <p className="text-8xl font-bold text-pink-400 font-filxgirl">
                {compatibility}%
              </p>
            </div>

            {/* GIF basé sur la compatibilité */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              {compatibility < 50 ? (
                <img
                  src="/cry.gif"
                  alt="crying"
                  className="w-20 h-20 mt-4"
                />
              ) : (
                <img
                  src="/love.gif"
                  alt="love"
                  className="w-20 h-20 mt-4"
                />
              )}
            </div>
          </div>
        )
      }
    </div >
  );
};

export default AstroPage;
