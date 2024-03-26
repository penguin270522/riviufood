"use client";

import { HomeLeft, HomeRight } from "@/components/pages/home";

// trang chủ

export default function Home() {
  return (
    <main className="px-px-body flex gap-8 min-h-screen py-8">
      {/* bên trái */}
      <HomeLeft />
      {/* bên phải */}
      <HomeRight />
    </main>
  );
}
