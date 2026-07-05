import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiLockClosed } from "react-icons/hi";
import DoctorProfileWidget from "./DoctorProfileWidget";

export default function Doctorpage() {
  const location = useLocation();

  // Helper to read initial data from location state or fallback to sessionStorage
  const getInitialPatientData = () => {
    const stateData = location.state || {};
    if (stateData.name) {
      sessionStorage.setItem("current_selected_patient", JSON.stringify(stateData));
      return stateData;
    }
    const cached = sessionStorage.getItem("current_selected_patient");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  };

  const prepopulated = getInitialPatientData();
  const hasPrepopulated = !!prepopulated.name;

  /* ---------------- STATE ---------------- */
  const [bloodType, setBloodType] = useState(prepopulated.bloodType || "B (III)");
  const [rh, setRh] = useState(prepopulated.rh || "Rh +");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Unified State Hook tracking all frontend inputs dynamically
  const [patientData, setPatientData] = useState({
    name: prepopulated.name || "",
    allergies: prepopulated.allergies || "",
    chronicConditions: prepopulated.chronicConditions || "",
    age: prepopulated.age || "",
    weight: prepopulated.weight || "",
    bpSystolic: prepopulated.bpSystolic || "",
    bpDiastolic: prepopulated.bpDiastolic || ""
  });

  const bloodTypes = ["O (I)", "A (II)", "B (III)", "AB (IV)"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- FILE UPLOAD HANDLER ---------------- */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG, or PDF files allowed!");
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      alert("File must be less than 500MB!");
      return;
    }

    setUploadedFile(file);
  };

  /* ---------------- SUBMIT HANDLER WITH LIVE DATA ATTACHMENT ---------------- */
  const handleSubmit = async () => {
    if (!uploadedFile) {
      alert("Please upload an X-ray image first!");
      return;
    }

    setIsUploading(true);

    // Prepare multipart form payload matching backend configuration requirements
    const formData = new FormData();
    formData.append("image", uploadedFile);

    // Fixed: Using JavaScript safe evaluation .trim() with fallback strings
    const clientName = patientData.name && patientData.name.trim() ? patientData.name.trim() : "Anonymous Patient";
    const clientAge = patientData.age && patientData.age.trim() ? patientData.age.trim() : "N/A";

    formData.append("patient_name", clientName);
    formData.append("age", clientAge);

    // Package symptoms field combining baseline entries from the form variables safely
    const symptomSummary = `Allergies: ${patientData.allergies.trim() || "None"}. Chronic: ${patientData.chronicConditions.trim() || "None"}. BP: ${patientData.bpSystolic.trim() || "120"}/${patientData.bpDiastolic.trim() || "80"} mmHg. Weight: ${patientData.weight.trim() || "N/A"}. Blood Type: ${bloodType} ${rh}`;
    formData.append("symptoms", symptomSummary);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${apiBase}/api/detect/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend connection failed");

      const data = await response.json();

      // Pass the live text data directly forward to the dashboard
      navigate("/doctordashboard", {
        state: {
          detectionResults: data.results,
          imageFile: uploadedFile,
          patientInfo: {
            id: prepopulated.id || prepopulated._id || "",
            name: clientName,
            age: clientAge,
            symptoms: symptomSummary
          }
        }
      });

    } catch (error) {
      console.error("Error during execution:", error);
      alert("Failed to connect to the AI server. Confirm your Django server is running via terminal.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#D4DFE4] min-h-screen flex justify-center py-12 px-4">
      <div className="max-w-xl w-full">
        <div className="flex justify-end mb-6">
          <DoctorProfileWidget />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Patient Health Assessment
        </h1>

        <p className="text-sm text-gray-700 mb-6 leading-relaxed text-center">
          Providing this data helps the doctor customize treatment and ensure precise care.
        </p>

        {hasPrepopulated && (
          <div className="mb-6 bg-white border border-gray-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-xl"></span>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Connected Record</span>
                <span className="text-xs font-bold text-gray-700">{patientData.name} ({patientData.age} Yrs)</span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/patients/${prepopulated.id}/history`)}
              className="px-4 py-2 border border-[#5B8AA0] text-[#5B8AA0] hover:bg-[#E9F4F8] rounded-xl text-xs font-bold transition shadow-sm"
            >
              View Visit History
            </button>
          </div>
        )}

        {/* Blood Type Selection */}
        <div className="mb-6">
          {hasPrepopulated ? (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-3xl"></span>
                <div>
                  <span className="block text-xs uppercase font-bold text-gray-400 tracking-wider">Blood Type & Rh Factor</span>
                  <strong className="text-gray-700 text-base">{bloodType} {rh}</strong>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-200/50 px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-500">
                <HiLockClosed className="w-3.5 h-3.5" /> Locked
              </div>
            </div>
          ) : (
            <>
              <p className="font-medium mb-2 text-center">
                Patient Blood Type: {bloodType} {rh}
              </p>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {bloodTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setBloodType(type)}
                    className={`py-3 rounded-xl border flex flex-col items-center transition
                      ${bloodType === type
                        ? "bg-[#749BB5] text-white border-[#749BB5]"
                        : "bg-[#E9F4F8] border-gray-300 hover:bg-[#dbe9ef]"
                      }`}
                  >
                    <span className="text-2xl"></span>
                    <p className="text-xs mt-1">{type}</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["Rh +", "Rh —"].map((factor) => (
                  <button
                    key={factor}
                    className={`py-2 rounded-xl transition ${rh === factor ? "bg-[#749BB5] text-white" : "bg-[#E9F4F8] border border-gray-300"
                      }`}
                    onClick={() => setRh(factor)}
                  >
                    {factor}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Patient Vitals Inputs */}
        <div className="space-y-4">
          <Input label="Full Name" name="name" value={patientData.name} onChange={handleInputChange} placeholder="John Doe" disabled={hasPrepopulated} icon={<HiLockClosed className="w-4 h-4" />} />
          <Input label="Allergies" name="allergies" value={patientData.allergies} onChange={handleInputChange} placeholder="Peanuts" />
          <Input label="Chronic conditions" name="chronicConditions" value={patientData.chronicConditions} onChange={handleInputChange} placeholder="Migraine" />

          <div className="grid grid-cols-2 gap-3">
            <Input label="Your Age" name="age" value={patientData.age} onChange={handleInputChange} placeholder="23" disabled={hasPrepopulated} icon={<HiLockClosed className="w-4 h-4" />} />
            <Input label="Your weight (kg)" name="weight" value={patientData.weight} onChange={handleInputChange} placeholder="85 kg" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Blood pressure (mmHg)" name="bpSystolic" value={patientData.bpSystolic} onChange={handleInputChange} placeholder="120" />
            <div>
              <label className="text-sm text-gray-700 font-medium">Diastolic</label>
              <input
                type="text"
                name="bpDiastolic"
                value={patientData.bpDiastolic}
                onChange={handleInputChange}
                placeholder="80"
                className="mt-1 w-full rounded-xl bg-white px-4 py-3 text-sm border border-gray-300 outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
          </div>
        </div>

        {/* AI X-Ray Upload Box */}
        <div className="mt-6 mb-2">
          <p className="font-medium mb-2">Upload Dental X-Ray for AI Analysis</p>

          <label className="cursor-pointer border-2 border-dashed border-gray-400 bg-white rounded-xl p-6 text-center block hover:bg-gray-50 transition">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
            />
            <p className="text-3xl mb-2">🦷</p>
            <p className="text-gray-700 font-medium">
              {uploadedFile ? uploadedFile.name : "Click to select scan"}
            </p>
          </label>

          <div className="flex gap-2 text-xs text-gray-600 mt-3 justify-center">
            {["PNG", "JPG", "PDF", "≤ 500 MB"].map((tag) => (
              <span key={tag} className="px-2 py-1 bg-white rounded-md border">{tag}</span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className={`w-full text-white py-3 rounded-full text-lg font-medium transition shadow-md
              ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5B8AA0] hover:bg-[#4e7c92]"}`}
          >
            {isUploading ? "AI Analyzing..." : "Run AI Diagnosis"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Input Component Wired up for State Tracking ---------- */
if (!window.InputComp) {
  window.InputComp = function Input({ label, name, value, onChange, placeholder, disabled, icon }) {
    return (
      <div>
        {label && <label className="text-sm text-gray-700 font-medium">{label}</label>}
        <div className="relative">
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`mt-1 w-full rounded-xl px-4 py-3 text-sm border outline-none transition
              ${disabled
                ? "bg-gray-100/80 border-gray-200 text-gray-500 cursor-not-allowed select-none"
                : "bg-white border-gray-300 focus:ring-2 focus:ring-[#5B8AA0]"
              }`}
          />
          {disabled && icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  };
}
const Input = window.InputComp;