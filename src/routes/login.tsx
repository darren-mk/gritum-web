import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Title } from "@solidjs/meta";

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const navigate = useNavigate();

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setError("");

    try {
      // app.config.ts에 설정한 Proxy 덕분에 /api로 시작하는 요청은 Clojure 엔진으로 전달됩니다.
      const response = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email(), password: password() }),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please check your backend.");
    }
  };

  return (
    <main class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Title>Login | Bitem Labs</Title>
      
      <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">BITEM LABS</h2>
          <p class="mt-2 text-sm text-gray-600 font-medium">Welcome back</p>
        </div>

        <form class="mt-8 space-y-6" onSubmit={handleLogin}>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700">
                    Email Address</label>
                <input
                type="email"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300
                      rounded-xl focus:ring-blue-500 focus:border-blue-500
                      outline-none transition-all"
                placeholder="name@company.com"
                onInput={(e) => setEmail(e.currentTarget.value)} />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300
                      rounded-xl focus:ring-blue-500 focus:border-blue-500
                      outline-none transition-all"
                placeholder="••••••••"
                onInput={(e) => setPassword(e.currentTarget.value)} />
            </div>
          </div>

          {error() && (
            <div class="text-red-500 text-sm font-medium bg-red-50 p-3
                        rounded-lg border border-red-100">
              {error()}
            </div>
          )}

          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border
                  border-transparent rounded-xl shadow-sm text-sm
                  font-bold text-white bg-blue-600 hover:bg-blue-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-blue-500 transition-colors" >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
