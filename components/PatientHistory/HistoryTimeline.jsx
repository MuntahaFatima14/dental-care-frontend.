import React from "react";
import { HiShieldCheck } from "react-icons/hi";
import HistoryDetailCard from "./HistoryDetailCard";

export default function HistoryTimeline({ history, onStartNewConsultation }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Consultation History
            {history.length > 0 && (
              <span className="text-xs bg-[#E9F4F8] text-[#5B8AA0] px-2.5 py-1 rounded-full font-bold">
                {history.length} Visits
              </span>
            )}
          </h2>
          <p className="text-xs text-gray-400 mt-1">Review the historical visit diagnoses and prescription archives.</p>
        </div>

        {/* Start Visit Button */}
        <button
          onClick={onStartNewConsultation}
          className="px-5 py-2.5 bg-[#5B8AA0] hover:bg-[#4d788c] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <HiShieldCheck className="w-4 h-4" /> Start New Consultation
        </button>
      </div>

      <div className="space-y-4">
        {history.map((visit, idx) => (
          <HistoryDetailCard
            key={visit.id}
            visit={visit}
            visitNumber={history.length - idx}
          />
        ))}
      </div>
    </div>
  );
}
