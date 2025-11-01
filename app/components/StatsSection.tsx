"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchAllQuickStats } from "../lib/store/features/quickStatsSlice";
import IconRenderer from "../utils/iconRenderer";

const StatsSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { quickStats, status } = useSelector(
    (state: RootState) => state.quickstats
  );

  useEffect(() => {
    dispatch(fetchAllQuickStats());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center py-10 text-gray-500">Loading stats...</p>;
  }

  if (!quickStats || quickStats.length === 0) {
    return <p className="text-center py-10 text-gray-500">No stats found.</p>;
  }

  const sortedStats = [...quickStats].sort((a, b) => a.order! - b.order!);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sortedStats.map((stat) => (
            <StatCard
              key={stat.id}
              iconUrl={stat.iconUrl!}
              stat={stat.number}
              title={stat.title}
              color={stat.color || "#0F172A"} // default dark blue
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type StatCardProps = {
  iconUrl?: string;
  stat: string;
  title: string;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({
  iconUrl,
  stat,
  title,
  color = "#0F172A",
}) => {
  return (
    <div
      className="bg-white border rounded-xl shadow-lg p-8 text-center
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      <div
        className="w-20 h-20 text-white rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: color }}
      >
        {iconUrl ? (
          <IconRenderer name={iconUrl} className="w-10 h-10" />
        ) : (
          <IconRenderer name="CircleHelp" className="w-10 h-10 text-gray-300" />
        )}
      </div>

      <p className="text-4xl font-extrabold text-gray-900">{stat}</p>

      <p className="mt-2 text-lg font-medium text-gray-600">{title}</p>
    </div>
  );
};

export default StatsSection;
