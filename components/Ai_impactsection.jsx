import React from "react";

const AIImpactSection = () => {
  return (
    <section className="bg-[#dce7ea] py-20 px-6 md:px-16 text-center" id= "about">
      {/* Title & Description */}
      <div className="max-w-4xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          AI's Impact on Cavity Detection in Dentistry
        </h2>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          Explore the transformative impact of AI on cavity detection in
          dentistry through our innovative partners, Pearl AI and Toothlens.
          Pearl AI pioneers cavity detection through advanced radiograph
          analysis, allowing patients to upload their X-rays for evaluation by
          its second opinion AI. This sophisticated technology ensures a
          comprehensive assessment, providing valuable insights for informed
          oral health decisions.
        </p>
      </div>

      {/* Cards */}
      <div className="flex mt-10 grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        {/* <div className="bg-white rounded-xl shadow-md  py-[80px] hover:shadow-lg transition duration-300  flex flex-col items-center text-center border-t-4 border-sky-400">
          <div className="bg-sky-100 p-4 rounded-full mb-4">
            <img src="./img/Pic3.jpg" alt="Diagnostics" className="w-10 h-10" />
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
             <img src="./img/Pic3.jpg" alt="Diagnostics" className="w-10 h-10" />
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
            <img src="./img/Pic4.jpg" alt="Accelerating Dental Care" className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Accelerating Dental Care
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Witness a transformation in diagnosis with AI — ensuring faster,
            reliable results that enable timely treatment and enhance efficiency
            in dental practices.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md  py-[80px] hover:shadow-lg transition duration-300 flex flex-col items-center text-center border-t-4 border-green-400">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <img src="./img/Pic5.jpg" alt="Treatment Plan" className="w-10 h-10" />
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
