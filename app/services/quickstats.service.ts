import axiosInstance from "@/app/utils/axiosinterceptor";

export interface QuickStatData {
  id?: number;
  number: string;
  title: string;
  iconUrl?: string | null;
  color?: string;
  order?: number;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const QUICK_STATS_ENDPOINT = "/api/quick-stats";

const quickStatsService = {
  // 🟢 Create (single or multiple)
  createQuickStats: async (data: QuickStatData | QuickStatData[]) => {
    const payload = Array.isArray(data) ? { stats: data } : data;
    const response = await axiosInstance.post(QUICK_STATS_ENDPOINT, payload);
    return response.data;
  },

  // 🔵 Get all quick stats
  getAllQuickStats: async () => {
    const response = await axiosInstance.get(QUICK_STATS_ENDPOINT);
    return response.data;
  },

  // 🟠 Update quick stat
  updateQuickStat: async (id: number, data: Partial<QuickStatData>) => {
    const response = await axiosInstance.put(
      `${QUICK_STATS_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  },

  // 🔴 Delete quick stat
  deleteQuickStat: async (id: number) => {
    const response = await axiosInstance.delete(
      `${QUICK_STATS_ENDPOINT}/${id}`
    );
    return response.data;
  },

  // 🟡 Reorder stats
  reorderQuickStats: async (order: { id: number; order: number }[]) => {
    const response = await axiosInstance.put(
      `${QUICK_STATS_ENDPOINT}/reorder/all`,
      {
        order,
      }
    );
    return response.data;
  },
};

export default quickStatsService;
