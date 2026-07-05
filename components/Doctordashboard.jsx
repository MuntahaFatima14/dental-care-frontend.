import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DoctorProfileWidget from "./DoctorProfileWidget";

const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const randomChars = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return timestamp + randomChars;
};

export default function PatientDashboard() {
  const location = useLocation();
  const { id } = useParams();
  
  const prescriptionRef = useRef();
  // Reference hook to target the actual displayed image DOM element for dynamic resizing calculations
  const displayImageRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [imageScale, setImageScale] = useState({ scaleX: 1, scaleY: 1 });

  const getInitialState = () => {
    if (location.state) {
      const stateObj = {
        patientInfo: location.state.patientInfo || {},
        detectionResults: location.state.detectionResults || [],
        imageFile: location.state.imageFile,
        visitId: location.state.visitId || generateObjectId()
      };
      
      // Store in sessionStorage to persist across refreshes
      sessionStorage.setItem("doctor_dashboard_state", JSON.stringify({
        patientInfo: stateObj.patientInfo,
        detectionResults: stateObj.detectionResults,
        visitId: stateObj.visitId
      }));
      
      return stateObj;
    }
    
    const cached = sessionStorage.getItem("doctor_dashboard_state");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return {
          patientInfo: parsed.patientInfo,
          detectionResults: parsed.detectionResults,
          visitId: parsed.visitId,
          imageFile: null
        };
      } catch (e) {
        console.error("Failed to parse cached dashboard state:", e);
      }
    }
    
    return {
      patientInfo: {
        id: "",
        name: "Anonymous Patient",
        age: "N/A",
        symptoms: "None provided"
      },
      detectionResults: [],
      imageFile: null,
      visitId: generateObjectId()
    };
  };

  const initialState = getInitialState();
  const visitId = initialState.visitId;

  const [patient, setPatient] = useState(initialState.patientInfo);
  const [form, setForm] = useState({ medication: "", dosage: "", instructions: "", notes: "" });

  const aiResults = initialState.detectionResults || [];
  const imageFile = initialState.imageFile;
  const annotatedImageFromServer = aiResults[0]?.annotated_image;

  // Retrieve authenticated doctor's name
  const storedDoctorName = localStorage.getItem("doctor_name") || "Jennie";
  const formattedDoctorName = storedDoctorName.toLowerCase().startsWith("dr.") 
    ? storedDoctorName 
    : `Dr. ${storedDoctorName.charAt(0).toUpperCase() + storedDoctorName.slice(1)}`;

  // --- DYNAMIC BOUNDING BOX WINDOW RESPONSIVENESS SCALING ENGINE ---
  // Calculates real-time ratios if your raw image is e.g. 2000px wide but rendered down to 400px wide on-screen
  const handleImageDimensionsCalculation = () => {
    const imgEl = displayImageRef.current;
    if (!imgEl) return;

    const renderedWidth = imgEl.clientWidth;
    const renderedHeight = imgEl.clientHeight;
    
    const naturalWidth = imgEl.naturalWidth;
    const naturalHeight = imgEl.naturalHeight;

    if (naturalWidth && naturalHeight) {
      setImageScale({
        scaleX: renderedWidth / naturalWidth,
        scaleY: renderedHeight / naturalHeight
      });
    }
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    setTimeout(async () => {
      const element = prescriptionRef.current;
      try {
        const canvas = await html2canvas(element, { 
          scale: 3, 
          useCORS: true, 
          backgroundColor: "#ffffff",
          logging: false
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const renderHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, renderHeight, undefined, 'FAST');
        pdf.save(`Medical_Report_${patient.name.replace(/\s+/g, '_')}.pdf`);
      } catch (err) {
        console.error("PDF structural export crash:", err);
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 120);
  };

  const saveToMongoDB = async () => {
    const compiledPayload = {
      _id: visitId,
      patient_id: patient.id || "1",
      patient_name: patient.name,
      age: patient.age,
      symptoms: patient.symptoms,
      ai_findings: aiResults,
      medication: form.medication,
      dosage: form.dosage,
      instructions: form.instructions,
      doctor_notes: form.notes,
      timestamp: new Date().toISOString()
    };

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const token = localStorage.getItem("doctor_token");
      const response = await fetch(`${apiBase}/api/save-assessment/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(compiledPayload)
      });
      if (response.ok) {
        alert("Success: Medical record successfully synced to your MongoDB Cloud Cluster!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.detail || "Server rejected document formatting properties.";
        alert(`Error: ${errorMessage}`);
      }
    } catch (err) {
      console.error("MongoDB Cloud Sync Failure:", err);
      alert("Network error.");
    }
  };

  useEffect(() => {
    const fetchPrescriptionAutomation = async () => {
      setLoading(true);
      if (aiResults.length > 0) {
        const topFinding = aiResults[0].disease; 
        try {
          const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
          const treatmentRes = await fetch(`${apiBase}/api/automate-prescription/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ disease: topFinding })
          });
          if (treatmentRes.ok) {
            const treatmentData = await treatmentRes.json();
            setForm(prev => ({
              ...prev,
              medication: treatmentData.medication || "",
              dosage: treatmentData.dosage || "",
              instructions: treatmentData.instructions || ""
            }));
          }
        } catch (err) {
          console.error("Prescription rule lookup failure:", err);
        }
      }
      setLoading(false);
    };
    fetchPrescriptionAutomation();
  }, [aiResults]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  // Recalculates bounding box overlays instantly if window screen resizing events take place
  useEffect(() => {
    window.addEventListener("resize", handleImageDimensionsCalculation);
    return () => window.removeEventListener("resize", handleImageDimensionsCalculation);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-gray-600">Loading and Automating Prescription...</div>;

  return (
    <div className={`min-h-screen w-full flex flex-col items-center transition-all ${isGeneratingPDF ? "bg-white p-0" : "bg-gray-100 p-6"}`}>
      
      {!isGeneratingPDF && (
        <div className="w-full max-w-4xl flex justify-end mb-4">
          <DoctorProfileWidget />
        </div>
      )}

      {!isGeneratingPDF && (
        <h1 className="text-3xl font-bold text-center mb-6 mt-6 text-gray-800 font-sans">
          Clinical Management Terminal
        </h1>
      )}

      {/* --- PRINTABLE CLASSICAL MEDICAL REQUISITION SHEET --- */}
      <div 
        ref={prescriptionRef} 
        className={`w-full max-w-4xl bg-white font-serif selection:bg-transparent transition-all duration-150
          ${isGeneratingPDF ? "p-16 shadow-none" : "p-10 rounded-xl shadow-xl border border-gray-200"}`}
      >
        
        {/* Institutional Medical Letterhead Header */}
        <div className="border-b-4 border-[#5B8AA0] pb-6 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-wide font-sans flex items-center gap-2">
              <span>🦷</span> DENTAL CARE DASHBOARD
            </h2>
            <p className="text-xs text-gray-500 font-sans uppercase tracking-widest mt-1">
              Advanced Radiographic Diagnostics & Digital Therapeutics
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 font-sans leading-relaxed">
            <p className="font-semibold text-gray-600">Report ID: #DC-{visitId}</p>
            <p>Date: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Unified Patient Profile Data Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-sm border border-gray-100">
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-0.5">Patient Name</span>
            <strong className="text-base text-gray-600">{patient.name}</strong>
          </div>
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-0.5">Age </span>
            <strong className="text-base text-gray-600">{patient.age} y/o</strong>
          </div>
          <div className="md:col-span-2 border-t border-gray-200/60 pt-3 mt-1">
            <span className="block text-xs uppercase font-bold tracking-wider text-gray-400 mb-0.5">Primary Diagnostics Intakes </span>
            <p className="text-gray-700 italic mt-0.5">"{patient.symptoms}"</p>
          </div>
        </div>

        {/* Split Layout Section: Computer Vision Findings vs Radiograph Output */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch mb-8">
          
          {/* Diagnostic Metrics Matrix */}
          <div className="flex-1 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold font-sans text-gray-400 uppercase tracking-wider border-b pb-1.5 mb-4">
                I. AI-Aided Analysis Observations
              </h3>
              <div className="p-5 rounded-xl bg-blue-50/40 border border-blue-100 shadow-sm">
                <p className="font-sans font-bold text-blue-900 mb-3 flex items-center gap-2">
                  AI Predictions:
                </p>
                <ul className="space-y-3 font-sans">
                  {aiResults.map((res, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-blue-50 pb-2 last:border-none last:pb-0">
                      <span className="capitalize font-semibold text-gray-800">{res.disease}</span>
                      <span className="bg-[#5B8AA0] text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-sm">
                        {res.confidence}
                      </span>
                    </li>
                  ))}
                  {aiResults.length === 0 && (
                    <li className="text-gray-500 italic">No localized dental pathologies targets resolved.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Radiograph Box — Fully Fixed Multi-Box Layer Architecture */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-100 min-h-[260px]">
            <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-3">
              Target Radiographic Scan Frame
            </span>
            
            {annotatedImageFromServer || imagePreview ? (
              /* This wrapper stays relative and inline-block so absolute boxes map to it */
              <div style={{ position: "relative", display: "inline-block", margin: "0 auto" }}>
                
                {/* 1. Base Image Layer: Placed outside the loop so it only renders ONCE */}
                <img 
                  ref={displayImageRef}
                  src={annotatedImageFromServer || imagePreview} 
                  onLoad={handleImageDimensionsCalculation}
                  style={{ 
                    display: "block", 
                    maxWidth: "100%", 
                    maxHeight: "220px", 
                    width: "auto", 
                    height: "auto", 
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                  alt="Patient Dental Requisition Scan"
                />

                {/* 2. Overlays Layer: The map loop ONLY builds the red border vectors now */}
                {!loading && aiResults.map((res, index) => {
                  if (!res.box || res.box.length !== 4) return null;

                  // Destructure scaled absolute coordinates [xmin, ymin, xmax, ymax]
                  const [xmin, ymin, xmax, ymax] = res.box;

                  // Apply layout responsive transformation scaling scalars
                  const boxLeft = xmin * imageScale.scaleX;
                  const boxTop = ymin * imageScale.scaleY;
                  const boxWidth = (xmax - xmin) * imageScale.scaleX;
                  const boxHeight = (ymax - ymin) * imageScale.scaleY;

                  return (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        left: `${boxLeft}px`,
                        top: `${boxTop}px`,
                        width: `${boxWidth}px`,
                        height: `${boxHeight}px`,
                        border: "3px solid #ff3b30", // YOLO Signature Red
                        borderRadius: "3px",
                        boxShadow: "0 0 4px rgba(0,0,0,0.5)",
                        pointerEvents: "none", // Keeps clicks working flawlessly
                        zIndex: 50 + index     // Increment layers so stacking order is maintained
                      }}
                    >
                      {/* Individual Box Label Badge */}
                      <span
                        style={{
                          position: "absolute",
                          top: "-20px",
                          left: "-3px",
                          backgroundColor: "#ff3b30",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          padding: "1px 5px",
                          borderRadius: "3px",
                          textTransform: "capitalize",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {res.disease} ({res.confidence})
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-400 italic text-sm font-sans">No clinical scan visual bound.</div>
            )}
          </div>
        </div>

        {/* Controlled Therapeutics & Treatment Directions */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold font-sans text-gray-400 uppercase tracking-wider border-b pb-1.5">
            II. Pharmaceutical Treatment Strategy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Prescribed Medication</label>
              {isGeneratingPDF ? (
                <div className="p-3 border-b-2 border-gray-100 font-medium text-gray-800">{form.medication || "None assigned."}</div>
              ) : (
                <input type="text" value={form.medication} readOnly className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 font-medium outline-none shadow-inner" />
              )}
            </div>
            <div>
              <label className="block mb-1 font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Target Clinical Dosage</label>
              {isGeneratingPDF ? (
                <div className="p-3 border-b-2 border-gray-100 font-medium text-gray-800">{form.dosage || "None assigned."}</div>
              ) : (
                <input type="text" value={form.dosage} readOnly className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 font-medium outline-none shadow-inner" />
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Administration Instructions</label>
            {isGeneratingPDF ? (
              <div className="p-3 border-b-2 border-gray-100 text-gray-700">{form.instructions || "None assigned."}</div>
            ) : (
              <input type="text" value={form.instructions} readOnly className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-700 outline-none shadow-inner" />
            )}
          </div>

          <div>
            <label className="block mb-1 font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Doctor's Narrative Clinical Remarks</label>
            {isGeneratingPDF ? (
              <div className="p-4 bg-gray-50/50 rounded-lg border text-gray-700 min-h-[110px] whitespace-pre-wrap leading-relaxed">
                {form.notes || "No extra medical case trajectory annotations specified by the attending physician."}
              </div>
            ) : (
              <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border border-gray-300 p-4 rounded-lg h-32 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none text-sm" placeholder="Add custom diagnostic remarks or follow-up timelines directly here..." />
            )}
          </div>
        </div>

        {/* Formal Attending Physician Endorsement Block */}
        <div className="mt-14 flex justify-end">
          <div className="text-center w-64 border-t border-gray-300 pt-2">
            <p className="font-serif text-lg italic text-[#5B8AA0] mb-1">{formattedDoctorName}</p>
            <p className="font-sans text-xs font-bold text-gray-700 uppercase tracking-widest">Digital Verification signature</p>
            <p className="font-sans text-[10px] text-gray-400 mt-0.5">Attending Dental Practitioner Node</p>
          </div>
        </div>

      </div>

      {/* --- ACTION CONTROL PANEL BUTTONS --- */}
      {!isGeneratingPDF && (
        <div className="flex gap-4 w-full max-w-4xl mt-8 mb-12">
          <button 
            onClick={generatePDF}
            className="flex-1 bg-white text-[#5B8AA0] border-2 border-[#5B8AA0] py-3 rounded-xl font-bold hover:bg-[#5B8AA0] hover:text-white transition-all shadow active:scale-[0.98]"
          >
            Print PDF
          </button>
          <button 
            onClick={saveToMongoDB}
            className="flex-1 bg-[#5B8AA0] text-white border-2 border-[#5B8AA0] py-3 rounded-xl font-bold hover:bg-[#4a7386] border-transparent transition-all shadow active:scale-[0.98]"
          >
            Save Record 
          </button>
        </div>
      )}
    </div>
  );
}