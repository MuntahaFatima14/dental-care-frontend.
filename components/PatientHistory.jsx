import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

// Modular Reusable Components
import PatientProfileCard from "./PatientHistory/PatientProfileCard";
import HistoryTimeline from "./PatientHistory/HistoryTimeline";
import { 
  HistoryLoadingState, 
  HistoryErrorState, 
  HistoryEmptyState 
} from "./PatientHistory/HistoryStates";

export default function PatientHistory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authenticate and load patient data + visit logs on mount
  useEffect(() => {
    const loadPatientAndHistory = async () => {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("doctor_token");
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

      if (!token) {
        navigate("/");
        return;
      }

      try {
        // 1. Fetch Patient Info
        const patientRes = await fetch(`${apiBase}/api/patients/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!patientRes.ok) {
          if (patientRes.status === 401) {
            navigate("/");
            return;
          }
          throw new Error("Patient profile record could not be found.");
        }
        const patientData = await patientRes.json();
        setPatient(patientData);

        // 2. Fetch Consultation Visit Records
        const historyRes = await fetch(`${apiBase}/api/patients/${id}/history/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setHistory(historyData);
        }
      } catch (err) {
        console.error("History Component Sync Error:", err);
        setError(err.message || "Failed to load medical records.");
      } finally {
        setLoading(false);
      }
    };

    loadPatientAndHistory();
  }, [id, navigate]);

  const handleStartNewConsultation = () => {
    if (!patient) return;
    navigate("/doctorpage", { 
      state: { 
        id: patient.id,
        name: patient.name,
        age: String(patient.age),
        allergies: patient.allergies,
        chronicConditions: patient.chronicConditions,
        weight: patient.weight,
        bpSystolic: patient.bpSystolic,
        bpDiastolic: patient.bpDiastolic,
        bloodType: patient.bloodType,
        rh: patient.rh
      } 
    });
  };

  const handleRetry = () => {
    navigate("/patients");
  };

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 mb-12 md:mb-16 min-h-[60vh]">
      
      {/* Back Link */}
      <button
        onClick={() => navigate("/patients")}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold mb-6 group transition"
      >
        <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Patient Directory
      </button>

      {loading ? (
        <HistoryLoadingState />
      ) : error ? (
        <HistoryErrorState error={error} onRetry={handleRetry} />
      ) : history.length === 0 ? (
        <div className="space-y-8">
          <PatientProfileCard patient={patient} />
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <HistoryEmptyState onStartNewConsultation={handleStartNewConsultation} />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <PatientProfileCard patient={patient} />
          <HistoryTimeline 
            history={history} 
            onStartNewConsultation={handleStartNewConsultation} 
          />
        </div>
      )}
    </main>
  );
}
