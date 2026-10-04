import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";
import { formatHelp, main } from "../dist/cli.js";

test("formatHelp lists the POC commands", () => {
  const help = formatHelp();

  assert.match(help, /sab <command>/);
  assert.match(help, /init/);
  assert.match(help, /validate/);
  assert.match(help, /build/);
  assert.match(help, /presentation, poster, preprint/);
});

test("main accepts help without setting a failure exit code", async () => {
  const originalLog = console.log;
  const messages = [];
  console.log = (message) => messages.push(message);

  try {
    await main(["help"]);
  } finally {
    console.log = originalLog;
  }

  assert.equal(messages.length, 1);
  assert.match(messages[0], /scholar-artifact-builder/);
});

test("main builds a selected artifact from the requested project", async () => {
  const temporaryDirectory = await mkdtemp(resolve(tmpdir(), "sab-cli-"));
  const projectDirectory = resolve(temporaryDirectory, "project");
  const originalLog = console.log;
  const originalExitCode = process.exitCode;
  const messages = [];
  console.log = (message) => messages.push(message);
  process.exitCode = 0;

  try {
    await cp(resolve("examples/dissemination"), projectDirectory, {
      recursive: true,
    });
    await main(["build", "research-talk", "--project", projectDirectory]);

    const output = await readFile(
      resolve(projectDirectory, "build/research-talk.md"),
      "utf8",
    );
    assert.match(output, /Research question/);
    assert.equal(process.exitCode, 0);
    assert.match(messages[0], /Built 'research-talk'/);
  } finally {
    console.log = originalLog;
    process.exitCode = originalExitCode;
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
