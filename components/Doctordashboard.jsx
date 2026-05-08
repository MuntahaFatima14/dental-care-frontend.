import React, { useState, useEffect, useRef } from "react"; // 1. Added useRef
import { useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf"; // 2. Import jsPDF
import html2canvas from "html2canvas"; // 3. Import html2canvas

export default function PatientDashboard() {
  const location = useLocation();
  const { id } = useParams();
  
  // Create a Reference for the Prescription Card
  const prescriptionRef = useRef(); // 4. Create ref

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [patient, setPatient] = useState({ name: "", age: "", symptoms: "" });
  const [form, setForm] = useState({ medication: "", dosage: "", instructions: "", notes: "" });

  const aiResults = location.state?.detectionResults || [];
  const imageFile = location.state?.imageFile;

  // --- PDF GENERATION LOGIC ---
  const generatePDF = async () => {
    const element = prescriptionRef.current;
    
    // Convert HTML to Canvas
    const canvas = await html2canvas(element, { 
      scale: 2, // Better quality
      useCORS: true // Allow cross-origin images
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    // Initialize PDF (A4 format)
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Add Image to PDF and Download
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save(`Prescription_${patient.name || "Patient"}.pdf`);
  };
  // ----------------------------

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const patientRes = await fetch(`http://127.0.0.1:8000/api/patients/${id || 1}/`);
        const patientData = await patientRes.json();
        setPatient({
          name: patientData.name,
          age: patientData.age,
          symptoms: patientData.symptoms,
        });

        if (aiResults.length > 0) {
          const topFinding = aiResults[0].disease;
          const treatmentRes = await fetch(`http://127.0.0.1:8000/api/treatment/?name=${topFinding}`);
          const treatmentData = await treatmentRes.json();
          
          setForm(prev => ({
            ...prev,
            medication: treatmentData.medication,
            dosage: treatmentData.dosage,
            instructions: treatmentData.instructions,
          }));
        }
      } catch (err) {
        console.error("Data fetching error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, aiResults]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="flex h-screen items-center justify-center font-bold">Loading Patient Data...</div>;

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10 mt-10 text-gray-800">
        Doctor Dashboard
      </h1>

      {/* Top Card: Patient Diagnosis */}
      <div className="bg-white w-full max-w-4xl px-6 py-8 rounded-lg shadow-md mb-12 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Patient Profile</h2>
            <p className="text-gray-700"><strong>Name:</strong> {patient.name}</p>
            <p className="text-gray-700"><strong>Age:</strong> {patient.age}</p>
            <p className="text-gray-700"><strong>Symptoms:</strong> {patient.symptoms}</p>
            
            <div className="mt-4 p-5 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
              <p className="font-bold text-blue-800 mb-3 flex items-center">🔍 AI Findings:</p>
              <ul className="list-disc ml-5 space-y-2">
                {aiResults.map((res, index) => (
                  <li key={index} className="text-blue-900 font-medium">
                    <span className="capitalize">{res.disease}</span>: {res.confidence}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center border-l border-gray-100 pl-4">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Analyzed X-Ray</p>
            {imagePreview ? (
              <img src={imagePreview} className="w-full max-w-sm h-64 object-cover rounded-xl shadow-lg border-4 border-white" />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400">No Image</div>
            )}
          </div>
        </div>
      </div>

      {/* --- PRESCRIPTION CARD (This is what will be in the PDF) --- */}
      <div 
        ref={prescriptionRef} // 5. Attached Ref here
        className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md border border-gray-100 mb-10"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Prescription And Treatment</h2>
        <p className="mb-4 text-sm text-gray-500 italic border-b pb-2">Generated for: {patient.name} | Date: {new Date().toLocaleDateString()}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-600">Medication</label>
            <input type="text" value={form.medication} readOnly className="w-full border bg-gray-50 p-3 rounded-lg text-gray-600 outline-none" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-600">Dosage</label>
            <input type="text" value={form.dosage} readOnly className="w-full border bg-gray-50 p-3 rounded-lg text-gray-600 outline-none" />
          </div>
        </div>

        <label className="block mb-2 font-medium text-gray-600">Instructions</label>
        <input type="text" value={form.instructions} readOnly className="w-full border bg-gray-50 p-3 rounded-lg mb-6 text-gray-600 outline-none" />

        <label className="block mb-2 font-medium text-gray-600">Doctor's Clinical Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border border-gray-300 p-4 rounded-lg h-40 focus:ring-2 focus:ring-blue-200 outline-none resize-none" />
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex gap-4 w-full max-w-4xl">
        <button 
          onClick={generatePDF} // 6. Trigger PDF generation
          className="flex-1 bg-[#5B8AA0] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95"
        >
          Generate Prescription PDF
        </button>
        <button className="flex-1 bg-[#5B8AA0] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95">
          Save Record
        </button>
      </div>
    </div>
  );
}