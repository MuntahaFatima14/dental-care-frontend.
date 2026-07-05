import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiSearch,
  HiUserAdd,
  HiPhone,
  HiMail,
  HiArrowRight
} from "react-icons/hi";
import DoctorProfileWidget from "./DoctorProfileWidget";

// Initial seed data for fallback
const SEED_PATIENTS = [
  {
    id: "p1",
    name: "John Doe",
    age: "34",
    gender: "Male",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    bloodType: "B (III)",
    rh: "Rh +",
    allergies: "Peanuts, Dust",
    chronicConditions: "None",
    weight: "78",
    bpSystolic: "120",
    bpDiastolic: "80"
  },
  {
    id: "p2",
    name: "Jane Smith",
    age: "28",
    gender: "Female",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
    bloodType: "O (I)",
    rh: "Rh —",
    allergies: "Penicillin",
    chronicConditions: "Asthma",
    weight: "62",
    bpSystolic: "115",
    bpDiastolic: "75"
  },
  {
    id: "p3",
    name: "Robert Johnson",
    age: "52",
    gender: "Male",
    phone: "555-019-2834",
    email: "robert.j@example.com",
    bloodType: "A (II)",
    rh: "Rh +",
    allergies: "Sulfa Drugs",
    chronicConditions: "Diabetes (Type II)",
    weight: "90",
    bpSystolic: "135",
    bpDiastolic: "85"
  }
];

export default function PatientSearchCreate({ onSelectPatient }) {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Patients
  const loadPatients = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("doctor_token");

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${apiBase}/api/patients/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        throw new Error("Backend responded with error code: " + response.status);
      }
    } catch (error) {
      console.warn("Django API unavailable. Falling back to local storage.", error);

      const localData = localStorage.getItem("dental_patients");
      if (localData) {
        setPatients(JSON.parse(localData));
      } else {
        localStorage.setItem("dental_patients", JSON.stringify(SEED_PATIENTS));
        setPatients(SEED_PATIENTS);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = patients.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      p.phone?.includes(term) ||
      p.email?.toLowerCase().includes(term)
    );
  });

  const handleSelectPatientInternal = (patient) => {
    if (onSelectPatient) {
      onSelectPatient(patient);
    } else {
      // Redirect directly to DoctorPage pre-populating fields
      navigate("/doctorpage", {
        state: {
          id: patient.id || patient._id || "",
          name: patient.name,
          age: patient.age,
          allergies: patient.allergies,
          chronicConditions: patient.chronicConditions,
          weight: patient.weight,
          bpSystolic: patient.bpSystolic,
          bpDiastolic: patient.bpDiastolic,
          bloodType: patient.bloodType,
          rh: patient.rh
        }
      });
    }
  };

  return (
    <div className="font-Inter max-w-4xl mx-auto px-4 md:px-0 mb-12 md:mb-16">
      {/* Top Profile Header Section with clean bottom margin */}
      <div className="flex justify-end mb-6">
        <DoctorProfileWidget />
      </div>

      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#5B8AA0] to-[#749BB5] text-white p-8 rounded-3xl shadow-lg mb-10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Patient Directory</h1>
          <p className="text-blue-50 text-sm md:text-base opacity-90 leading-relaxed">
            Search for registered clinic patients or register a new record.
          </p>
        </div>
      </div>

      {/* Main Listing Panel */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
        {/* Actions Bar with added spacing gap */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8">

          {/* Search Bar */}
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
              <HiSearch className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#E9F4F8] border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0] text-gray-700 placeholder-gray-400 font-medium transition"
            />
          </div>

          {/* Navigate to Register Page */}
          <button
            onClick={() => navigate("/register-patient")}
            className="flex items-center justify-center gap-2 bg-[#5B8AA0] text-white px-6 py-3 rounded-xl hover:bg-[#4e7c92] transition text-sm font-semibold shadow whitespace-nowrap"
          >
            <HiUserAdd className="w-4 h-4" /> Register Patient
          </button>
        </div>

        {/* Patient Listing View */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Registered Patients ({filteredPatients.length})
            </h2>
            {isLoading && <span className="text-xs text-gray-400 animate-pulse">Syncing...</span>}
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-lg mb-2">No patients found</p>
              <p className="text-xs text-gray-400 px-6">
                No matches were found. Double check your query or create a new profile for this patient.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="group relative bg-white border border-gray-150 rounded-2xl p-5 hover:border-[#749BB5] hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8"
                >
                  {/* Left Side: Avatar & Name details */}
                  <div className="flex items-center gap-4 flex-grow">
                    <div className="w-12 h-12 rounded-xl bg-[#E9F4F8] text-[#5B8AA0] font-bold text-lg flex items-center justify-center shadow-inner select-none flex-shrink-0">
                      {patient.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-gray-800 text-base group-hover:text-[#5B8AA0] transition">
                        {patient.name}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{patient.gender || "N/A"}, {patient.age} Yrs</span>
                        <span className="text-gray-300">|</span>
                        <span className="bg-[#E9F4F8] px-2 py-0.5 rounded text-[10px] text-[#5B8AA0] font-bold inline-flex items-center gap-1">
                          <span>🩸</span> {patient.bloodType || "N/A"} {patient.rh || ""}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Contact Details */}
                  <div className="flex flex-col gap-1.5 text-xs text-gray-600 min-w-[180px]">
                    <span className="flex items-center gap-2">
                      <HiPhone className="text-gray-400 w-4 h-4 flex-shrink-0" />
                      {patient.phone || "No phone record"}
                    </span>
                    <span className="flex items-center gap-2">
                      <HiMail className="text-gray-400 w-4 h-4 flex-shrink-0" />
                      {patient.email || "No email record"}
                    </span>
                  </div>

                  {/* Right Column: Action Buttons */}
                  <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
                    <button
                      onClick={() => navigate(`/patients/${patient.id}/history`)}
                      className="flex items-center justify-center gap-1.5 bg-white border border-[#5B8AA0] text-[#5B8AA0] hover:bg-[#E9F4F8] text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
                    >
                      History
                    </button>
                    <button
                      onClick={() => handleSelectPatientInternal(patient)}
                      className="flex items-center justify-center gap-1.5 bg-[#E9F4F8] hover:bg-[#5B8AA0] hover:text-white text-[#5B8AA0] text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
                    >
                      Visit <HiArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}