import { Title } from "@solidjs/meta";

export default function Docs() {
  return (
    <div class="bg-white min-h-screen pb-24 text-slate-900">
      <Title>Documentation | TRID Check</Title>
      <main class="max-w-4xl mx-auto px-6 pt-16">
        {/* 1. Introduction */}
        <section id="introduction" class="mb-20">
          <h1 class="text-4xl font-black mb-6 tracking-tight">Introduction</h1>
          <p class="text-lg text-slate-600 leading-relaxed mb-6">
            TRID Check is a specialized validation engine built for lenders, fintechs, and mortgage professionals.
            Our API automates the complex logic required to verify TILA-RESPA Integrated Disclosures (TRID),
            ensuring your loan documents meet regulatory standards in real-time.
          </p>
          <ul class="space-y-3 text-slate-700">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span><strong>Automated Compliance:</strong> Replace manual checklists with a sub-second validation engine.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 font-bold">•</span>
              <span><strong>Discrepancy Reporting:</strong> Get granular feedback on specific data points that fail compliance.</span>
            </li>
          </ul>
        </section>
        {/* 2. Quickstart */}
        <section id="quickstart" class="mb-20">
          <h2 class="text-2xl font-bold mb-6 tracking-tight">Quickstart</h2>
          <div class="space-y-6 text-slate-600">
            <p><strong>Step 1: Get your API Key.</strong> Sign up at the Console and generate your unique secret key.</p>
            <p><strong>Step 2: Make your first request.</strong></p>
            {/* 코드 블록도 본문 폭에 맞춰져서 훨씬 안정적으로 보입니다. */}
            <div class="bg-[#0f172a] rounded-xl p-6 overflow-x-auto shadow-sm">
              <pre class="text-blue-300 text-sm font-mono leading-relaxed">
{`curl -X POST https://api.tridcheck.com/v1/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "loan_amount": 350000,
    "apr": 4.5,
    "fees": []
  }'`}
              </pre>
            </div>
          </div>
        </section>
        {/* 3. Authentication */}
        <section id="authentication" class="mb-20 pt-12 border-t border-slate-100">
          <h2 class="text-2xl font-bold mb-6 tracking-tight">Authentication</h2>
          <p class="text-slate-600 leading-relaxed">
            All requests to the TRID Check API must be authenticated using a Bearer Token in the <code>Authorization</code> header.
          </p>
        </section>
        {/* 4. API Reference */}
        <section id="api-reference" class="mb-20 pt-12 border-t border-slate-100">
          <h2 class="text-2xl font-bold mb-6 tracking-tight">API Reference</h2>
          <h3 class="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">POST /v1/validate</h3>
          <p class="text-slate-600 leading-relaxed mb-8">Performs a comprehensive check on a set of disclosure data.</p>
          <div class="space-y-4 border-t border-slate-50">
            <div class="flex justify-between py-4 border-b border-slate-50">
              <code class="text-sm font-bold text-pink-600">loan_info</code>
              <span class="text-sm text-slate-400 italic">Object (Required)</span>
            </div>
            <div class="flex justify-between py-4 border-b border-slate-50">
              <code class="text-sm font-bold text-pink-600">disclosure_date</code>
              <span class="text-sm text-slate-400 italic">String (ISO 8601)</span>
            </div>
          </div>
        </section>
        <footer class="mt-32 pt-12 border-t border-slate-100 flex justify-between items-center text-[12px] text-slate-400 font-medium">
          <p>© 2026 Bitem Labs Inc.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-slate-900">Support</a>
            <a href="#" class="hover:text-slate-900">Privacy</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
