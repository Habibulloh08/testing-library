/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    reporters: ["verbose"],
    css: true,
    testTimeout: 5000,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      all: true,
      include: ["src/__test__/**/*.tsx"],
      exclude: [
        "src/**/node_modules/**",
        "src/components/NotTestedComponent.tsx",
      ],
      thresholds: {
        statements: 80, // Statements coverage
        global: {
          statements: 80,
          branches: 75,
          functions: 80,
          lines: 80,
        }, // Butun loyiha uchun global coverage 80% bo'lishi kerak
        branches: 75, // Branches coverage
        functions: 80, // Functions coverage
        lines: 80, // Lines coverage
      },
      enabled: true, // Coverage ni faollashtirish
    },
  },
});
