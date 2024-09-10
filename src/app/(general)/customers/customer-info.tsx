import Image from "next/image";

export default function CustomerInfo({ name, surname, birth_date, address, img }: any) {
  return (
    <div className="flex justify-between">
      <div>
        <div className="flex items-center">
          <Image
            src="/icons8-homme-96.png"
            alt="man icon"
            width={50}
            height={50}
            className="mr-4"
          />
          <h2 className="text-6xl font-semibold text-gray-800 flex items-center">{name} {surname}</h2>
        </div>
        <p className="text-gray-700 text-2xl mt-4 flex items-center">
          <Image
            src="/icons8-anniversaire-50.png"
            alt="birthday icon"
            width={50}
            height={50}
            className="mr-4 mb-3"
          />
          {birth_date}
        </p>
        <p className="text-gray-700 text-2xl mt-4 flex items-center">
          <Image
            src="/icons8-adresse-50.png"
            alt="address icon"
            width={50}
            height={50}
            className="mr-4 mb-3"
          />
          {address}
        </p>
      </div>
      <div className="ml-6">
        {img ? <Image
          src={img}
          alt="customer image"
          width={218}
          height={218}
          className="rounded-lg mr-4 mt-4"
        /> : <p>Loading...</p>}

      </div>
    </div>
  );
}