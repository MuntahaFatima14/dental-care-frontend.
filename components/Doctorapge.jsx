import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Doctorpage() {
  /* ---------------- STATE ---------------- */
  const [bloodType, setBloodType] = useState("B (III)");
  const [rh, setRh] = useState("Rh +");
  const [uploadedFile, setUploadedFile] = useState(null);
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

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = () => {
    alert(`
      SUBMITTED!

      Blood Type: ${bloodType}
      RH Factor: ${rh}
      Uploaded File: ${uploadedFile ? uploadedFile.name : "No File"}
    `);
    navigate("/doctordashboard");
  };

  return (
    <div className="bg-[#D4DFE4] min-h-screen flex justify-center py-12 px-4">
      <div className="max-w-xl w-full">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Patient Health Assessment
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-700 mb-6 leading-relaxed">
          Providing this data helps the doctor customize patient's treatment and
          ensure precise care.
        </p>

        {/* Blood Type */}
        <div className="mb-6">
          <p className="font-medium mb-2">
            Blood Type: {bloodType} {rh}
          </p>

          {/* Blood Type Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setBloodType(type)}
                className={`py-3 rounded-xl border flex flex-col items-center transition
                  ${
                    bloodType === type
                      ? "bg-[#749BB5] text-white border-[#749BB5]"
                      : "bg-[#E9F4F8] border-gray-300 hover:bg-[#dbe9ef]"
                  }
                `}
              >
                <span className="text-2xl">🩸</span>
                <p className="text-xs mt-1">{type}</p>
              </button>
            ))}
          </div>

          {/* Rh Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`py-2 rounded-xl transition
                ${
                  rh === "Rh +"
                    ? "bg-[#749BB5] text-white"
                    : "bg-[#E9F4F8] border border-gray-300"
                }
              `}
              onClick={() => setRh("Rh +")}
            >
              Rh +
            </button>

            <button
              className={`py-2 rounded-xl transition
                ${
                  rh === "Rh —"
                    ? "bg-[#749BB5] text-white"
                    : "bg-[#E9F4F8] border border-gray-300"
                }
              `}
              onClick={() => setRh("Rh —")}
            >
              Rh —
            </button>
          </div>
        </div>

        {/* User Input Fields */}
        <div className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Allergies" placeholder="Peanuts" />
          <Input label="Chronic conditions" placeholder="Migraine" />

          {/* Age + Weight */}
          <div className="grid grid-cols-2 gap-3">
            <Input label="Your Age" placeholder="23 y/o" />
            <Input label="Your weight (kg)" placeholder="85 kg" />
          </div>

          {/* Blood Pressure */}
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

        {/* Upload Box */}
        <div className="mt-6 mb-2">
          <p className="font-medium mb-2">Upload Files</p>

          <label className="cursor-pointer border-2 border-dashed border-gray-400 bg-white rounded-xl p-6 text-center block">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <p className="text-3xl">⬆️</p>
            <p className="mt-2 text-gray-700">
              {uploadedFile ? uploadedFile.name : "Click to upload"}
            </p>
          </label>

          <div className="flex gap-2 text-xs text-gray-600 mt-3">
            <span className="px-2 py-1 bg-white rounded-md border">PNG</span>
            <span className="px-2 py-1 bg-white rounded-md border">JPG</span>
            <span className="px-2 py-1 bg-white rounded-md border">PDF</span>
            <span className="px-2 py-1 bg-white rounded-md border">
              ≤ 500 MB
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#5B8AA0] text-black py-3 rounded-full text-lg font-medium hover:bg-[#4e7c92] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Input Component ---------- */
function Input({ label, placeholder }) {
  return (
    <div>
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl bg-white px-4 py-3 text-sm border border-gray-300 outline-none focus:ring-2 focus:ring-[#5B8AA0]"
      />
    </div>
  );
}
