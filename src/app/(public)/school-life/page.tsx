import PageBanner from "@/components/PageBanner";
import { FaFutbol, FaMusic, FaTheaterMasks, FaUsers, FaMedal } from "react-icons/fa";

export default function SchoolLifePage() {
  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Beyond the Books"
        title="School Life"
        subtitle="Discover the clubs, sports and activities that make our campus vibrant and our students truly well-rounded."
        image="/school.jpg"
      />

      {/* ── CLUBS ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">

          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Clubs & Societies</h2>
            <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4 mx-auto" />
            <p className="text-gray-500 mt-6 max-w-xl mx-auto text-lg">
              From robotics to debating — our clubs ensure every student finds their passion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaTheaterMasks, title: "Drama & Arts",   desc: "Express yourself through acting, set design, scriptwriting, and creative storytelling on stage.",     gradient: "from-pink-600 to-rose-600" },
              { icon: FaMusic,        title: "Music & Choir",  desc: "Join our award-winning school band, orchestra, or vocal ensemble and perform at events.",              gradient: "from-purple-600 to-indigo-600" },
              { icon: FaUsers,        title: "Debate Club",    desc: "Develop critical thinking and public speaking through Model UN, MUNs, and debate tournaments.",       gradient: "from-[#1E3A8A] to-[#2563EB]" },
            ].map((club) => (
              <div
                key={club.title}
                className={`relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br ${club.gradient} text-white`}
                style={{ minHeight: 300 }}
              >
                <div className="p-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <club.icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{club.title}</h3>
                  <p className="text-white/80 leading-7 text-sm">{club.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SPORTS ── */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            <div>
              <p className="uppercase tracking-[4px] text-[#D4A017] font-bold text-sm mb-4">ATHLETICS</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Sports &<br />Physical Education
              </h2>
              <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4" />
              <p className="text-gray-600 leading-8 text-lg mt-8 mb-10">
                Physical education is integral to our curriculum. We provide state-of-the-art facilities and professional coaching to promote fitness, teamwork, and sportsmanship.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { emoji: "⚽", label: "Football" },
                  { emoji: "🏀", label: "Basketball" },
                  { emoji: "🏊", label: "Swimming" },
                  { emoji: "🤸", label: "Gymnastics" },
                  { emoji: "🏏", label: "Cricket" },
                  { emoji: "🎾", label: "Tennis" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="font-semibold text-slate-800 text-sm">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: 480 }}>
              <img src="/hero.jpg" alt="Students playing sports" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-white flex items-center gap-5">
                  <FaMedal className="text-5xl text-[#FFD54F] shrink-0" />
                  <div>
                    <p className="text-3xl font-black">50+</p>
                    <p className="text-white/80 font-medium text-sm">Regional Championships Won</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOUSES ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#2563EB] text-white px-8 md:px-16 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">House System</h2>
              <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4 mx-auto" />
              <p className="text-blue-200 mt-6 max-w-xl mx-auto">
                Fostering healthy competition and camaraderie through our vibrant four-house system.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { letter: "G", name: "Gryffindor", motto: "Courage & Bravery",   bg: "bg-red-600/20",     border: "border-red-500/40",     text: "text-red-400" },
                { letter: "R", name: "Ravenclaw",  motto: "Wisdom & Wit",         bg: "bg-blue-600/20",    border: "border-blue-500/40",    text: "text-blue-400" },
                { letter: "H", name: "Hufflepuff", motto: "Loyalty & Patience",   bg: "bg-yellow-600/20",  border: "border-yellow-500/40",  text: "text-yellow-400" },
                { letter: "S", name: "Slytherin",  motto: "Ambition & Pride",     bg: "bg-emerald-600/20", border: "border-emerald-500/40", text: "text-emerald-400" },
              ].map((house) => (
                <div key={house.name} className={`${house.bg} border ${house.border} rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300`}>
                  <div className={`w-16 h-16 rounded-full ${house.bg} border-2 ${house.border} flex items-center justify-center mx-auto mb-4 text-2xl font-black ${house.text}`}>
                    {house.letter}
                  </div>
                  <h3 className={`text-lg font-bold ${house.text} mb-1`}>{house.name}</h3>
                  <p className="text-sm text-gray-400">{house.motto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
