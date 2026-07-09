export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8 border-b-4 border-[#d4a017] inline-block pb-2">
        About Our School
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          We are committed to providing quality education that nurtures curiosity, builds character,
          and prepares students to become responsible, thoughtful leaders of tomorrow.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          To be a center of excellence in education, fostering innovation, integrity, and a lifelong
          love of learning in every student who walks through our doors.
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Principal's Message</h2>
        <p className="text-gray-700 leading-relaxed italic">
          "Every child who joins our school family becomes part of a community that believes in their
          potential. Our doors are always open — to students, parents, and anyone who shares our
          passion for education."
        </p>
      </section>
    </div>
  );
}
