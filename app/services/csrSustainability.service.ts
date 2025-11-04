import axiosInstance from "@/app/utils/axiosinterceptor";

export interface Initiative {
  title: string;
  photo: string;
  year: number;
  story: string;
}

export interface CSRData {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  learnMoreText: string;
  learnMoreLink: string;
  initiatives: Initiative[];
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const CSR_ENDPOINT = "/api/csrsustainability";

const csrSustainabilityService = {
  // 🟢 Create CSR section
  createCSR: async (data: CSRData) => {
    const response = await axiosInstance.post(CSR_ENDPOINT, data);
    return response.data;
  },

  // 🔵 Get CSR section
  getCSR: async () => {
    const response = await axiosInstance.get(CSR_ENDPOINT);
    return response.data;
  },

  // 🟠 Update CSR section
  updateCSR: async (id: number, data: Partial<CSRData>) => {
    const response = await axiosInstance.put(`${CSR_ENDPOINT}/${id}`, data);
    return response.data;
  },
};

export default csrSustainabilityService;
