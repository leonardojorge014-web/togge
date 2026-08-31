export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">TOGGE</h1>
        <p className="mt-4 text-zinc-400">
          Acesse <a href="/login" className="text-white underline">/login</a> ou <a href="/cadastro" className="text-white underline">/cadastro</a>
        </p>
      </div>
    </main>
  );
}