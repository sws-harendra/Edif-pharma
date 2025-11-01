"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store/store";
import {
  createQuickStats,
  fetchAllQuickStats,
} from "@/app/lib/store/features/quickStatsSlice";
import QuickStatsForm from "../components/QuickStatsForm";
import { useRouter } from "next/navigation";

export default function AddQuickStatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await dispatch(createQuickStats(data));
    dispatch(fetchAllQuickStats());
    // router.push("/dashboard/quick-stats");
  };

  return (
    <div className="p-6 m-auto bg-background-light flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Add Quick Stat</h1>
      <QuickStatsForm buttonLabel="Create" onSubmit={handleSubmit} />
    </div>
  );
}
