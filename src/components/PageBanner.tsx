// Shared banner used by all inner pages
export default function PageBanner({
  eyebrow,
  title,
  subtitle,
  image = "/hero.jpg",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <div className="w-full bg-[#0F172A] relative overflow-hidden" style={{ minHeight: 420 }}>
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
      />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 py-32 text-center text-white">
        <p className="uppercase tracking-[5px] text-[#D4A017] font-semibold mb-4 text-sm">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">{title}</h1>
        <p className="mt-6 text-blue-100 text-lg max-w-2xl mx-auto leading-8">{subtitle}</p>
      </div>
    </div>
  );
}
