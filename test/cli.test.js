import assert from "node:assert/strict";
import test from "node:test";
import { formatHelp, main } from "../dist/cli.js";

test("formatHelp lists the POC commands", () => {
  const help = formatHelp();

  assert.match(help, /sab <command>/);
  assert.match(help, /init/);
  assert.match(help, /validate/);
  assert.match(help, /build/);
});

test("main accepts help without setting a failure exit code", () => {
  const originalLog = console.log;
  const messages = [];
  console.log = (message) => messages.push(message);

  try {
    main(["help"]);
  } finally {
    console.log = originalLog;
  }

  assert.equal(messages.length, 1);
  assert.match(messages[0], /scholar-artifact-builder/);
});
