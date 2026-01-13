import { Suspense, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import Navbar from "./components/Navbar";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => {
        const location = useLocation();
        const isDashboard = () => location.pathname.startsWith("/dashboard");
        return (
          <MetaProvider>
            <Title>Bitem Labs | Modern API Solutions</Title>
            <Show when={!isDashboard()}>
              <Navbar />
            </Show>
            <Suspense>
              <div class={isDashboard() ? "" : "pt-4"}>
                {props.children}
              </div>
            </Suspense>
          </MetaProvider>);}} >
      <FileRoutes />
    </Router>);}
