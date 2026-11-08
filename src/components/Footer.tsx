"use client";

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full flex items-center justify-between px-8 md:px-16 py-10"
      style={{ backgroundColor: "#EDE8DC", borderTop: "1px solid #D4CBBF" }}
    >
      <Image
        src="/assets/4621ba9b-f636-405b-86a0-03a56679c6cf.png"
        alt="Raio"
        width={28}
        height={28}
        className="h-7 w-auto opacity-40"
        style={{ filter: "invert(1) brightness(0.3)" }}
      />
      <p
        className="font-sans text-warm-gray"
        style={{ fontSize: "0.72rem", opacity: 0.5, letterSpacing: "0.06em" }}
      >
        © {year} Raio
      </p>
    </footer>
  );
}
