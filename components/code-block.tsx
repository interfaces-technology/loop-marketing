export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-panel p-4 text-sm leading-6">
      <code className="font-mono text-[0.9em]">{code}</code>
    </pre>
  );
}
