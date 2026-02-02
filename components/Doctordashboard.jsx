import React, { useState } from "react";

export default function PatientDashboard() {
  const [patient] = useState({
    name: "John",
    age: 46,
    symptoms: "Tooth sensitivity, bleeding gums",
    aiAnalysis: "High Probability of Cavities in lower right molar",
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

  const generatePDF = () => {
    alert("PDF generation goes here.");
  };

  const saveToRecord = () => {
    alert("Record saved.");
  };

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-10 mt-10">
        Doctor Dashboard - Patient Result & Prescription
      </h1>

      {/* ---- Patient Diagnosis Heading ---- */}
      <h2 className="text-xl font-semibold w-full max-w-4xl mb-3">
        Patient Diagnosis
      </h2>

      {/* ---- Patient Diagnosis Card ---- */}
      <div className="bg-white w-full max-w-4xl px-6 rounded-lg shadow-md mb-12">

        <div className="flex flex-col md:flex-row gap-6  items-center">
          <div className="flex-1 space-y-2">
            <p><strong>Patient:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Symptoms:</strong> {patient.symptoms}</p>
            <p><strong>AI Analysis:</strong> {patient.aiAnalysis}</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img 
              src="./img/chart.png"
              alt="chart"
              className="w-96 h-72 object-contain"
            />
          </div>
        </div>
      </div>

      {/* ---- Prescription Heading ---- */}
      <h2 className="text-xl font-semibold w-full max-w-4xl mb-3">
        Prescription And Treatment
      </h2>

      {/* ---- Prescription Card ---- */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-md">
        
        <p className="mb-4 text-lg">
          <strong>Filling prescription for: </strong>
          <span className="text-blue-600">{patient.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Medication</label>
            <input
              type="text"
              name="medication"
              value={form.medication}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Dosage</label>
            <input
              type="text"
              name="dosage"
              value={form.dosage}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <label className="block mb-1 font-medium">Instructions</label>
        <input
          type="text"
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-1 font-medium">Doctor's Notes & Treatment Plan</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border p-3 rounded h-40"
        />

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            onClick={generatePDF}
            className="flex-1 bg-[#5B8AA0] text-white py-2 rounded hover:bg-blue-800"
          >
            Generate Prescription PDF
          </button>

          <button
            onClick={saveToRecord}
            className="flex-1 bg-[#5B8AA0] text-white py-2 rounded hover:bg-blue-700"
          >
            Save To Patient Record
          </button>
        </div>
      </div>
    </div>
  );
}
