
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Body from "../components/Signin"
import DoctorSignIn from "../Pages/DoctorSignin"
import DoctorSignUp from "../Pages/DoctorSignUp";
import Homepage from "../Pages/homepage";
import Servicepage from "../Pages/Servicespage";
import Doctorpage from "../Pages/Doctorpage";
import './App.css'
import Doctordashpage from "../Pages/Doctordashpage";


function App() {
  return (
    
    <Router>
      <Routes>
     
            <Route path="/" element={<DoctorSignIn />} />  
            <Route path="/signup" element={<DoctorSignUp />} /> 
             <Route path="/homepage" element={<Homepage />} />  
             <Route path="/servicepage" element={<Servicepage />} />  
             <Route path="/doctorpage" element={<Doctorpage />} />  
             <Route path="/doctordashboard" element={<Doctordashpage />} />  

             




           
          </Routes>
    </Router>
    // <div className="bg-grayish pt-7">
    
    
    //   <Header />
    //  <Body/>
    //  <Footer/>
     

   
    
    // </div>

    
        // <div className="min-h-screen flex flex-col bg-[#eaf2f2]">
        //   <Header />
       
        //   <Footer />
        // </div>

  )
}
export default App