import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import { LIBRARY_REPO, NPM_PACKAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install",
  description: "Install Loop from npm or load it as an ES module in the browser.",
};

const NPM = `npm install ${NPM_PACKAGE}`;

const IMPORT = `import loop from "${NPM_PACKAGE}";

const dpad = loop.input("dpad");

loop.tick(() => {
  el.style.transform = \`translate(\${dpad.value.x * 100}px, \${dpad.value.y * 100}px)\`;
});`;

const SCRIPT = `<script type="module">
  import loop from "./dist/index.js";
</script>`;

export default function InstallPage() {
  return (
    <article className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-medium tracking-tight">Install</h1>
        <p className="leading-7 text-muted">
          Loop is an ES module with TypeScript types. No framework. Offline by default. The
          library lives in{" "}
          <a href={LIBRARY_REPO} className="text-foreground underline" target="_blank" rel="noreferrer">
            interfaces-technology/loop
          </a>
          .
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">npm</h2>
        <CodeBlock code={NPM} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Quick start</h2>
        <CodeBlock code={IMPORT} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Browser, no build step</h2>
        <p className="leading-7 text-muted">
          Point a module script at the built file after <code className="font-mono text-foreground">npm run build</code>{" "}
          in the library repo, or serve <code className="font-mono text-foreground">dist/index.js</code> yourself.
        </p>
        <CodeBlock code={SCRIPT} />
      </section>
    </article>
  );
}
