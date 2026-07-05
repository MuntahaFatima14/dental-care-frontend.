import React from "react";

export default function PatientProfileCard({ patient }) {
  if (!patient) return null;

  return (
    <div className="bg-gradient-to-r from-[#5B8AA0] to-[#749BB5] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <span className="bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
          Patient Health Profile
        </span>
        <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
        <p className="text-sm opacity-90 leading-relaxed max-w-xl">
          {patient.gender} • {patient.age} years old • Blood Group {patient.bloodType} {patient.rh}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20 text-xs">
          <div>
            <span className="block opacity-75 font-semibold">Phone Contact</span>
            <strong className="text-sm mt-0.5 block">{patient.phone || "N/A"}</strong>
          </div>
          <div>
            <span className="block opacity-75 font-semibold">Email Address</span>
            <strong className="text-sm mt-0.5 block truncate">{patient.email || "N/A"}</strong>
          </div>
          <div>
            <span className="block opacity-75 font-semibold">Allergies</span>
            <strong className="text-sm mt-0.5 block truncate">{patient.allergies || "None reported"}</strong>
          </div>
          <div>
            <span className="block opacity-75 font-semibold">Chronic Conditions</span>
            <strong className="text-sm mt-0.5 block truncate">{patient.chronicConditions || "None"}</strong>
          </div>
        </div>
      </div>
      {/* Background structural overlay elements */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 skew-x-12 translate-x-1/3 pointer-events-none" />
    </div>
  );
}
