import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiUserAdd,
  HiPlus,
  HiArrowLeft,
  HiCheckCircle,
  HiShieldCheck
} from "react-icons/hi";
import DoctorProfileWidget from "./DoctorProfileWidget";

export default function RegisterPatient() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    bloodType: "O (I)",
    rh: "Rh +",
    allergies: "",
    chronicConditions: "",
    weight: "",
    bpSystolic: "",
    bpDiastolic: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreatePatientSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Please fill in the patient's name.");

    setIsLoading(true);
    const token = localStorage.getItem("doctor_token");
    const newPatientPayload = {
      ...formData,
      id: "p_" + Date.now()
    };

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${apiBase}/api/patients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newPatientPayload)
      });

      if (response.ok) {
        const savedPatient = await response.json();
        alert("Patient added successfully to database!");
        setRegisteredPatient(savedPatient);
      } else {
        throw new Error("Backend response failed: " + response.status);
      }
    } catch (err) {
      console.warn("Cannot connect to Django backend. Saving patient locally.", err);

      // Save locally to dental_patients array in localStorage
      const localData = localStorage.getItem("dental_patients") || "[]";
      let localPatients = [];
      try {
        localPatients = JSON.parse(localData);
      } catch (e) {
        localPatients = [];
      }
      const updatedPatients = [newPatientPayload, ...localPatients];
      localStorage.setItem("dental_patients", JSON.stringify(updatedPatients));

      setRegisteredPatient(newPatientPayload);
      alert("Patient created successfully (Offline Sync active)!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToDoctorPage = () => {
    if (!registeredPatient) return;

    // Redirect directly to DoctorPage pre-populating fields
    navigate("/doctorpage", {
      state: {
        id: registeredPatient.id || registeredPatient._id || "",
        name: registeredPatient.name,
        age: registeredPatient.age,
        allergies: registeredPatient.allergies,
        chronicConditions: registeredPatient.chronicConditions,
        weight: registeredPatient.weight,
        bpSystolic: registeredPatient.bpSystolic,
        bpDiastolic: registeredPatient.bpDiastolic,
        bloodType: registeredPatient.bloodType,
        rh: registeredPatient.rh
      }
    });
  };

  // SUCCESS STATE VIEW
  if (registeredPatient) {
    return (
      <div className="mb-12 md:mb-16">
        <div className="max-w-2xl mx-auto flex justify-end mb-4">
          <DoctorProfileWidget />
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-4xl">
            <HiCheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Patient Registered Successfully!</h2>
          <p className="text-sm text-gray-500 mb-6">
            The electronic health record for <strong>{registeredPatient.name}</strong> has been logged.
          </p>

          {/* Short Summary Card */}
          <div className="bg-[#E9F4F8] rounded-2xl p-5 mb-8 text-left border border-[#cbe1ea] grid grid-cols-2 gap-4 text-xs text-gray-700">
            <div>
              <span className="text-gray-400 block mb-0.5">Full Name:</span>
              <span className="font-bold text-gray-800">{registeredPatient.name}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Age & Gender:</span>
              <span className="font-bold text-gray-800">{registeredPatient.age || "N/A"} Yrs, {registeredPatient.gender}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Blood Type:</span>
              <span className="font-bold text-red-600">🩸 {registeredPatient.bloodType} {registeredPatient.rh}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Blood Pressure:</span>
              <span className="font-bold text-gray-800">{registeredPatient.bpSystolic || "120"}/{registeredPatient.bpDiastolic || "80"} mmHg</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/patients")}
              className="flex-1 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              <HiArrowLeft className="w-4 h-4" /> Go to Directory
            </button>
            <button
              onClick={handleProceedToDoctorPage}
              className="flex-1 px-6 py-3.5 bg-[#5B8AA0] hover:bg-[#4e7c92] text-white rounded-xl text-sm font-semibold transition shadow flex items-center justify-center gap-2"
            >
              Start Diagnosis Visit <HiShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // REGISTRATION FORM VIEW
  return (
    <div className="max-w-4xl mx-auto mb-12 md:mb-16">
      <div className="flex justify-end mb-4">
        <DoctorProfileWidget />
      </div>
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#5B8AA0] to-[#749BB5] text-white p-8 rounded-3xl shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none"></div>
        <div className="relative z-10 max-w-2xl flex items-center gap-4">
          <button
            onClick={() => navigate("/patients")}
            className="p-2.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition text-white"
            title="Back to Directory"
          >
            <HiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">New Patient Registration</h1>
            <p className="text-blue-50 text-xs md:text-sm opacity-90 mt-1">
              Complete the fields below to create a new health profile and proceed directly to diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
          <HiUserAdd className="text-[#5B8AA0]" /> Demographic & Medical Records
        </h2>

        <form onSubmit={handleCreatePatientSubmit} className="space-y-6">

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Johnathan Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Age</label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g. 35"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Gender</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. 555-123-4567"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. name@example.com"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
          </div>

          {/* Blood properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#E9F4F8] p-4 rounded-2xl">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Blood Type</label>
              <select
                id="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              >
                <option value="O (I)">O (I)</option>
                <option value="A (II)">A (II)</option>
                <option value="B (III)">B (III)</option>
                <option value="AB (IV)">AB (IV)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Rh Factor</label>
              <div className="flex gap-4 mt-1.5">
                {["Rh +", "Rh —"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rh: f }))}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${formData.rh === f
                        ? "bg-[#5B8AA0] text-white border-transparent shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Allergies & Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Allergies</label>
              <input
                type="text"
                id="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="e.g. Penicillin, Lactose (or None)"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Chronic Conditions</label>
              <input
                type="text"
                id="chronicConditions"
                value={formData.chronicConditions}
                onChange={handleInputChange}
                placeholder="e.g. Asthma, Hypertension (or None)"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
          </div>

          {/* Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="kg"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">BP Systolic</label>
              <input
                type="number"
                id="bpSystolic"
                value={formData.bpSystolic}
                onChange={handleInputChange}
                placeholder="mmHg"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">BP Diastolic</label>
              <input
                type="number"
                id="bpDiastolic"
                value={formData.bpDiastolic}
                onChange={handleInputChange}
                placeholder="mmHg"
                className="w-full px-4 py-3 bg-gray-55 border border-gray-255 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8AA0]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5B8AA0] hover:bg-[#4e7c92] text-white py-3.5 rounded-xl text-sm font-semibold transition shadow-md flex items-center justify-center gap-2"
          >
            <HiPlus className="w-5 h-5" />
            {isLoading ? "Adding Record..." : "Register Patient Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
