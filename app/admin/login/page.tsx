import { login } from "../actions";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-black text-white mb-1">SamuiKids Admin</h1>
        <p className="text-slate-400 text-sm mb-6">Enter your admin password to continue</p>

        <form action={login} className="space-y-4">
          <input
            type="password"
            name="password"
            required
            placeholder="Admin password"
            autoFocus
            className="w-full bg-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600"
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-black py-3 rounded-xl transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
