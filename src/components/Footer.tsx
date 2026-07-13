export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-white font-serif text-lg font-bold mb-3">🏫 Our School</h3>
          <p className="text-sm leading-relaxed">
            Our School Name,<br />
            City, State<br />
            PIN - 000000
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Get in Touch</h4>
          <p className="text-sm mb-1">📞 +91 00000 00000</p>
          <p className="text-sm">✉️ contact@ourschool.edu</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Find Us</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4a017] hover:text-[#1e3a5f] transition-colors">f</a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4a017] hover:text-[#1e3a5f] transition-colors">ig</a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#d4a017] hover:text-[#1e3a5f] transition-colors">▶</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Our School. All rights reserved.
      </div>
    </footer>
  );
}
