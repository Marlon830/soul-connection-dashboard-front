import axios from "axios";

export const getImage = async (imageId: string | undefined): Promise<string> => {
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
