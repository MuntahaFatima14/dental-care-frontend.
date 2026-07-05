import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterPatient from "../components/RegisterPatient";

export default function RegisterPatientPage() {
  return (
    <div className="bg-grayish pt-7">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <RegisterPatient />
      </main>

      <Footer />
    </div>
  );
}
