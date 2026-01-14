import { createSignal, Show } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { CompanyCopyright } from "../components/Copyrights";

export default function Signup() {
  const [getFullName, setFullName] = createSignal("");
  const [getEmail, setEmail] = createSignal("");
  const [getPassword, setPassword] = createSignal("");
  const [getTermsAccepted, setTermsAccepted] = createSignal(false);
  const [getError, setError] = createSignal("");
  const [getIsLoading, setIsLoading] = createSignal(false);

  const navigate = useNavigate();

  const handleSignup = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (!getTermsAccepted()) {
      setError("Please agree to the Terms and Privacy Policy.");
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");
      const url = `${baseUrl}/api/dashboard/signup`;
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: getFullName(),
          email: getEmail(),
          password: getPassword()
        }),
      });

      if (resp.ok) {
        navigate("/login");
      } else {
        const data = await resp.json();
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Network error. Please check your backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-[calc(100vh-64px)] flex flex-col justify-center
                bg-white py-12 px-6 lg:px-8 font-sans">
      <Title>Create Account | TRID Check</Title>

      <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 class="mt-6 text-3xl font-black tracking-tighter text-gray-900 uppercase">
          Start your free trial
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <A href="/login" class="font-bold text-blue-600 hover:text-blue-500">Log in here</A>
        </p>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div class="bg-white px-10 py-12 border border-slate-100 rounded-3xl
                    shadow-2xl shadow-slate-200/50">
          <form class="space-y-6" onSubmit={handleSignup}>

            {/* Full Name */}
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Full Name
              </label>
              <input
                type="text" placeholder="John Doe" required
                onInput={(e) => setFullName(e.currentTarget.value)}
                class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                       shadow-sm ring-1 ring-inset ring-gray-200
                       focus:ring-2 focus:ring-inset focus:ring-blue-600
                       transition-all font-medium sm:text-sm"
              />
            </div>

            {/* Email Address */}
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Email address
              </label>
              <input
                type="email" placeholder="john@company.com" required
                onInput={(e) => setEmail(e.currentTarget.value)}
                class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                       shadow-sm ring-1 ring-inset ring-gray-200
                       focus:ring-2 focus:ring-inset focus:ring-blue-600
                       transition-all font-medium sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Password
              </label>
              <input
                type="password" placeholder="••••••••" required
                onInput={(e) => setPassword(e.currentTarget.value)}
                class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                       shadow-sm ring-1 ring-inset ring-gray-200
                       focus:ring-2 focus:ring-inset focus:ring-blue-600
                       transition-all font-medium sm:text-sm"
              />
            </div>

            {/* Terms & Privacy */}
            <div class="flex items-center">
              <input
                id="terms" type="checkbox"
                checked={getTermsAccepted()}
                onChange={(e) => setTermsAccepted(e.currentTarget.checked)}
                class="h-4 w-4 rounded border-gray-300 text-blue-600
                       focus:ring-blue-600 cursor-pointer"
              />
              <label for="terms" class="ml-3 block text-sm text-gray-500">
                I agree to the <a href="#" class="font-bold text-gray-900 hover:underline">Terms</a>
                {" "}and{" "}
                <a href="#" class="font-bold text-gray-900 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Error Message Section */}
            <Show when={getError()}>
              <div class="text-red-500 text-xs font-bold bg-red-50 px-4 py-3
                          rounded-xl border border-red-100 animate-pulse">
                {getError()}
              </div>
            </Show>

            <div>
              <button
                type="submit"
                disabled={getIsLoading()}
                class={`flex w-full justify-center rounded-xl px-3 py-3 text-sm
                        font-bold leading-6 text-white shadow-sm transition-all
                        active:scale-[0.98] ${
                  getIsLoading() ? "bg-gray-400 cursor-not-allowed" : "bg-slate-900 hover:bg-black"
                }`}
              >
                {getIsLoading() ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
        <CompanyCopyright />
      </div>
    </div>
  );
}
