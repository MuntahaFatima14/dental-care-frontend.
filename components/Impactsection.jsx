import React from 'react';

function Impactsection() {
  return (
    <div className=''>
       <div className="flex flex-col md:flex-row mb-20 justify-center  gap-8  mt-10 mx-14 rounded-3xl bg-white p-5 shadow-2xl">
        <div className="w-full md:w-1/2">
          <img
            src="./img/Pic2.jpg"
            alt=""
            className="shadow-2xl w-full h-auto rounded-md"
          />
        </div>

        <div className="w-full md:w-1/2 px-0 md:px-5 ">
          <h2 className="font-bold lg:text-4xl md:text-2xl lg:mb-6 text-center md:text-left">
            Cavity-Free Living with AI Cavity Detection
          </h2>
          <p className="text-gray-700 text-sm md:text-base text-center md:text-left leading-relaxed">
            Welcome to AI Cavity Detection, your premier destination for
            cutting-edge AI dentistry and automated cavity detection. Our
            mission is to redefine oral health wisely by harnessing artificial
            intelligence. With a focus on precision and personalized care, we
            offer state-of-the-art solutions for proactive cavity detection.
            <br />
            <br />
            Our innovative technology empowers dentists with faster and more
            accurate diagnoses, ensuring early detection of dental issues before
            they progress. By integrating AI-driven insights with expert dental
            care, we make treatments more efficient, affordable, and
            patient-friendly. Experience the perfect blend of technology and
            compassion where every smile begins with smarter dental care.
            <br />
            <br />
            Step into the future of dental wellness with us, where advanced
            technology is seamlessly integrated with our commitment to optimal
            oral wellness. Trust our expertise for a confident smile and a
            future of cavity-free health.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Impactsection;
