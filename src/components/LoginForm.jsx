import { createSignal } from 'solid-js';

export default function LoginForm() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Astro 프록시 설정을 통해 Clojure 백엔드로 요청을 보냅니다.
      const response = await fetch('/api/dashboard/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email(), password: password() }),
      });

      if (response.ok) {
        // 로그인 성공 시 대시보드로 이동합니다.
        // 브라우저는 백엔드에서 보낸 세션 쿠키를 자동으로 저장합니다.
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Cannot connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
      <p class="text-gray-500 mb-8">Login to manage your Bitem Labs API keys</p>

      <form onSubmit={handleSubmit} class="space-y-6">
        {error() && (
          <div class="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error()}
          </div>
        )}

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="name@company.com"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading()}
          class="w-full py-3 px-6 text-white font-bold bg-blue-600 rounded-xl hover:bg-blue-700 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
        >
          {loading() ? 'Verifying...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}