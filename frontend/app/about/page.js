"use client";
import Image from "next/image";
import Link from "next/link";
export default function AboutUs() {
  return (
    <div className="relative min-h-screen bg-[#fdf6e3] text-black font-[family-name:var(--font-geist-sans)] px-6 pt-6 pb-6">
      <Link href="/" className="absolute left-0 top-0 cursor-pointer">
        <img
          src="/wstemlogo.png"
          alt="Home"
          width={175}
          height={100}
          className="object-contain"
        />
      </Link>

      <footer className="mt-12 flex justify-center">
        <a
          className="absolute top-10 right-7 nter gap-2 hover:underline hover:underline-offset-4 text-md"
          href="https://qualtricsxmrt5r3gxmc.qualtrics.com/jfe/form/SV_6Vwj1rfNTJLSXA2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suggest an event / newsletter !
        </a>
      </footer>

      {/* aboutus */}
      <main className="max-w-3xl mx-auto mt-10 bg-white/70 p-10 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col gap-6 items-center text-center">
        <h1 className="text-3xl font-bold">About Us</h1>

        <p className="text-lg">
          <strong>UBC Women in STEM</strong> is a self updating calendar of all UBCV events for women and gender minorities in STEM.
        </p>

        <p className="text-lg">
          Founded in 2025, this website is still beta and in development, and always seeking to improve! Please provide any event or
          newsletter suggestions to the qualtrix in the upper right, or contact us at the email below.
        </p>

        <p className="text-lg">
          Whether you're an undergraduate, graduate student, or alumni, we hope you can
          find value in this calendar and attend some events!
        </p>
        <p className="text-lg">
          📍 Based at the University of British Columbia, Vancouver Campus <br />
          📧 Contact us: <a href="mailto:rowynsai+calendar@gmail.com" className="text-blue-700 underline">rowynsai+calendar@gmail.com</a>
        </p>
      </main>
    </div>
  );
}
