import { createResource, Show } from 'solid-js';

const fetchClient = async () => {
  const response = await fetch('/api/dashboard/me');
  console.log("####")
  console.log(response.json());
  if (!response.ok) throw new Error('Not authenticated');
  return response.json();
};

export default function ClientProfile() {
  const [user] = createResource(fetchClient);
  return (
    <div class="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
        Account Information
      </h2>
      <Show when={!user.loading} fallback={<p class="animate-pulse text-gray-400">Loading profile...</p>}>
        <div class="space-y-2">
          <p class="text-gray-900 font-semibold">Welcome back!</p>
          <div class="flex items-center space-x-2">
            <span class="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">UUID</span>
            <code class="text-sm text-gray-600 font-mono">
              {user()?.uuid || 'No UUID found'}
            </code>
          </div>
        </div>
      </Show>
      <Show when={user.error}>
        <p class="text-red-500 text-sm">Error: {user.error.message}</p>
      </Show>
    </div>
  );
}