export const LIBRARY_REPO = "https://github.com/interfaces-technology/loop";
export const LAB_ORG = "https://github.com/interfaces-technology";
export const NPM_PACKAGE = "@theinterfaces-lab/loop";

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
