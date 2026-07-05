import React, { useState } from "react";
import { HiCalendar } from "react-icons/hi";

export default function HistoryDetailCard({ visit, visitNumber }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!visit) return null;

  const dateStr = visit.createdAt ? new Date(visit.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "Unknown Date";

  return (
    <div className="border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition duration-200 overflow-hidden shadow-sm">
      {/* Header Panel summary toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#5B8AA0] shadow-sm border border-gray-100 flex-shrink-0">
            <HiCalendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#5B8AA0] tracking-wider block mb-0.5">
              Visit #{visitNumber} • {dateStr}
            </span>
            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
              {visit.ai_findings && visit.ai_findings.length > 0 
                ? `AI Diagnosis: ${visit.ai_findings.map(f => f.disease).join(", ")}`
                : "Routine General Checkup"
              }
            </h4>
          </div>
        </div>
        <span className="text-xs text-[#5B8AA0] font-bold underline hover:text-[#416578]">
          {isExpanded ? "Collapse Record" : "View Details"}
        </span>
      </button>

      {/* Collapsible Details */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100/60 pt-4 space-y-4 text-xs text-gray-700 bg-white">
          
          {/* Doctor identity metadata */}
          {visit.doctor_username && (
            <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl text-[10px] text-gray-500 font-semibold border border-gray-100/50">
              <span>Attending Clinician:</span>
              <span>{visit.doctor_username} (ID: {visit.doctor_id || "N/A"})</span>
            </div>
          )}

          {/* Symptoms */}
          <div>
            <strong className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Symptoms Summary</strong>
            <p className="bg-gray-50 p-3 rounded-xl text-gray-600 font-semibold whitespace-pre-wrap leading-relaxed border border-gray-100/50">
              {visit.symptoms || "No baseline symptoms reported."}
            </p>
          </div>

          {/* AI Scans */}
          {visit.ai_findings && visit.ai_findings.length > 0 && (
            <div>
              <strong className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">Detected Conditions (AI Vision Scan)</strong>
              <div className="flex flex-wrap gap-2">
                {visit.ai_findings.map((f, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-700 text-[10px] px-3 py-1.5 rounded-xl font-bold shadow-sm"
                  >
                    🦷 {f.disease} ({Math.round(f.confidence * 100)}% Confidence)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prescriptions */}
          {(visit.medication || visit.dosage || visit.instructions) && (
            <div className="bg-[#E9F4F8]/40 border border-[#E9F4F8] p-4 rounded-xl space-y-2">
              <strong className="block text-[10px] uppercase font-bold text-[#5B8AA0] tracking-wider mb-1">E-Prescription</strong>
              {visit.medication && (
                <p className="leading-relaxed">
                  <span className="font-bold text-gray-800">Medication:</span> {visit.medication}
                </p>
              )}
              {visit.dosage && (
                <p className="leading-relaxed">
                  <span className="font-bold text-gray-800">Dosage:</span> {visit.dosage}
                </p>
              )}
              {visit.instructions && (
                <p className="leading-relaxed">
                  <span className="font-bold text-gray-800">Administration Instructions:</span> {visit.instructions}
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          {visit.doctor_notes && (
            <div>
              <strong className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Clinician Consultation Remarks</strong>
              <p className="bg-gray-50 p-3 rounded-xl text-gray-600 font-semibold whitespace-pre-wrap leading-relaxed border border-gray-100/50">
                {visit.doctor_notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
