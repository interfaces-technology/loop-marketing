export const LIBRARY_REPO = "https://github.com/interfaces-technology/loop";
export const LAB_ORG = "https://github.com/interfaces-technology";
export const NPM_PACKAGE = "@theinterfaces-lab/loop";
export const MCP_PACKAGE = "@theinterfaces-lab/loop-mcp";
export const MCP_SERVER_NAME = "loop-docs";

const MCP_STDIO_COMMAND = {
  command: "npx",
  args: ["-y", MCP_PACKAGE],
} as const;

const MCP_CURSOR_CONFIG = JSON.stringify(MCP_STDIO_COMMAND);

export const MCP_CURSOR_DEEPLINK = `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(MCP_SERVER_NAME)}&config=${btoa(MCP_CURSOR_CONFIG)}`;

const MCP_VSCODE_CONFIG = JSON.stringify({
  name: MCP_SERVER_NAME,
  ...MCP_STDIO_COMMAND,
});

export const MCP_VSCODE_DEEPLINK = `vscode:mcp/install?${encodeURIComponent(MCP_VSCODE_CONFIG)}`;

export const MCP_CLAUDE_CODE_COMMAND = `claude mcp add ${MCP_SERVER_NAME} -- npx -y ${MCP_PACKAGE}`;

export const MCP_INSTALL_LINKS = [
  { id: "cursor", label: "Add to Cursor", kind: "deeplink", href: MCP_CURSOR_DEEPLINK, primary: true },
  { id: "vscode", label: "Add to VS Code", kind: "deeplink", href: MCP_VSCODE_DEEPLINK },
  {
    id: "claude-code",
    label: "Add to Claude Code",
    kind: "copy",
    copyText: MCP_CLAUDE_CODE_COMMAND,
  },
] as const;

export const MCP_CONFIG = `{
  "mcpServers": {
    "loop-docs": {
      "command": "npx",
      "args": ["-y", "${MCP_PACKAGE}"]
    }
  }
}`;

export const INSTALL_SECTIONS = [
  { id: "npm", label: "npm" },
  { id: "quick-start", label: "Quick start" },
  { id: "browser", label: "Browser" },
  { id: "mcp", label: "AI assistants (MCP)" },
] as const;

export const NAV = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/api", label: "API" },
  { href: "/examples", label: "Examples" },
  { href: "/install", label: "Install" },
  { href: "/about", label: "About" },
] as const;

export const EXAMPLES = [
  {
    slug: "live-text",
    title: "Live text",
    href: "/examples/live-text",
    blurb: "Keyboard text → live mirror on the data path.",
  },
  {
    slug: "dpad-square",
    title: "D-pad square",
    href: "/examples/dpad-square",
    blurb: "A D-pad moves a square — keyboard or gamepad, value Vec.",
  },
  {
    slug: "sliders-cube",
    title: "Sliders cube",
    href: "/examples/sliders-cube",
    blurb: "Sliders rotate a 3D cube — gamepad, MIDI, or on-screen.",
  },
] as const;
