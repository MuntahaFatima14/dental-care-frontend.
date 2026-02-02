import React from "react";

const services = [
  {
    title: "General Dentistry",
    desc: "Preventive checkups and regular cleanings help avoid serious dental issues.",
    img: "../img/card1.jpg",
  },
  {
    title: "Cosmetic Dentistry",
    desc: "Brighten and enhance your smile with whitening, veneers and custom treatments.",
    img: "../img/card2.jpg",
  },
  {
    title: "Orthodontics",
    desc: "Braces and Invisalign to align teeth comfortably. Ideal for both teens and adults.",
    img: "../img/card3.jpg",
  },
  {
    title: "Pediatric Dentistry",
    desc: "Gentle care for children of all ages. Fun-friendly visits with preventive care.",
    img: "../img/card4.jpg",
  },
  {
    title: "Dental Implants",
    desc: "Permanent tooth replacement solutions with lifelike implant options.",
    img: "../img/card5.jpg",
  },
  {
    title: "Emergency Dental Care",
    desc: "Fast relief when you need it most—same-day visits available.",
    img: "../img/card6.jpg",
  },
];

export default function Services() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-2">
        Smile Solutions For Every Need
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Whether it’s a checkup or a full makeover, we’ve got you covered.
      </p>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 hover:-translate-y-1 transition transform"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
