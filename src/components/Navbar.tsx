import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";

const Logo = () =>
  <A href="/"
     class="text-xl font-black text-gray-900 tracking-tighter">
      TRID Check
  </A>

const ContentLink = (props:any) =>
  <A href={props.href}
     class="text-md font-semibold text-gray-600
          hover:text-gray-900 transition-colors">
      {props.label}
  </A>

const ContentLinks = () =>
  <div class="hidden md:flex items-center gap-8">
      <ContentLink href="/pricing" label="Pricing" />
      <ContentLink href="/docs" label="Docs" />
  </div>

export default function Navbar() {
  const [isLoggedIn] = createSignal(false); // 나중에 실제 인증 로직과 연결
  const [getBurgerOpen, setBurgerOpen] = createSignal(false);
  const toggleBurgerOpen = () => setBurgerOpen(!getBurgerOpen());
  return (
    <nav class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Logo />
            <ContentLinks />
            <div class="flex items-center gap-4">
                <div class="hidden md:flex items-center gap-4">
                    <Show
                      when={isLoggedIn()}
                      fallback={
                        <>
                            <A href="/login"
                               class="text-sm font-semibold text-gray-700 hover:text-gray-900">
                                Log in
                            </A>
                            <A href="/signup"
                               class="px-4 py-2 bg-gray-900 text-white text-sm
                                     font-bold rounded-lg hover:bg-gray-800 transition-all">
                                Get Started
                            </A> </>} >
                        <A href="/dashboard"
                           class="px-4 py-2 border border-gray-200 text-sm
                                 font-bold rounded-lg hover:bg-gray-50 transition-all">
                            Go to Console
                        </A>
                    </Show>
                </div>
            </div>
            <button
              onClick={toggleBurgerOpen}
              class="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none" >
                <Show
                  when={!getBurgerOpen()}
                  fallback={
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>} >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </Show>
            </button>
        </div>
        <Show when={getBurgerOpen()}>
            <div class="md:hidden bg-white border-t border-gray-50 px-6 py-8 space-y-6
                        shadow-xl animate-in slide-in-from-top duration-300">
                <div class="flex flex-col gap-6">
                    <A href="/pricing" onClick={toggleBurgerOpen}
                       class="text-lg font-bold text-gray-900">Pricing</A>
                    <A href="/docs" onClick={toggleBurgerOpen}
                       class="text-lg font-bold text-gray-900">Docs</A>
                </div>
                <hr class="border-gray-100" />
                <div class="flex flex-col gap-4">
                    <Show when={isLoggedIn()} fallback={
                      <>
                          <A href="/login" onClick={toggleBurgerOpen}
                             class="text-center py-3 text-sm font-bold text-gray-700
                                   border border-gray-200 rounded-xl">
                              Log in
                          </A>
                          <A href="/signup" onClick={toggleBurgerOpen}
                             class="text-center py-3 text-sm font-bold text-white
                                   bg-gray-900 rounded-xl">Get Started</A>
                      </>}>
                        <A href="/dashboard" onClick={toggleBurgerOpen}
                           class="text-center py-3 text-sm font-bold text-white bg-blue-600 rounded-xl">
                            Go to Console
                        </A>
                    </Show>
                </div>
            </div>
        </Show>
    </nav>);}
