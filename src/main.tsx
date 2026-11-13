import { App } from "@/App";
import { render } from "preact";
import "@photo-sphere-viewer/core/index.css";
import "@/styles/tokens.css";
import "@/styles/main.css";

const rootElement = document.getElementById("app");
if (rootElement) {
  render(<App />, rootElement);
}
