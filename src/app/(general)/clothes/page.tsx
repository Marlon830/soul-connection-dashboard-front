"use client";

import CustomerSelect from "../customers/customer-select";
import { useEffect, useState } from "react";
import { useCheckAuth } from "@/utils/auth";
import Image from "next/image";
import Spin from "@/components/spin";
import { Clothe, Customer, getCustomers } from "@/utils/customer";
import { getImage } from "@/utils/getImage";

enum ClotheType {
  Hat = "hat/cap",
  Top = "top",
  Bottom = "bottom",
  Shoes = "shoes",
}

const ClothesPage = () => {
  // Role
  const role = useCheckAuth();

  // Customers
  const [customerList, setCustomerList] = useState<Array<Customer>>([]);

  // Clothes
  const [hatList, setHatList] = useState<Array<Clothe>>([]);
  const [topClotheList, setTopClotheList] = useState<Array<Clothe>>([]);
  const [bottomClotheList, setBottomClotheList] = useState<Array<Clothe>>([]);
  const [shoesList, setShoesList] = useState<Array<Clothe>>([]);

  // Indexes to track current clothing images
  const [hatIndex, setHatIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [shoesIndex, setShoesIndex] = useState(0);

  // Images
  const [customerImgSrc, setCustomerImgSrc] = useState("");
  const [hatImgSrc, setHatImgSrc] = useState("");
  const [topImgSrc, setTopImgSrc] = useState("");
  const [bottomImgSrc, setBottomImgSrc] = useState("");
  const [shoesImgSrc, setShoesImgSrc] = useState("");

  const handleSelectChange = async (event: any) => {
    const customerId = event.target.value;
    const customer: Customer | undefined = customerList.find(
      (cust: Customer) => cust.id === parseInt(customerId)
    );

    const refreshHatList = customer?.clothes.filter((clothe: Clothe) => clothe.type === ClotheType.Hat);
    const refreshTopClotheList = customer?.clothes.filter((clothe: Clothe) => clothe.type === ClotheType.Top);
    const refreshBottomClotheList = customer?.clothes.filter((clothe: Clothe) => clothe.type === ClotheType.Bottom);
    const refreshShoesList = customer?.clothes.filter((clothe: Clothe) => clothe.type === ClotheType.Shoes);

    if (refreshHatList) {
      setHatList(refreshHatList);
      setHatIndex(0);
    }
    if (refreshTopClotheList) {
      setTopClotheList(refreshTopClotheList);
      setTopIndex(0);
    }
    if (refreshBottomClotheList) {
      setBottomClotheList(refreshBottomClotheList);
      setBottomIndex(0);
    }
    if (refreshShoesList) {
      setShoesList(refreshShoesList);
      setShoesIndex(0);
    }

    setCustomerImgSrc(await getImage(customer?.imageId));
    setHatImgSrc(await getImage(refreshHatList?.[0]?.imageId));
    setTopImgSrc(await getImage(refreshTopClotheList?.[0]?.imageId));
    setBottomImgSrc(await getImage(refreshBottomClotheList?.[0]?.imageId));
    setShoesImgSrc(await getImage(refreshShoesList?.[0]?.imageId));
  };

  const handleNextHat = async () => {
    const newIndex = (hatIndex + 1) % hatList.length;
    setHatIndex(newIndex);
    setHatImgSrc(await getImage(hatList[newIndex].imageId));
  };

  const handlePrevHat = async () => {
    const newIndex = (hatIndex - 1 + hatList.length) % hatList.length;
    setHatIndex(newIndex);
    setHatImgSrc(await getImage(hatList[newIndex].imageId));
  };

  const handleNextTop = async () => {
    const newIndex = (topIndex + 1) % topClotheList.length;
    setTopIndex(newIndex);
    setTopImgSrc(await getImage(topClotheList[newIndex].imageId));
  };

  const handlePrevTop = async () => {
    const newIndex = (topIndex - 1 + topClotheList.length) % topClotheList.length;
    setTopIndex(newIndex);
    setTopImgSrc(await getImage(topClotheList[newIndex].imageId));
  };

  const handleNextBottom = async () => {
    const newIndex = (bottomIndex + 1) % bottomClotheList.length;
    setBottomIndex(newIndex);
    setBottomImgSrc(await getImage(bottomClotheList[newIndex].imageId));
  };

  const handlePrevBottom = async () => {
    const newIndex = (bottomIndex - 1 + bottomClotheList.length) % bottomClotheList.length;
    setBottomIndex(newIndex);
    setBottomImgSrc(await getImage(bottomClotheList[newIndex].imageId));
  };

  const handleNextShoes = async () => {
    const newIndex = (shoesIndex + 1) % shoesList.length;
    setShoesIndex(newIndex);
    setShoesImgSrc(await getImage(shoesList[newIndex].imageId));
  };

  const handlePrevShoes = async () => {
    const newIndex = (shoesIndex - 1 + shoesList.length) % shoesList.length;
    setShoesIndex(newIndex);
    setShoesImgSrc(await getImage(shoesList[newIndex].imageId));
  };

  useEffect(() => {
    if (role === "") return;
    getCustomers(role).then((customers: Array<Customer>) => setCustomerList(customers));
  }, [role]);

  if (role === "") {
    return (<Spin />);
  }

  return (
    <div>
      <CustomerSelect handleSelectChange={handleSelectChange} />
      <div>
        <div className="flex justify-center">
          {hatList.length > 1 && (
            <button onClick={handlePrevHat} className="mr-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_left.png" alt="Next" width={100} height={100} />
            </button>
          )}
          <Image src={hatImgSrc} alt="Hat Image" width={200} height={200} />
          {hatList.length > 1 && (
            <button onClick={handleNextHat} className="ml-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_right.png" alt="Next" width={100} height={100} />
            </button>
          )}
        </div>
        <div className="flex justify-center">
          <Image src={customerImgSrc} alt="Customer Face" width={200} height={200} />
        </div>
        <div className="flex justify-center">
          {topClotheList.length > 1 && (
            <button onClick={handlePrevTop} className="mr-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_left.png" alt="Next" width={100} height={100} />
            </button>
          )}
          <Image src={topImgSrc} alt="Top Image" width={200} height={200} />
          {topClotheList.length > 1 && (
            <button onClick={handleNextTop} className="ml-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_right.png" alt="Next" width={100} height={100} />
            </button>
          )}
        </div>
        <div className="flex justify-center">
          {bottomClotheList.length > 1 && (
            <button onClick={handlePrevBottom} className="mr-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_left.png" alt="Next" width={100} height={100} />
            </button>
          )}
          <Image src={bottomImgSrc} alt="Bottom Image" width={200} height={200} />
          {bottomClotheList.length > 1 && (
            <button onClick={handleNextBottom} className="ml-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_right.png" alt="Next" width={100} height={100} />
            </button>
          )}
        </div>
        <div className="flex justify-center">
          {shoesList.length > 1 && (
            <button onClick={handlePrevShoes} className="mr-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_left.png" alt="Next" width={100} height={100} />
            </button>
          )}
          <Image src={shoesImgSrc} alt="Shoes Image" width={200} height={200} />
          {shoesList.length > 1 && (
            <button onClick={handleNextShoes} className="ml-7 hover:scale-110 duration-300 ease-in-out">
              <Image src="/arrow_right.png" alt="Next" width={100} height={100} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothesPage;
