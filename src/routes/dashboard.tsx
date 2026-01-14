import { createResource, For, Show, createSignal, onMount, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Title } from "@solidjs/meta";

const fetchMe = async () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await fetch(`${baseUrl}/api/dashboard/auth/me`, { 
      credentials: "include"});
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;}};

const fetchApiKeys = async (shouldFetch: boolean) => {
  if (!shouldFetch) return [];
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const res = await fetch(`${baseUrl}/api/dashboard/auth/api-keys`, { 
    credentials: "include"});
  if (!res.ok) return [];
  return res.json();};

export default function Dashboard() {
  const navigate = useNavigate();
  const [getStart, setStart] = createSignal(false);
  const [user] = createResource(fetchMe);
  const [apiKeys, { refetch }] = createResource(getStart, fetchApiKeys);

  createEffect(() => {
    // ✅ 컴포넌트가 마운트되고 인증 확인이 끝난 후 API 키를 가져옵니다.
    // 로딩이 끝났는데 유저 정보가 없으면(null) 로그인으로 보냅니다.
    if (!user.loading && user() === null) {
      navigate("/login", { replace: true });
    }
    // 유저가 확인되면(성공) API 키 조회를 시작합니다.
    if (user()) {
      setStart(true);}});

  const handleCreateKey = async () => {
    const name = prompt("New API Key Name:");
    if (!name) return;
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const res = await fetch(`${baseUrl}/api/dashboard/auth/api-keys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
        credentials: "include"
      });
      if (res.ok) refetch();
    } catch (e) { console.error(e); }
  };

  return (
    <main class="max-w-6xl mx-auto px-6 py-12">
      <Title>Console | TRID Precheck</Title>
      
      <Show 
        when={user()} 
        fallback={
          <div class="py-20 text-center text-slate-400 font-medium">
            Verifying identity...
          </div>} >
        <section class="mb-12 flex justify-between items-end">
          <div>
            <h1 class="text-4xl font-black text-gray-900 tracking-tight">Console</h1>
            <p class="text-gray-500 mt-1">Manage your API services.</p>
          </div>
          <div class="text-right">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Logged In As
            </p>
            <p class="text-sm font-bold text-blue-600">
              {user()?.full_name || user()?.email}
            </p>
          </div>
        </section>

        {/* API Keys Table Section */}
        <section class="bg-white border border-gray-100 rounded-3xl 
                        shadow-sm overflow-hidden">
          <div class="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-800">API Keys</h2>
            <button 
              onClick={handleCreateKey} 
              class="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl" >
              + Create New Key
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50/50">
                  <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                  <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Key ID</th>
                  <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Created</th>
                  <th class="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                <Show 
                  when={!apiKeys.loading} 
                  fallback={
                    <tr>
                      <td colspan="4" class="p-8 text-center text-gray-400">Loading...</td>
                    </tr>} >
                  <For 
                    each={apiKeys()} 
                    fallback={
                      <tr>
                        <td colspan="4" class="p-8 text-center text-gray-400">No keys found.</td>
                      </tr>} >
                    {(key) => (
                      <tr class="border-t border-gray-50 hover:bg-gray-50/30">
                        <td class="px-8 py-5 font-semibold text-gray-800">
                          {key.name || "Untitled"}
                        </td>
                        <td class="px-8 py-5 text-sm font-mono text-gray-500">
                          {key.key_id}
                        </td>
                        <td class="px-8 py-5 text-sm text-gray-500">
                          {new Date(key.created_at).toLocaleDateString()}
                        </td>
                        <td class="px-8 py-5">
                          <span class="px-2 py-1 bg-green-100 text-green-800 
                                       text-xs font-bold rounded-full">
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
      </Show>
    </main>
  );
}
