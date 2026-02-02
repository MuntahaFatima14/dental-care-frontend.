import React from "react";


export default function ServiceHelp() {
  return (
    <section className="bg-[#dce7e9] py-20 px-4 flex justify-center">
      <div
        className="
          bg-white w-
          rounded-full
          flex flex-col md:flex-row justify-content-between items-center
          px-7 py-7 md:px-7 md:py-7
          shadow-[0_4px_20px_rgba(0,0,0,0.08)]
          gap-0
        "
      >
        {/* Image Container */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
            <img
              src="../img/card1.jpg"
              alt="Dentist"
              className="w-96 h-64 object-cover borderrounded"
            />
        </div>

        {/* Text Section */}
        <div className="mt-8 md:mt-0 md:ml-12 text-center md:text-left w-full ">
          <h2 className="text-3xl md:text-4xl font-bold leading-loose text-gray-900 ">
            Not Sure Which Service <br></br> You Need?
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
