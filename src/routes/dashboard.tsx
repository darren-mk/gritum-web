import { createResource, For, Show, createSignal, onMount } from "solid-js";
import { Title } from "@solidjs/meta";

const fetchApiKeys = async (shouldFetch: boolean) => {
  // 시그널이 false면 아무것도 하지 않음
  if (!shouldFetch) return [];

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const res = await fetch(`${baseUrl}/api/dashboard/api-keys`, {
    credentials: "include"
  });

  if (!res.ok) return [];
  return res.json();
};

function UpperSection() {
  return (
    <section class="mb-12 flex justify-between items-end">
      <div>
        <h1 class="text-4xl font-black text-gray-900 tracking-tight">Console</h1>
        <p class="text-gray-500 mt-1">Manage your API services for Bitem Labs.</p>
      </div>
      <div class="text-right">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Logged In</p>
      </div>
    </section>
  );
}

const ColumnHeader = (props: { label: string }) => (
  <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
      {props.label}
  </th>
);

export default function Dashboard() {
  // ✅ 핵심: 브라우저 마운트 여부를 추적하는 시그널
  const [start, setStart] = createSignal(false);
  // ✅ createResource의 첫 번째 인자로 시그널을 전달합니다.
  // start()가 true가 되는 순간 fetchApiKeys가 실행됩니다.
  const [apiKeys, { refetch }] = createResource(start, fetchApiKeys);
  // ✅ 컴포넌트가 브라우저에 나타나면(onMount), 시그널을 true로 바꿉니다.
  onMount(() => {setStart(true);});
  const handleCreateKey = async () => {
    const name = prompt("New API Key Name:");
    if (!name) return;
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const res = await fetch(`${baseUrl}/api/dashboard/api-keys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
        credentials: "include"});
      if (res.ok) refetch();
    } catch (e) { console.error(e); }};

  return (
    <main class="max-w-6xl mx-auto px-6 py-12">
        <Title>Console | Bitem Labs</Title>
        <UpperSection />
        <section class="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div class="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">API Keys</h2>
                <button onClick={handleCreateKey} class="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl">
                    + Create New Key
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50/50">
                            <ColumnHeader label="Name" />
                            <ColumnHeader label="Key ID" />
                            <ColumnHeader label="Created" />
                            <ColumnHeader label="Status" />
                        </tr>
                    </thead>
                    <tbody>
                        {/* ✅ apiKeys.loading이 true이거나 데이터가 오기 전까지 fallback이 보입니다. */}
                        <Show when={!apiKeys.loading} fallback={<tr><td colspan="4" class="p-8 text-center text-gray-400">Loading...</td></tr>}>
                            <For each={apiKeys()} fallback={<tr><td colspan="4" class="p-8 text-center text-gray-400">No keys found.</td></tr>}>
                                {(key) => (
                                  <tr class="border-t border-gray-50 hover:bg-gray-50/30">
                                      <td class="px-8 py-5 font-semibold text-gray-800">TBD</td>
                                      <td class="px-8 py-5 text-sm font-mono text-gray-500">{key.key_id}</td>
                                      <td class="px-8 py-5 text-sm text-gray-500">{new Date(key.created_at).toLocaleDateString()}</td>
                                      <td class="px-8 py-5">
                                          <span class="px-2 py-1 bg-green-100 text-green-800
                                                       text-xs font-bold rounded-full">Active
                                          </span>
                                      </td> </tr>)}
                            </For> </Show> </tbody> </table> </div> </section> </main>);}
