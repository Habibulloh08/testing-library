import { describe, it, expect } from "vitest";
import { add } from "../math";

describe("Math functions", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
