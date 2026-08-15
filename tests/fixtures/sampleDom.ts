export function createSampleDom(): HTMLElement {
  const root = document.createElement("div");
  root.setAttribute("data-testid", "root");

  const heading = document.createElement("h1");
  heading.textContent = "TweakSync";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = "Hello";

  root.appendChild(heading);
  root.appendChild(label);
  return root;
}
