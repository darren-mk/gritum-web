import { createSignal } from "solid-js";
import "./app.css";

export default function App() {
  const [getCount, setCount] = createSignal(0);

  return (
    <main>
      <h1>Hello world!</h1>
      <button class="increment" onClick={() => setCount(getCount() + 1)} type="button">
        Clicks: {getCount()}
      </button>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
