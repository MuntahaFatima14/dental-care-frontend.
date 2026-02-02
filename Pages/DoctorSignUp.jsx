import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Signupbody from '../components/Signupbody';

function DoctorSignUp() {
  return (
    <div className="bg-grayish pt-7">
    <Header />
     <Signupbody/>
     <Footer/>
    </div>
  );
}

export default DoctorSignUp;
