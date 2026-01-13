import { createSignal, Show } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import CompanyCopyright from "../components/CompanyCopyright"

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const navigate = useNavigate();

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setError("");
    try {
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
    <div class="min-h-[calc(100vh-64px)] flex flex-col justify-center
                bg-white py-12 px-6 lg:px-8 font-sans">
        <Title>Login | TRID Check</Title>
        {/* Header: Signup 페이지와 통일된 헤더 */}
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-black tracking-tighter text-gray-900">
                Welcome Back
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <A href="/signup" class="font-semibold text-blue-600 hover:text-blue-500">
                    Sign up for free
                </A>
            </p>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
            <div class="bg-white px-10 py-12 shadow-2xl shadow-slate-200/50
                        border border-slate-100 rounded-3xl">
                <form class="space-y-6" onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div>
                        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            Work Email
                        </label>
                        <input
                          id="email" type="email" required
                          placeholder="name@company.com"
                          onInput={(e) => setEmail(e.currentTarget.value)}
                          class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                              shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400
                              focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm
                              sm:leading-6 transition-all font-medium" />
                    </div>
                    {/* Password Input */}
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label for="password"
                                   class="block text-xs font-bold uppercase
                                        tracking-wider text-gray-500">
                                Password
                            </label>
                            <div class="text-xs">
                                <a href="#" class="font-bold text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <input
                          id="password"
                          type="password"
                          required
                          placeholder="••••••••"
                          onInput={(e) => setPassword(e.currentTarget.value)}
                          class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                              shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400
                              focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm
                              sm:leading-6 transition-all font-medium"
                        />
                    </div>
                    {/* Error Message: 기존 에러 디자인을 통일성 있게 수정 */}
                    <Show when={error()}>
                        <div class="text-red-500 text-xs font-bold bg-red-50 px-4 py-3
                                    rounded-xl border border-red-100 animate-pulse">
                            {error()}
                        </div>
                    </Show>
                    <div>
                        <button
                          type="submit"
                          class="flex w-full justify-center rounded-xl bg-slate-900
                                px-3 py-3 text-sm font-bold leading-6 text-white
                                shadow-sm hover:bg-black transition-all active:scale-[0.98]" >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
            <CompanyCopyright />
        </div>
    </div>
  );
}
