import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PatientDashboard() {
  const location = useLocation();
  const [imagePreview, setImagePreview] = useState(null);
  
  // 1. Get the detection results and image file passed from the previous page
  const aiResults = location.state?.detectionResults || [];
  const imageFile = location.state?.imageFile;

  // 2. Create a temporary local URL for the uploaded X-ray file
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);

      // Clean up the memory when the user leaves this page
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const [patient] = useState({
    name: "John",
    age: 46,
    symptoms: "Tooth sensitivity, bleeding gums",
  });

  const [form, setForm] = useState({
    medication: "",
    dosage: "",
    instructions: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => alert("PDF generation goes here.");
  const saveToRecord = () => alert("Record saved.");

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10 mt-10 text-gray-800">
        Doctor Dashboard - Patient Result & Prescription
      </h1>

      <h2 className="text-xl font-semibold w-full max-w-4xl mb-3 text-gray-700">
        Patient Diagnosis
      </h2>

      {/* Patient Diagnosis Card */}
      <div className="bg-white w-full max-w-4xl px-6 py-8 rounded-lg shadow-md mb-12 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <p className="text-gray-700"><strong>Patient:</strong> {patient.name}</p>
            <p className="text-gray-700"><strong>Age:</strong> {patient.age}</p>
            <p className="text-gray-700"><strong>Symptoms:</strong> {patient.symptoms}</p>
            
            {/* DYNAMIC AI ANALYSIS SECTION */}
            <div className="mt-4 p-5 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
              <p className="font-bold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">🔍</span> AI Analysis Findings:
              </p>
              {aiResults.length > 0 ? (
                <ul className="list-disc ml-5 space-y-2">
                  {aiResults.map((res, index) => (
                    <li key={index} className="text-blue-900 font-medium">
                      <span className="capitalize">{res.disease}</span>: 
                      <span className="ml-1 text-blue-700">{res.confidence}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="italic text-gray-600">No dental diseases detected. Patient appears healthy.</p>
              )}
            </div>
          </div>

          {/* DYNAMIC X-RAY PREVIEW */}
          <div className="flex-1 flex flex-col items-center justify-center border-l border-gray-100 pl-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Analyzed X-Ray Scan
            </p>
            {imagePreview ? (
              <img 
                src={imagePreview}
                alt="Patient Dental X-ray"
                className="w-full max-w-sm h-72 object-cover rounded-xl shadow-lg border-4 border-white"
              />
            ) : (
              <div className="w-full h-72 bg-gray-100 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic">No image data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prescription Heading */}
      <h2 className="text-xl font-semibold w-full max-w-4xl mb-3 text-gray-700">
        Prescription And Treatment
      </h2>

      {/* Prescription Card */}
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md border border-gray-100 mb-10">
        <p className="mb-6 text-lg">
          <strong>Filling prescription for: </strong>
          <span className="text-blue-600 font-bold">{patient.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-600">Medication</label>
            <input
              type="text"
              name="medication"
              value={form.medication}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-600">Dosage</label>
            <input
              type="text"
              name="dosage"
              value={form.dosage}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>

        <label className="block mb-2 font-medium text-gray-600">Instructions</label>
        <input
          type="text"
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />

        <label className="block mb-2 font-medium text-gray-600">Doctor's Notes & Treatment Plan</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border border-gray-300 p-4 rounded-lg h-40 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
        />

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            onClick={generatePDF}
            className="flex-1 bg-[#5B8AA0] text-white py-3 rounded-xl font-semibold hover:bg-blue-800 shadow-md transition-all active:scale-95"
          >
            Generate Prescription PDF
          </button>

          <button
            onClick={saveToRecord}
            className="flex-1 bg-[#5B8AA0] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            Save To Patient Record
          </button>
        </div>
      </div>
    </div>
  );
}