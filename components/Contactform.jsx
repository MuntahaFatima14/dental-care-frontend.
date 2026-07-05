import React from 'react';

function Contactform() {
  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-60 py-16 md:py-24' id = 'contact'>
       <section className="bg-white py-12 px-6 md:py-16 md:px-12 shadow-2xl rounded-3xl">
      <div className=" mb-12">
        <h2 className="text-lg md:text-4xl font-extrabold text-gray-900 mb-2">
         Send Us a Message
        </h2>
        <p className="max-w-3xl text-gray-700 leading-relaxed">
         Fill out the form and our teams will get back to you shortly.
        </p>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-12">
        <div className='w-full md:w-1/2'>
            <div className="relative mb-3">
              <label
                htmlFor="username"
                className="text-s text-black-400 px-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="username"
                placeholder="User Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
             <div className="relative mb-3">
              <label
                htmlFor="username"
                className="text-s text-black-400 px-1"
              >
                Sur Name
              </label>
              <input
                type="text"
                id="surname"
                placeholder="User Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            

            

            {/* Email Input */}
            <div className="relative mb-3">
              <label
                htmlFor="email"
                className="text-s text-black-400 px-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
         </div>
          {/* Message Input */}
          <div className="relative mb-3">
              <label
                htmlFor="text"
                className="text-s text-black-400 px-1"
              >
                Message
              </label>
              <textarea
                type="text"
                id="message"
                placeholder=""
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
               <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 mb-1 rounded-md hover:bg-navy-blue-600 transition"
            >
              Submit
            </button>
             </div>
          </div>
          <div className='w-full md:w-1/2 flex justify-center items-center'>
            <img src="/img/image.png" alt="Contact illustration" className="w-full max-w-md h-auto object-contain rounded-2xl" />
          </div>
        </div>

      </section>
    </div>
  );
}

export default Contactform;
