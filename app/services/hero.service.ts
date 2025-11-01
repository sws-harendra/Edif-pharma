import axiosInstance from "@/app/utils/axiosinterceptor";

export interface HeroData {
  id: number;
  bannerImage: string | null;
  backgroundVideo: string | null;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  animationType: string;
  headerId: number;
  createdAt?: string;
  updatedAt?: string;
  header?: {
    id: number;
    logoUrl: string;
    stickyHeader: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

const HERO_ENDPOINT = "/api/hero";

const heroService = {
  // 🟢 Create
  createHero: async (data: HeroData) => {
    const response = await axiosInstance.post(HERO_ENDPOINT, data);
    return response.data;
  },

  // 🔵 Get all hero sections
  getAllHeroes: async () => {
    const response = await axiosInstance.get(HERO_ENDPOINT);
    return response.data;
  },

  // 🟣 Get hero section by header ID
  getHeroByHeaderId: async (headerId: number) => {
    const response = await axiosInstance.get(`${HERO_ENDPOINT}/${headerId}`);
    return response.data;
  },

  // 🟠 Update
  updateHero: async (id: number, data: Partial<HeroData>) => {
    const response = await axiosInstance.put(`${HERO_ENDPOINT}/${id}`, data);
    return response.data;
  },

  // 🔴 Delete
  deleteHero: async (id: number) => {
    const response = await axiosInstance.delete(`${HERO_ENDPOINT}/${id}`);
    return response.data;
  },
};

export default heroService;
