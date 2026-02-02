import React from "react";

const AIAdvantagesSection = () => {
  return (
    <section className="bg-[#dce7ea] py-16 px-6 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          Advantages of AI-Enhanced Cavity Detection
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Experience the cutting-edge advancements in care through our AI
          technology for detecting cavities. Our innovative solution enables
          proactive health management ensuring early identification of issues
          and prompt intervention.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
          <div>
            <h4 className="font-semibold text-lg mb-2 text-gray-900">Early Detection</h4>
            <p className="text-gray-600 text-sm">
              AI Cavity Detection identifies issues at early stages, enabling
              timely intervention before visible symptoms appear.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-gray-900">Oral Health Monitoring</h4>
            <p className="text-gray-600 text-sm">
              Beyond cavities, AI assists in detecting enamel erosion and early
              signs of gum disease.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-gray-900">Non-Invasive Procedures</h4>
            <p className="text-gray-600 text-sm">
              AI-based analysis enhances patient comfort by reducing the need
              for invasive diagnostic procedures.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-gray-900">
              Versatility for All Age Groups
            </h4>
            <p className="text-gray-600 text-sm">
              AI Cavity Detection is suitable for children, adults, and seniors
              — ensuring accurate and efficient diagnostics for everyone.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-center flex-1">
          <img
            src="./img/Pic6.jpg"
            alt="AI oral scan demo"
            className="rounded-full shadow-lg w-72 h-72 object-cover border-4 border-gray-500"
          />
        </div>
      </div>
    </section>
  );
};

export default AIAdvantagesSection;
