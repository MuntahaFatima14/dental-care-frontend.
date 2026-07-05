import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PatientHistory from "../components/PatientHistory";

export default function PatientHistoryPage() {
  return (
    <div className="bg-grayish pt-7">
      <Header />
      <PatientHistory />
      <Footer />
    </div>
  );
}
