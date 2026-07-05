
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Body from "../components/Signin"
import DoctorSignIn from "../Pages/DoctorSignin"
import DoctorSignUp from "../Pages/DoctorSignUp";
import Homepage from "../Pages/Homepage";
import Servicepage from "../Pages/Servicespage";
import Doctorpage from "../Pages/Doctorpage";
import PatientSearchCreatePage from "../Pages/PatientSearchCreatePage";
import RegisterPatientPage from "../Pages/RegisterPatientPage";
import PatientHistoryPage from "../Pages/PatientHistoryPage";
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
             <Route path="/patients" element={<PatientSearchCreatePage />} />
             <Route path="/register-patient" element={<RegisterPatientPage />} />
             <Route path="/doctorpage" element={<Doctorpage />} />  
             <Route path="/doctordashboard" element={<Doctordashpage />} />  
             <Route path="/patients/:id/history" element={<PatientHistoryPage />} />

             




           
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