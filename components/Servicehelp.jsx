import React from "react";


export default function ServiceHelp() {
  return (
    <section className="bg-[#dce7e9] py-20 px-4 flex justify-center">
      <div
        className="
          bg-white max-w-4xl w-full
          rounded-3xl
          flex flex-col md:flex-row justify-between items-center
          p-6 md:p-10
          shadow-[0_4px_20px_rgba(0,0,0,0.08)]
          gap-8 md:gap-12
        "
      >
        {/* Image Container */}
        <div className="flex justify-center md:justify-start w-full md:w-auto flex-shrink-0">
            <img
              src="/img/card1.jpg"
              alt="Dentist"
              className="w-80 h-56 md:w-96 md:h-64 object-cover borderrounded"
            />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left w-full flex-grow">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 ">
            Not Sure Which Service <br className="hidden md:inline"></br> You Need?
          </h2>

          <button
            className="
              mt-8 px-10 py-3.5
              bg-[#dbe4e6]
              hover:bg-[#c7d4d6]
              rounded-full
              text-sm font-semibold
              transition-all
              shadow-sm
            "
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
