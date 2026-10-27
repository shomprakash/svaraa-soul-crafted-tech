// @ts-ignore bun provides this module when running `bun test`
import { describe, expect, test } from "bun:test";
import { credentialsMatch } from "./cms-auth.server";
import { defaultContent, resolveContent } from "./site-content";

describe("editor sign-in", () => {
  test("accepts the configured user ID and password", () => {
    expect(credentialsMatch("enomis", "SimoneBhogal@2026", "enomis", "SimoneBhogal@2026")).toBe(true);
  });
  test("rejects a wrong password", () => {
    expect(credentialsMatch("enomis", "simonebhogal@2026", "enomis", "SimoneBhogal@2026")).toBe(false);
  });
  test("rejects a wrong user ID", () => {
    expect(credentialsMatch("simone", "SimoneBhogal@2026", "enomis", "SimoneBhogal@2026")).toBe(false);
  });
  test("never matches when credentials are not configured", () => {
    expect(credentialsMatch("", "", undefined, undefined)).toBe(false);
  });
});

describe("homepage text", () => {
  test("saved text replaces the original on the live page", () => {
    expect(resolveContent({ "hero.heading": "A new headline" })["hero.heading"]).toBe("A new headline");
  });
  test("blank saved text falls back to the original", () => {
    expect(resolveContent({ "hero.heading": "   " })["hero.heading"]).toBe("Wear the stillness you seek");
  });
  test("unknown entries are ignored", () => {
    expect(resolveContent({ "not.a.field": "x" })["not.a.field"]).toBeUndefined();
  });
  test("with nothing saved the page shows the originals", () => {
    expect(resolveContent({})).toEqual(defaultContent);
  });
});
