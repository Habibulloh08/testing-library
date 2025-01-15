import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import '@testing-library/jest-dom'; // Jest DOM API

afterEach(() => {
  cleanup();
});
// Object.defineProperty(window, "getComputedStyle", {
//   value: () => ({
//     getPropertyValue: () => "", // kerak bo'lganda qaytaradigan qiymatni o'rnating
//   }),
// });
