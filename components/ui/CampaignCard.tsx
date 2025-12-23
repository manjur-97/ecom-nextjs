"use client";
import React, { useEffect, useMemo, useState } from "react";

type CampaignCardProps = {
  title?: string;
  subtitle?: string;
  discount?: string;
  image?: string;
  endDate?: string | Date;
  className?: string;
};

function getRemaining(end: Date) {
  const total = Math.max(0, Math.floor((end.getTime() - Date.now()) / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
}

export default function CampaignCard({
  title = "SOUND AND MUSIC",
  subtitle = "30% OFF",
  discount = "30% OFF",
  image = "/campaign-default.jpg",
  endDate,
  className = "",
}: CampaignCardProps) {
  const end = useMemo(() => {
    if (endDate) return new Date(endDate);
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }, [endDate]);

  const [time, setTime] = useState(() => getRemaining(end));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(end)), 1000);
    return () => clearInterval(id);
  }, [end]);

  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={`w-full max-w-xs rounded-lg bg-white shadow-md overflow-hidden ${className}`}>
      <div className="relative h-56 bg-gray-100">
        <img src={image} alt={title} className="object-cover w-full h-56" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-slate-500 uppercase">{title}</div>
            <div className="text-2xl font-semibold text-sky-600 mt-1">{subtitle}</div>
          </div>

          <button
            aria-label="open"
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white shadow border border-slate-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 6l6 6-6 6" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="text-sm text-slate-600">{discount}</div>
          <div className="ml-auto flex gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-slate-800 text-white rounded-md px-3 py-2 text-sm shadow-sm">{fmt(time.days)}d</div>
              <div className="bg-slate-800 text-white rounded-md px-3 py-2 text-sm shadow-sm">{fmt(time.hours)}h</div>
              <div className="bg-slate-800 text-white rounded-md px-3 py-2 text-sm shadow-sm">{fmt(time.minutes)}m</div>
              <div className="bg-slate-800 text-white rounded-md px-3 py-2 text-sm shadow-sm">{fmt(time.seconds)}s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
