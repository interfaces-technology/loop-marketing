import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { McpInstallButtons } from "@/components/mcp-install-buttons";
import {
  Arrow,
  ExampleCard,
  Eyebrow,
  primaryActionClass,
  secondaryActionClass,
} from "@/components/ui";
import { EXAMPLES, MCP_PACKAGE, NPM_PACKAGE } from "@/lib/site";

const INSTALL = `npm install ${NPM_PACKAGE}`;

const PIPELINE = [
  { id: "01", type: "source", label: "dpad", detail: "read()" },
  { id: "02", type: "wire", label: "value.vec", detail: "{ x, y }" },
  { id: "03", type: "sink", label: "element", detail: "render()" },
] as const;

export default function HomePage() {
  return (
    <div className="-my-10 sm:-my-16">
      <section className="grid min-h-[calc(100svh-3.6rem)] border-b border-border lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center py-16 lg:border-r lg:border-border lg:pr-12">
          <Eyebrow>Normalized I/O runtime</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-5xl font-medium tracking-[-0.06em] text-balance sm:text-7xl lg:text-[5.25rem] lg:leading-[0.96]">
            Loop is
            <br />
            the <span className="text-accent">wire.</span>
            <span className="terminal-cursor" aria-hidden="true" />
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            Connect any input to any output through one tiny, normalized packet contract.
            No framework. No renderer. No cloud.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/install" className={primaryActionClass}>
              Install Loop <Arrow />
            </Link>
            <Link href="/docs" className={secondaryActionClass}>
              Read the spec
            </Link>
          </div>
          <div className="mt-10 max-w-xl">
            <CodeBlock code={INSTALL} label="quick install" prompt />
          </div>
        </div>

        <div className="flex items-center py-12 lg:pl-12">
          <div className="w-full border border-border bg-panel">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[0.65rem] tracking-[0.12em] uppercase">
              <span className="text-muted">pipeline.loop</span>
              <span className="flex items-center gap-2 text-signal">
                <span className="h-1.5 w-1.5 bg-signal" />
                Live
              </span>
            </div>
            <div className="p-5 sm:p-8">
              {PIPELINE.map((node, index) => (
                <div key={node.id}>
                  <div className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border border-border bg-background p-4">
                    <span className="font-mono text-[0.65rem] text-subtle">{node.id}</span>
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-[0.12em] text-accent uppercase">
                        {node.type}
                      </p>
                      <p className="mt-1 text-lg font-medium">{node.label}</p>
                    </div>
                    <code className="font-mono text-xs text-muted">{node.detail}</code>
                  </div>
                  {index < PIPELINE.length - 1 ? (
                    <div className="ml-8 h-10 w-px bg-border">
                      <div className="signal-line h-full w-px" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 border-t border-border font-mono text-[0.62rem] tracking-[0.1em] text-muted uppercase">
              <span className="p-3 text-center">offline</span>
              <span className="border-x border-border p-3 text-center">typed</span>
              <span className="p-3 text-center">tiny core</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Executable ideas</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              See the wire in motion.
            </h2>
          </div>
          <Link href="/examples" className="font-mono text-xs text-muted hover:text-accent">
            View all examples <Arrow />
          </Link>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-3">
        {EXAMPLES.map((example) => (
          <ExampleCard
            key={example.slug}
            href={example.href}
            title={example.title}
            blurb={example.blurb}
            index={EXAMPLES.indexOf(example)}
          />
        ))}
        </div>
      </section>

      <section className="grid border-b border-border py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Built to disappear</Eyebrow>
          <h2 className="mt-4 max-w-lg text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
            Own both ends. Standardize the space between.
          </h2>
        </div>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:mt-0">
          {[
            ["01", "One packet contract", "Value, frame, or typed data. Nothing more."],
            ["02", "Framework free", "Bind Loop handles to elements you already own."],
            ["03", "Same-device first", "Runs locally in one tab and works offline."],
            ["04", "Input agnostic", "Keyboard, gamepad, MIDI, or your own source."],
          ].map(([index, title, description]) => (
            <div key={index} className="bg-panel p-5">
              <p className="font-mono text-[0.65rem] text-accent">[{index}]</p>
              <h3 className="mt-8 font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Eyebrow>Loop docs in your agent</Eyebrow>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
            Give your tools the spec.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Add <code className="font-mono text-foreground">{MCP_PACKAGE}</code> to Cursor,
            Claude Code, or VS Code for direct access to the spec, README, and examples.
          </p>
        </div>
        <McpInstallButtons />
      </section>
    </div>
  );
}
