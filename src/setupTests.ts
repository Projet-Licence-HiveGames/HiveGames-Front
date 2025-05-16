import { configure } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

configure({ testIdAttribute: "data-testid" });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
