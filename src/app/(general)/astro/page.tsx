"use client";

import { useState, useEffect } from 'react';
import Spin from '@components/spin';
import { useCheckAuth } from '@utils/auth';
import { checkCompatibility, ZodiacSign } from '@utils/astroCompatibility';
import { Customer, getCustomers } from '@utils/customer';
import CustomerSelect from '../customers/customer-select';

const AstroPage = () => {
  const role = useCheckAuth();
  const [customerList, setCustomerList] = useState<Array<Customer>>([]);
  const [customer1Astro, setCustomer1Astro] = useState<ZodiacSign | undefined>();
  const [customer2Astro, setCustomer2Astro] = useState<ZodiacSign | undefined>();
  const [compatibility, setCompatibility] = useState<number | undefined>();

  useEffect(() => {
    if (role === "") return;
    getCustomers(role).then((customers: Array<Customer>) => setCustomerList(customers));
  }, [role]);

  const handleSelect1Change = async (event: any) => {
    const customerId = event.target.value;
    const customer = customerList.find(cust => cust.id === parseInt(customerId));

    setCustomer1Astro(customer?.astrological_sign);
  };

  const handleSelect2Change = async (event: any) => {
    const customerId = event.target.value;
    const customer = customerList.find(cust => cust.id === parseInt(customerId));

    setCustomer2Astro(customer?.astrological_sign);
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
        <div>
          <CustomerSelect handleSelectChange={handleSelect1Change} />
          {customer1Astro && (
            <p className="text-gray-500 text-center mt-2">
              Sign: {customer1Astro}
            </p>
          )}
        </div>

        {/* Sélecteur Client 2 */}
        <div>
          <CustomerSelect handleSelectChange={handleSelect2Change} />
          {customer2Astro && (
            <p className="text-gray-500 text-center mt-2">
              Sign: {customer2Astro}
            </p>
          )}
        </div>

        {/* Résultat */}
        {compatibility && (
          <div className="mt-8 text-center relative w-full sm:w-80 h-80 mx-auto">
            {/* Image du coeur */}
            <img
              src="/coeur.png"
              alt="coeur"
              className="w-full h-full object-contain"
            />
            {/* Texte du pourcentage centré par-dessus */}
            <div className="absolute inset-0 flex items-center justify-center ml-5 mb-7">
              <p className="text-4xl sm:text-8xl font-bold text-pink-400 font-filxgirl">
                {compatibility}%
              </p>
            </div>

            {/* GIF basé sur la compatibilité */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              {compatibility < 50 ? (
                <img
                  src="/cry.gif"
                  alt="crying"
                  className="w-10 sm:w-20 h-10 sm:h-20 mt-4"
                />
              ) : (
                <img
                  src="/love.gif"
                  alt="love"
                  className="w-10 sm:w-20 h-10 sm:h-20 mt-4"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstroPage;
