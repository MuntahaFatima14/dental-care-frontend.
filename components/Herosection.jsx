import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-[#dce7ea] px-6 md:px-24 py-12 md:py-32 hero-section">
      {/* Text Section */}
      <div className="max-w-xl mb-10 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
          AI-Driven Disease Detection For Optimal Health
        </h1>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Transform dentistry using AI Disease Detection, revolutionizing
          diagnostics for early intervention. Explore groundbreaking
          technological advancements dedicated to enhancing care quality and
          promoting superior oral hygiene.
        </p>
        <Link to="/" className="inline-block bg-white text-gray-900 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition duration-300 text-center">
          Get Started
        </Link>
      </div>

      {/* Image Section */}
      <div className="flex justify-center md:justify-end w-full md:w-1/2">
        <img
          src="/img/Pic1.jpg"
          alt="AI cavity detection demo"
          className="rounded-xl shadow-lg w-full max-w-xl object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
