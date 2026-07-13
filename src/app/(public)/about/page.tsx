export default function AboutPage() {
  return (
    <div className="space-y-20">

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-3xl px-8 py-16 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Our School
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-blue-100 leading-8">
          Building bright minds through quality education, strong values, and
          an environment where every student is encouraged to grow with
          confidence and purpose.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-8">
            We strive to provide quality education that inspires creativity,
            develops character, and prepares students to become responsible
            citizens capable of making meaningful contributions to society.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-4">🌍</div>

          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
            Our Vision
          </h2>

          <p className="text-gray-600 leading-8">
            To become a leading educational institution where academic
            excellence, innovation, leadership and lifelong learning flourish
            together.
          </p>
        </div>

      </section>

      {/* Why Choose Us */}

      <section>

        <h2 className="text-3xl font-bold text-center text-[#1E3A8A] mb-12">
          Why Choose Our School?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            ["👨‍🏫","Experienced Faculty"],
            ["📚","Modern Learning"],
            ["🏆","Excellent Results"],
            ["🌱","Overall Development"],
          ].map(([icon,title])=>(
            <div
              key={title}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              <div className="text-5xl mb-4">{icon}</div>

              <h3 className="font-semibold text-lg text-[#1E3A8A]">
                {title}
              </h3>
            </div>
          ))}

        </div>

      </section>

      {/* Principal Message */}

      <section className="bg-[#F8FAFC] rounded-3xl p-10 border border-gray-200">

        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6">
          Principal's Message
        </h2>

        <p className="text-gray-700 italic leading-8 text-lg">
          "Education is not only about academic success, but about nurturing
          confidence, discipline, compassion and curiosity. We believe every
          child possesses unique potential, and our responsibility is to help
          them discover it."
        </p>

        <div className="mt-8">
          <h3 className="font-bold text-[#1E3A8A]">
            Principal
          </h3>

          <p className="text-gray-500">
            Our School
          </p>
        </div>

      </section>

    </div>
  );
}
