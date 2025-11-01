import axiosInstance from "../utils/axiosinterceptor";

export interface Subheading {
  title: string;
  description: string;
}

export interface ManufacturingSection {
  id?: number;
  headerId?: number;
  name: string;
  description: string;
  subheadings?: Subheading[];
  ctaText?: string;
  ctaLink?: string;
  mediaUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  order?: number;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const manufacturingService = {
  async getAll() {
    const res = await axiosInstance.get<ManufacturingSection[]>(
      "/api/Manufacturing-rnd"
    );
    return res.data;
  },

  async create(data: ManufacturingSection) {
    const res = await axiosInstance.post("/api/Manufacturing-rnd", data);
    return res.data;
  },

  async update(id: number, data: ManufacturingSection) {
    const res = await axiosInstance.put(`/api/Manufacturing-rnd/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await axiosInstance.delete(`/api/Manufacturing-rnd/${id}`);
    return res.data;
  },
};

export default manufacturingService;
