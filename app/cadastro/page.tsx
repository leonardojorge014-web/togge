"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCadastro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email,
        name,
        phone,
        role: "customer",
      });

      if (profileError) {
        setErrorMessage(profileError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">TOGGE</p>
          <h1 className="mt-3 text-4xl font-bold">Criar conta</h1>
          <p className="mt-2 text-zinc-400">Comece sua experiência na TOGGE.</p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(67) 99999-9999"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-white"
              minLength={6}
              required
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Já tem conta? <a href="/login" className="text-white hover:underline">Entrar</a>
        </p>
      </div>
    </main>
  );
}