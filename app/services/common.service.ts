// src/services/headerService.ts

import axiosInstance from "../utils/axiosinterceptor";

const HEADER_ENDPOINT = "/api";

const commonServies = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      `${HEADER_ENDPOINT}/upload-media`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
};

export default commonServies;
