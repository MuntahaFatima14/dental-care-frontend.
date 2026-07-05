import React from "react";

const AIImpactSection = () => {
  return (
    <section className="bg-[#dce7ea] py-20 px-6 md:px-16 text-center" id="about">
      {/* Title & Description */}
      <div className="max-w-4xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          AI's Impact on Disease Detection in Dentistry
        </h2>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          Explore the transformative impact of AI-driven disease detection through our innovative partners. Advanced AI technologies analyze medical imaging and diagnostic data to assist in identifying multiple diseases with greater speed and accuracy. Patients can securely upload their reports, scans, or medical images for AI-assisted evaluation and receive intelligent insights as a supportive second opinion. This sophisticated approach enables comprehensive assessments, empowering healthcare providers and patients with valuable information for better-informed health decisions and improved care outcomes.

        </p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        {/* <div className="bg-white rounded-xl shadow-md  py-[80px] hover:shadow-lg transition duration-300  flex flex-col items-center text-center border-t-4 border-sky-400">
          <div className="bg-sky-100 p-4 rounded-full mb-4">
            <img src="/img/Pic3.jpg" alt="Diagnostics" className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Efficient Diagnostics
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            AI transforms cavity detection, identifying dental issues early with
            precision. Analyzing images, it detects subtle changes in tooth
            structure before they’re visible through traditional methods.
          </p>
        </div> */}
        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md  py-[80px] hover:shadow-lg transition duration-300 flex flex-col items-center text-center border-t-4 border-sky-400">
          <div className="bg-sky-100 p-4 rounded-full mb-4">
            <img src="/img/Pic3.jpg" alt="Diagnostics" className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Efficient Diagnostics
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            AI transforms cavity detection, identifying dental <br></br> issues early
            with precision. Analyzing images, it detects subtle changes in
            tooth structure before they’re visible through traditional
            methods.
          </p>
        </div>


        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md  py-[80px] hover:shadow-lg transition duration-300 flex flex-col items-center text-center border-t-4 border-orange-400">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <img src="/img/Pic4.jpg" alt="Accelerating Dental Care" className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Accelerating Dental Care
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Witness a transformation in diagnosis with AI ensuring faster,
            reliable results that enable timely treatment and enhance efficiency
            in dental practices.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md  py-[80px] hover:shadow-lg transition duration-300 flex flex-col items-center text-center border-t-4 border-green-400">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <img src="/img/Pic5.jpg" alt="Treatment Plan" className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Personalized Treatment Plan
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Creating AI-based personalized plans empowers dentists to develop
            patient-centered care strategies, optimizing oral health outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIImpactSection;
