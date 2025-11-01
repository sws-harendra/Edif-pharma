// app/lib/services/finalCtaBannerService.ts
import axiosInstance from "../utils/axiosinterceptor";

export interface FinalCTABanner {
  id?: number;
  headerId?: number;
  title: string;
  subtitle: string;
  gradientStart?: string;
  gradientEnd?: string;
  backgroundImage?: string;
  quoteButtonText?: string;
  quoteButtonLink?: string;
  quoteButtonPopup?: boolean;
  catalogButtonText?: string;
  catalogFile?: string;
  enabled?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

const finalCtaBannerService = {
  // ✅ Get active CTA banner
  async get() {
    const res = await axiosInstance.get<FinalCTABanner>("/api/finalcta");
    return res.data;
  },

  // ✅ Create new CTA banner
  async create(data: FinalCTABanner) {
    const res = await axiosInstance.post("/api/finalcta", data);
    return res.data;
  },

  // ✅ Update CTA banner
  async update(id: number, data: FinalCTABanner) {
    const res = await axiosInstance.put(`/api/finalcta/${id}`, data);
    return res.data;
  },
};

export default finalCtaBannerService;
