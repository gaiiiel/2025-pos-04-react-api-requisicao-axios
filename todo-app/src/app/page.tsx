"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Bem-vindo ao Todo App</h1>
        <Link href="/tarefas" className="bg-pink-600 hover:cursor-pointer text-white px-10 py-2 rounded">
          Ver Tarefas
        </Link>
      </div>
    </main>
  );
}
