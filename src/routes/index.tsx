import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main class="text-center p-20">
      <h1 class="text-5xl font-black text-gray-900 mb-4">Bitem Labs</h1>
      <p class="text-gray-600 mb-8">AI Video Production & API Services</p>
      <A href="/login" class="text-blue-600 hover:underline font-bold">
        Go to Login →
      </A>
    </main>
  );
}
