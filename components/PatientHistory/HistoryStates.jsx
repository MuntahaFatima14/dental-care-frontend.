import React from "react";
import { HiShieldCheck } from "react-icons/hi";

export function HistoryLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <div className="w-12 h-12 border-4 border-[#5B8AA0] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-semibold text-sm">Loading medical history records...</p>
    </div>
  );
}

export function HistoryErrorState({ error, onRetry }) {
  return (
    <div className="text-center py-16 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <span className="text-5xl">⚠️</span>
      <h3 className="text-lg font-bold text-gray-800 mt-4">Failed to Load Chart</h3>
      <p className="text-sm text-gray-500 mt-1">{error}</p>
      <button
        onClick={onRetry}
        className="mt-6 px-6 py-2.5 bg-[#5B8AA0] text-white font-semibold rounded-xl text-sm hover:bg-[#4d788c] transition"
      >
        Return to Directory
      </button>
    </div>
  );
}

export function HistoryEmptyState({ onStartNewConsultation }) {
  return (
    <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
      <span className="text-5xl block"></span>
      <h3 className="text-base font-bold text-gray-500 mt-4">No Visits Logged Yet</h3>
      <p className="text-xs text-gray-400 mt-1 mb-6">Click the "Start New Consultation" button to log the first visit.</p>
      <button
        onClick={onStartNewConsultation}
        className="mx-auto px-5 py-2.5 bg-[#5B8AA0] hover:bg-[#4d788c] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
      >
        <HiShieldCheck className="w-4 h-4" /> Start New Consultation
      </button>
    </div>
  );
}
