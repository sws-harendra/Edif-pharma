// src/services/headerService.ts

import axiosInstance from "../utils/axiosinterceptor";
export interface SubMenu {
  id: number;
  label: string;
  url: string;
  order: number;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuItem {
  id: number;
  label: string;
  url: string;
  order: number;
  enabled: boolean;
  subMenus?: SubMenu[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CTAButton {
  id: number;
  text: string;
  color: string;
  link: string;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeaderData {
  id: number;
  logoUrl: string;
  stickyHeader: boolean;
  ctaButton?: CTAButton;
  menuItems?: MenuItem[];
  createdAt?: string;
  updatedAt?: string;
}

const HEADER_ENDPOINT = "/api/header";

const headerService = {
  createHeader: async (data: HeaderData) => {
    const response = await axiosInstance.post(HEADER_ENDPOINT, data);
    return response.data;
  },

  getHeader: async () => {
    const response = await axiosInstance.get(HEADER_ENDPOINT);
    return response.data;
  },

  updateHeader: async (id: number, data: Partial<HeaderData>) => {
    const response = await axiosInstance.put(`${HEADER_ENDPOINT}/${id}`, data);
    return response.data;
  },

  deleteHeader: async (id: number) => {
    const response = await axiosInstance.delete(`${HEADER_ENDPOINT}/${id}`);
    return response.data;
  },
};

export default headerService;
