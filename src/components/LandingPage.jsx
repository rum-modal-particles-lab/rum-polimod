import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FEFFFC] text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#81E7AF] to-[#FFFECE] text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-[#205781]">
          Welcome to PoliMOD
        </h1>
        <p className="text-xl mb-6 text-[#333333]">
          Explore the use of modal particles in political discourse.
        </p>
        <Link
          to="/schon"
          className="bg-[#205781] text-white py-2 px-6 rounded-md text-xl font-semibold hover:bg-[#1a4563] transition duration-300"
        >
          Start Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-[#205781]">Why PoliMOD?</h2>
        <div className="max-w-screen-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-[#F2F5F0] p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="font-bold mb-2 text-[#205781]">Real Discourse</h3>
          <p>Investigate how German modal particles are used in political speech.</p>
          </div>
          <div className="bg-[#F2F5F0] p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="font-bold mb-2 text-[#205781]">Corpus Integration</h3>
          <p>Search real parliamentary texts and annotate linguistic features.</p>
          </div>
        </div>
      </section>
      
      {/* Module Preview Section */}
      <section className="py-20 bg-gradient-to-r from-[#A3D9FF] to-[#81E7AF] text-center">
        <h2 className="text-3xl font-semibold mb-8 text-[#205781]">
          Modul: <span className="italic">...schon auch modal</span>
        </h2>
        <Link
          to="/schon"
          className="bg-[#205781] text-white py-2 px-6 rounded-md text-xl font-semibold hover:bg-[#1a4563] transition duration-300"
        >
          Explore the Module
        </Link>
      </section>

      {/* Footer Section */}
      <footer className="py-10 bg-[#205781] text-white text-center">
        <p>© 2025 RUM Modal Particles Lab</p>
        <p>All rights reserved.</p>
      </footer>
    </div>
  );
}
