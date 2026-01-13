import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

export default function Signup() {
  return (
    <div class="min-h-[calc(100vh-64px)] flex flex-col justify-center bg-white py-12 px-6 lg:px-8">
      <Title>Create Account | TRID Check</Title>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo or Brand Name */}
        <h2 class="mt-6 text-center text-3xl font-black tracking-tighter text-gray-900">
          Start your free trial
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <A href="/login" class="font-semibold text-blue-600 hover:text-blue-500">
            Log in here
          </A>
        </p>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
          <div class="bg-white px-10 py-12 shadow-2xl shadow-slate-200/50
                      border border-slate-100 rounded-3xl">
          <form class="space-y-6" action="#" method="POST">
            <div>
                <label for="name"
                       class="block text-xs font-bold uppercase
                            tracking-wider text-gray-500 mb-2">
                Full Name
              </label>
              <input
                id="name" name="name" type="text"
                placeholder="John Doe" required
                class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-blue-600
                    sm:text-sm sm:leading-6 transition-all" />
            </div>
            <div>
                <label for="email"
                       class="block text-xs font-bold uppercase
                            tracking-wider text-gray-500 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@company.com"
                required
                class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-blue-600
                    sm:text-sm sm:leading-6 transition-all" />
            </div>
            <div>
                <label for="password"
                       class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Password
              </label>
              <input
                id="password" name="password" type="password"
                placeholder="••••••••" required
                class="block w-full rounded-xl border-0 px-4 py-3 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm
                    sm:leading-6 transition-all" />
            </div>
            <div class="flex items-center">
              <input
                id="terms" name="terms" type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <label for="terms" class="ml-3 block text-sm leading-6 text-gray-500">
                I agree to the{" "}
                <a href="#" class="font-semibold text-gray-900 hover:underline">Terms</a> and{" "}
                <a href="#" class="font-semibold text-gray-900 hover:underline">Privacy Policy</a>.
              </label>
            </div>
            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-xl bg-slate-900
                      px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm
                      hover:bg-black focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-2 focus-visible:outline-blue-600
                      transition-all" >
                Create Account
              </button>
            </div>
          </form>
        </div>
        <p class="mt-10 text-center text-xs text-gray-400">
          © 2026 Bitem Labs Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
