export { onRenderHtml };

import ReactDOMServer from "react-dom/server";
import { Layout } from "../src/components/Layout/Layout";
import { ConversationsProvider } from "../src/components/ConversationsProvider/ConversationsProvider";
import { AuthProvider } from "../src/components/AuthProvider/AuthProvider";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import logoUrl from "/logo.svg";

const onRenderHtml = (pageContext) => {
  const { Page } = pageContext;
  if (!Page) throw new Error("onRenderHtml expects pageContext.Page to be defined");

  const pageHtml = ReactDOMServer.renderToString(
    <AuthProvider>
      <ConversationsProvider>
        <Layout pageContext={pageContext}>
          <Page />
        </Layout>
      </ConversationsProvider>
    </AuthProvider>
  );

  const title = pageContext.exports?.title || "CheapChat";
  const desc = pageContext.exports?.description || "Access AI like GPT-4, Claude, and Gemini without subscriptions. Just pay for what you use.";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return { documentHtml, pageContext: {} };
};
