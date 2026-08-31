import { supabase } from '@/lib/supabaseClient'

export default async function Home() {
  // Testar conexão com Supabase
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-blue-600">🚀 TOGGE</h1>
      <p className="mt-4 text-lg">Sua plataforma de delivery está no ar!</p>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          Status: {error ? '❌ Erro ao conectar' : '✅ Conectado ao Supabase!'}
        </p>
        {error && (
          <p className="text-sm text-red-500 mt-2">Erro: {error.message}</p>
        )}
      </div>
    </main>
  )
}