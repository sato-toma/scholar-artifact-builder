import assert from "node:assert/strict";
import { resolve } from "node:path";
import test from "node:test";
import { loadProject, normalizeProject } from "../dist/model/load-project.js";
import { ProjectConfigError } from "../dist/model/project.js";

test("loads the minimal example into a renderer-independent model", async () => {
  const project = await loadProject(resolve("examples/minimal"));

  assert.equal(project.name, "minimal-research");
  assert.equal(project.artifacts.paper.type, "paper");
  assert.deepEqual(project.artifacts.paper.sections, [
    { id: "research/overview.md", path: "research/overview.md" },
    { id: "research/method.md", path: "research/method.md" },
  ]);
});

test("rejects an artifact section outside the project directory", () => {
  assert.throws(
    () =>
      normalizeProject(
        {
          name: "invalid",
          version: "0.1.0",
          artifacts: {
            paper: { type: "paper", sections: ["../outside.md"] },
          },
        },
        resolve("examples/minimal"),
      ),
    (error) =>
      error instanceof ProjectConfigError &&
      error.diagnostics.some((diagnostic) => diagnostic.code === "SAB107"),
  );
});

test("rejects a non-paper artifact in the POC model", () => {
  assert.throws(
    () =>
      normalizeProject(
        {
          name: "invalid",
          version: "0.1.0",
          artifacts: {
            slides: {
              type: "presentation",
              sections: ["research/overview.md"],
            },
          },
        },
        resolve("examples/minimal"),
      ),
    (error) =>
      error instanceof ProjectConfigError &&
      error.diagnostics.some((diagnostic) => diagnostic.code === "SAB104"),
  );
});
