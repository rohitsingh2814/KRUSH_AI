import api from "./api";

export const analyzeOutfit = async (photo, occasion) => {

  const formData = new FormData();

  formData.append("photo", photo);

  formData.append("occasion", occasion);

  const response = await api.post(
    "/analysis/analyze",
    formData
  );

  return response.data;
};