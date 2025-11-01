"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import {
  fetchAllQuickStats,
  updateQuickStat,
} from "@/app/lib/store/features/quickStatsSlice";
import { useParams, useRouter } from "next/navigation";
import QuickStatsForm from "../../components/QuickStatsForm";

export default function EditQuickStatPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { quickStats } = useSelector((state: RootState) => state.quickstats);
  const [currentData, setCurrentData] = useState<any>(null);

  useEffect(() => {
    if (!quickStats.length) dispatch(fetchAllQuickStats());
  }, [dispatch, quickStats.length]);

  useEffect(() => {
    const stat = quickStats.find((s) => s.id === Number(id));
    if (stat) setCurrentData(stat);
  }, [quickStats, id]);

  const handleSubmit = async (data: any) => {
    await dispatch(updateQuickStat({ id: Number(id), data }));
    router.push("/dashboard/quick-stats");
  };

  if (!currentData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Quick Stat</h1>
      <QuickStatsForm
        initialData={currentData}
        buttonLabel="Update"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
