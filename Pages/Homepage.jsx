import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/Herosection';
import Impactsection from '../components/Impactsection';
import AIImpactSection from '../components/Ai_impactsection';
import Ai_advantagessection from '../components/Ai_advantagessection';
import Contactform from '../components/Contactform';

function Homepage() {
  return (
     <div className="bg-grayish pt-7">
       <Header />
       <HeroSection />
       <Impactsection />
       <AIImpactSection />
       <Ai_advantagessection />
       <Contactform />
       
     <Footer/>
    </div>
  );
}

export default Homepage;
