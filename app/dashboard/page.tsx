import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">TOGGE</p>
        <h1 className="mt-3 text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-zinc-400">Usuário autenticado:</p>
        <p className="mt-2 text-white">{user.email}</p>
      </div>
    </main>
  );
}