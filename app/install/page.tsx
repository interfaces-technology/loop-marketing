import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import { McpInstallButtons } from "@/components/mcp-install-buttons";
import { LocalNav, PageHeader, SectionHeading } from "@/components/ui";
import {
  INSTALL_SECTIONS,
  LIBRARY_REPO,
  MCP_CONFIG,
  MCP_PACKAGE,
  NPM_PACKAGE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Install Loop from npm, load it in the browser, or add Loop docs to your AI assistant via MCP.",
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
    <div>
      <PageHeader
        eyebrow="Setup / package"
        title="From zero to signal."
        description={
          <p>
          Loop is an ES module with TypeScript types. No framework. Offline by default. The
          library lives in{" "}
          <a href={LIBRARY_REPO} className="text-foreground underline decoration-border-strong underline-offset-4 hover:text-accent" target="_blank" rel="noreferrer">
            interfaces-technology/loop
          </a>
          .
          </p>
        }
      >
        <div className="max-w-2xl">
          <CodeBlock code={NPM} label="npm" prompt />
        </div>
      </PageHeader>

      <div className="grid gap-10 pt-10 lg:grid-cols-[13rem_minmax(0,44rem)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <LocalNav label="Install methods" items={INSTALL_SECTIONS} />
        </aside>

        <article className="min-w-0 divide-y divide-border">
          <section id="npm" className="scroll-mt-24 pb-12">
            <SectionHeading index="01" title="npm">
              Install the package in any modern JavaScript project.
            </SectionHeading>
            <CodeBlock code={NPM} label="shell" prompt />
          </section>

          <section id="quick-start" className="scroll-mt-24 py-12">
            <SectionHeading index="02" title="Quick start">
              Import Loop, request an input, and read its normalized value on every tick.
            </SectionHeading>
            <CodeBlock code={IMPORT} label="app.ts" />
          </section>

          <section id="browser" className="scroll-mt-24 py-12">
            <SectionHeading index="03" title="Browser, no build step">
              Load Loop with a script tag after{" "}
              <code className="font-mono text-foreground">npm run build</code> in the library repo,
              or serve <code className="font-mono text-foreground">dist/index.js</code> yourself.
            </SectionHeading>
            <CodeBlock code={SCRIPT} label="index.html" />
          </section>

          <section id="mcp" className="scroll-mt-24 pt-12">
            <SectionHeading index="04" title="AI assistants (MCP)">
              Give Cursor, Claude Desktop, VS Code, Windsurf, and other MCP clients direct access
              to the spec, README, and examples.
            </SectionHeading>
            <div className="border border-border bg-panel p-5 sm:p-6">
              <p className="font-mono text-[0.65rem] tracking-[0.12em] text-signal uppercase">
                docs server
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                No global install. <code className="font-mono text-foreground">npx -y</code>{" "}
                downloads the package on first run.
              </p>
              <div className="mt-5">
                <McpInstallButtons />
              </div>
            </div>

            <p className="mt-6 text-sm text-muted">
              Or paste this manually for Claude Desktop, Windsurf, and other clients:
            </p>
            <div className="mt-3">
              <CodeBlock code={MCP_CONFIG} label="mcp.json" />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              VS Code uses <code className="font-mono text-foreground">&quot;servers&quot;</code> as
              the root key instead of{" "}
              <code className="font-mono text-foreground">&quot;mcpServers&quot;</code>.
            </p>

            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
              <div className="bg-panel p-5">
                <p className="font-mono text-[0.65rem] text-accent uppercase">Resources</p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  <code className="font-mono text-foreground">loop://spec</code>,{" "}
                  <code className="font-mono text-foreground">loop://readme</code>, and{" "}
                  <code className="font-mono text-foreground">loop://examples/*</code>
                </p>
              </div>
              <div className="bg-panel p-5">
                <p className="font-mono text-[0.65rem] text-accent uppercase">Tool</p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  <code className="font-mono text-foreground">search_docs</code> searches every
                  bundled document.
                </p>
              </div>
            </div>

            <p className="mt-6 border-l border-accent pl-4 text-sm leading-6 text-muted">
              Works via <code className="font-mono text-foreground">npx</code> once{" "}
              <code className="font-mono text-foreground">{MCP_PACKAGE}</code> is published to npm.
              The server lives in the{" "}
              <a href={LIBRARY_REPO} className="text-foreground underline hover:text-accent" target="_blank" rel="noreferrer">
                library repo
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
