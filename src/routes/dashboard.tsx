// src/routes/dashboard.tsx
import { createResource, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { ApiKey } from "../types";
import { getBaseUrl } from "../lib/api";

const fetchApiKeys = async (): Promise<ApiKey[]> => {
  const res = await fetch(`${getBaseUrl()}/api/dashboard/api-keys`);
  if (!res.ok) return [];
  return res.json();
};

function UpperSection() { return (
  <section class="mb-12 flex justify-between items-end">
      <div>
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Console</h1>
          <p class="text-gray-500 mt-1">Manage your API services for Bitem Labs.</p>
      </div>
      <div class="text-right">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Logged</p>
      </div>
  </section>)};

export default function Dashboard() {
  const [keys] = createResource<ApiKey[]>(fetchApiKeys);

  return (
    <main class="max-w-6xl mx-auto px-6 py-12">
        <Title>Console | Bitem Labs</Title>
        <UpperSection />
        {/* 메인 섹션: API Keys 테이블 */}
        <section class="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div class="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">API Keys!</h2>
                <button class="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-95">
                    + Create New Key
                </button>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50/50">
                            <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                            <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Key</th>
                            <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Created</th>
                            <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <Show when={!keys.loading} fallback={<tr><td colspan="4" class="p-8 text-center text-gray-400">Loading keys...</td></tr>}>
                            <For each={keys()}
                                 fallback={<tr><td colspan="4" class="p-8 text-center text-gray-400">No API keys found.</td></tr>}>
                                {(key) => (
                                  <tr class="hover:bg-gray-50/30 transition-colors">
                                      <td class="px-8 py-5 font-semibold">{key.key_id}</td>
                                      <td class="px-8 py-5 text-sm text-gray-500">{new Date(key.created_at).toLocaleDateString()}</td>
                                      <td class="px-8 py-5">
                                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              Active
                                          </span>
                                      </td>
                                  </tr>
                                )}
                            </For>
                        </Show>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
  );
}
