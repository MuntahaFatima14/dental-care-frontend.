import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';
import ServiceHelp from '../components/Servicehelp';


function Servicepage() {
  return (
     <div className="bg-grayish pt-7">
        <Header />
        <Services />
        <ServiceHelp />
 
        
      <Footer/>
     </div>
  );
}

export default Servicepage;
