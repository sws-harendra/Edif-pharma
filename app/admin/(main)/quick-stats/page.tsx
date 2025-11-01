"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import {
  fetchAllQuickStats,
  deleteQuickStat,
  reorderQuickStats,
} from "@/app/lib/store/features/quickStatsSlice";
import IconRenderer from "@/app/utils/iconRenderer";

// DND Kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Item Component
interface SortableItemProps {
  stat: any;
  onDelete: (id: number) => void;
}

function SortableItem({ stat, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stat.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border bg-background-light rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{stat.title}</h2>
          <p className="">{stat.number}</p>
          {stat.iconUrl && (
            <IconRenderer name={stat.iconUrl} className="w-10 h-10 mt-2" />
          )}
        </div>
        <span
          className="inline-block w-6 h-6 rounded-full"
          style={{ backgroundColor: stat.color }}
        ></span>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/admin/quick-stats/edit/${stat.id}`}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={(e) => e.stopPropagation()} // Prevent drag when clicking edit
        >
          Edit
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent drag when clicking delete
            onDelete(stat.id!);
          }}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function QuickStatsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { quickStats, status } = useSelector(
    (state: RootState) => state.quickstats
  );

  const [items, setItems] = useState(quickStats);
  const [isReordering, setIsReordering] = useState(false);

  // Update local state when Redux state changes
  useEffect(() => {
    setItems([...quickStats].sort((a, b) => (a.order || 0) - (b.order || 0)));
  }, [quickStats]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    dispatch(fetchAllQuickStats());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this stat?")) {
      await dispatch(deleteQuickStat(id));
      dispatch(fetchAllQuickStats());
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setIsReordering(true);

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      // Update order in database
      try {
        const orderData = newItems.map((item, index) => ({
          id: item.id,
          order: index,
        }));

        await dispatch(reorderQuickStats(orderData)).unwrap();

        // Refresh the list to ensure everything is in sync
        dispatch(fetchAllQuickStats());
      } catch (error) {
        console.error("Failed to reorder stats:", error);
        // Revert to original order on error
        setItems(
          [...quickStats].sort((a, b) => (a.order || 0) - (b.order || 0))
        );
      } finally {
        setIsReordering(false);
      }
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quick Stats</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/quick-stats/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add New
          </Link>
        </div>
      </div>

      {isReordering && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
          Updating order...
        </div>
      )}

      {quickStats.length === 0 ? (
        <p>No stats found.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((stat) => (
                <SortableItem
                  key={stat.id}
                  stat={stat}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
