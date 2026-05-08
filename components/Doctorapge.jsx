import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Doctorpage() {
  /* ---------------- STATE ---------------- */
  const [bloodType, setBloodType] = useState("B (III)");
  const [rh, setRh] = useState("Rh +");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const bloodTypes = ["O (I)", "A (II)", "B (III)", "AB (IV)"];

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

  /* ---------------- SUBMIT HANDLER WITH AI INTEGRATION ---------------- */
  const handleSubmit = async () => {
    if (!uploadedFile) {
      alert("Please upload an X-ray image first!");
      return;
    }

    setIsUploading(true);

    // Prepare the data for Django
    const formData = new FormData();
    formData.append('image', uploadedFile); 

    try {
      // API call to your Django server
      const response = await fetch('http://127.0.0.1:8000/api/detect/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Backend connection failed");

      const data = await response.json();
      
      // Pass results and the raw file object to the dashboard
      navigate("/doctordashboard", { 
        state: { 
          detectionResults: data.results, 
          imageFile: uploadedFile 
        } 
      });
      
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the AI server. Is the Django server running?");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#D4DFE4] min-h-screen flex justify-center py-12 px-4">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Patient Health Assessment
        </h1>

        <p className="text-sm text-gray-700 mb-6 leading-relaxed text-center">
          Providing this data helps the doctor customize treatment and ensure precise care.
        </p>

        {/* Blood Type Selection */}
        <div className="mb-6">
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
                <span className="text-2xl">🩸</span>
                <p className="text-xs mt-1">{type}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Rh +", "Rh —"].map((factor) => (
              <button
                key={factor}
                className={`py-2 rounded-xl transition ${
                  rh === factor ? "bg-[#749BB5] text-white" : "bg-[#E9F4F8] border border-gray-300"
                }`}
                onClick={() => setRh(factor)}
              >
                {factor}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Vitals Fields */}
        <div className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Allergies" placeholder="Peanuts" />
          <Input label="Chronic conditions" placeholder="Migraine" />

          <div className="grid grid-cols-2 gap-3">
            <Input label="Your Age" placeholder="23 y/o" />
            <Input label="Your weight (kg)" placeholder="85 kg" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Blood pressure (mmHg)" placeholder="120" />
            <div>
              <label className="text-sm text-transparent">.</label>
              <input
                type="text"
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

/* ---------- Reusable Input Component ---------- */
function Input({ label, placeholder }) {
  return (
    <div>
      {label && <label className="text-sm text-gray-700 font-medium">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl bg-white px-4 py-3 text-sm border border-gray-300 outline-none focus:ring-2 focus:ring-[#5B8AA0]"
      />
    </div>
  );
}

