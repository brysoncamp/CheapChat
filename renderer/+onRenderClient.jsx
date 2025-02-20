export { onRenderClient };

import ReactDOM from "react-dom/client";
import { Layout } from "../src/components/Layout/Layout";

let root;

const onRenderClient = (pageContext) => {
  const { Page } = pageContext;
  if (!Page) throw new Error("My onRenderClient() hook expects pageContext.Page to be defined");

  const container = document.getElementById("react-root");
  if (!container) throw new Error("DOM element #react-root not found");

  const page = (
    <Layout pageContext={pageContext}>
      <Page />
    </Layout>
  );

  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
  }

  document.title = pageContext.data?.title || pageContext.config?.title || "CheapChat";
};