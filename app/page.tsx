import Link from "next/link";
import { PublicNavbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_SERVICES, MOCK_TESTIMONIALS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

function HeroSection() {
  return (
    <section className="relative bg-gray-900 overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-5 text-orange-400 border-orange-400/40 bg-orange-400/5"
          >
            🔧 Bengkel Motor Terpercaya Surabaya
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Servis Motor Anda
            <br />
            <span className="text-orange-400">Cepat &amp; Terjamin</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Kembar Jaya Motor hadir untuk merawat kendaraan Anda dengan tenaga
            ahli berpengalaman dan spare part original. Booking servis semudah
            klik!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Booking Sekarang{" "}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </Link>
            <Link href="#layanan">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500"
              >
                Lihat Layanan
              </Button>
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[
              { value: "500+", label: "Motor Diservis" },
              { value: "10+", label: "Tahun Berpengalaman" },
              { value: "98%", label: "Pelanggan Puas" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-orange-400">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const items = [
    {
      icon: "🔩",
      title: "Teknisi Bersertifikat",
      desc: "Tim mekanik kami telah tersertifikasi dan berpengalaman lebih dari 10 tahun.",
    },
    {
      icon: "⚡",
      title: "Servis Cepat",
      desc: "Estimasi waktu pengerjaan jelas. Tidak ada menunggu tanpa kepastian.",
    },
    {
      icon: "🛡️",
      title: "Garansi Pengerjaan",
      desc: "Setiap pekerjaan kami garansi selama 30 hari. Kepuasan Anda prioritas kami.",
    },
    {
      icon: "💰",
      title: "Harga Transparan",
      desc: "Biaya servis jelas sebelum pengerjaan dimulai. Tidak ada biaya tersembunyi.",
    },
  ];
  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Mengapa Pilih Kami?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Kami berkomitmen memberikan pengalaman servis terbaik untuk setiap
            pelanggan.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.title} hover className="text-center">
              <CardBody className="py-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Layanan Kami
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Kami menyediakan berbagai layanan servis lengkap untuk semua jenis
            sepeda motor.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SERVICES.slice(0, 6).map((service) => (
            <Card key={service.id} hover>
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">
                    ~{service.estimatedDuration} mnt
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-500 font-bold text-lg">
                    {formatCurrency(service.price)}
                  </span>
                  <Badge variant="outline">{service.category}</Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/register">
            <Button variant="primary" size="lg">
              Pesan Layanan Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Kata Pelanggan Kami
          </h2>
          <p className="text-gray-400">
            Kepuasan pelanggan adalah kebanggaan kami.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 rounded-2xl p-5 border border-gray-700 flex flex-col"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < t.rating ? "text-orange-400" : "text-gray-600"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {t.userName[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {t.userName}
                  </p>
                  <p className="text-gray-500 text-xs">{t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      id="kontak"
      className="py-20 bg-linear-to-br from-orange-500 to-orange-600"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap Merawat Motor Anda?
        </h2>
        <p className="text-orange-100 mb-8 text-lg">
          Daftar sekarang dan nikmati kemudahan booking servis motor online. Tim
          kami siap melayani Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg w-full sm:w-auto"
            >
              Daftar Gratis
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
            >
              Sudah Punya Akun? Masuk
            </Button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-orange-100 text-sm">
          <span className="flex items-center gap-2">
            📍 Jl. Raya Kembar No. 88, Surabaya
          </span>
          <span className="flex items-center gap-2">📞 +62 812-3456-7890</span>
          <span className="flex items-center gap-2">
            ⏰ Senin–Sabtu, 08.00–17.00
          </span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <PublicNavbar />
      <main>
        <HeroSection />
        <WhyUsSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
