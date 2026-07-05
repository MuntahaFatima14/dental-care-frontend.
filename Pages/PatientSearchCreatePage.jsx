import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PatientSearchCreate from "../components/PatientSearchCreate";

export default function PatientSearchCreatePage() {
  return (
    <div className="bg-grayish pt-7">
      <Header />
      <PatientSearchCreate />

      <Footer />
    </div>
  );
}
