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
  return (
    <nav class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Logo />
            <ContentLinks />
            <div class="flex items-center gap-4">
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
                    </A> </Show> </div> </div> </nav>);}
