import { createResource, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { ClientProfile } from "../types";

const fetchUserProfile = async (): Promise<ClientProfile> => {
  const response = await fetch("/api/dashboard/me");
  if (!response.ok) throw new Error("Unauthorized");
  return response.json();
};

export default function Dashboard() {
  const [user] = createResource(fetchUserProfile);

  // 렌더링 시점에 데이터 상태를 확인합니다.
  console.log("User data:", user());
  console.log("Loading state:", user.loading);
  console.log("Error state:", user.error);

  return (
    <main class="max-w-6xl mx-auto px-6 py-12">
        <Title>Dashboard | Bitem Labs</Title>

        <header class="mb-12">
            <h1 class="text-4xl font-black text-gray-900 tracking-tight">Console</h1>
            <p class="text-gray-500 mt-2">Manage your AI video production and API services.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 사용자 프로필 카드 */}
            <div class="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Account</h3>
                
                <Show when={!user.loading} fallback={<div class="animate-pulse h-12 bg-gray-100 rounded-lg" />}>
                    <div class="space-y-4">
                        <div>
                            <p class="text-xs text-gray-400 mb-1">User ID</p>
                            <code class="text-sm font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-md break-all">
                                {user()?.id}
                            </code>
                        </div>
                        <p class="text-sm text-green-600 font-medium">● System Connected</p>
                    </div>
                </Show>

                <Show when={user.error}>
                    <p class="text-red-500 text-sm">Session expired. Please login again.</p>
                </Show>
            </div>

            {/* 서비스 현황 카드 (예시) */}
            <div class="md:col-span-2 p-8 bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl text-white shadow-xl">
                <h3 class="text-lg font-bold mb-2">AI Video Engine</h3>
                <p class="text-blue-200 text-sm mb-8">Your backend API service is ready to process requests.</p>
                <button class="px-6 py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all active:scale-95">
                    Create New API Key
                </button>
            </div>
        </div>
    </main>
  );
}
