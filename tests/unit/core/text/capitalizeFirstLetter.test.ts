import { describe, expect, it } from "vitest";
import {
  capitalizeFirstLetter,
  splitStringToArray,
  sortOptions,
} from "@/core/text/capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  it("returns an empty string unchanged", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("capitalizes each hyphenated word", () => {
    expect(capitalizeFirstLetter("background-color")).toBe("Background-Color");
  });
});

describe("splitStringToArray", () => {
  it("splits on spaces and commas, dropping empty parts", () => {
    expect(splitStringToArray("a, b  c")).toEqual(["a", "b", "c"]);
  });
});

describe("sortOptions", () => {
  it("sorts alphabetically", () => {
    expect(sortOptions(["c", "a", "b"])).toEqual(["a", "b", "c"]);
  });
});
