import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";
import { buildArtifact } from "../dist/build-artifact.js";
import { loadProject } from "../dist/model/load-project.js";

test("builds presentation, poster, and preprint drafts independently and deterministically", async () => {
  const temporaryDirectory = await mkdtemp(
    resolve(tmpdir(), "sab-dissemination-"),
  );
  const projectDirectory = resolve(temporaryDirectory, "project");

  try {
    await cp(resolve("examples/dissemination"), projectDirectory, {
      recursive: true,
    });
    await rm(resolve(projectDirectory, "research/results.md"));
    const project = await loadProject(projectDirectory);

    const earlyPresentationPath = await buildArtifact(project, "research-talk");
    const earlyPresentation = await readFile(earlyPresentationPath, "utf8");
    assert.match(earlyPresentation, /Research question/);
    assert.doesNotMatch(earlyPresentation, /Example observation/);

    await cp(
      resolve("examples/dissemination/research/results.md"),
      resolve(projectDirectory, "research/results.md"),
    );

    for (const artifactId of [
      "research-talk",
      "conference-poster",
      "arxiv-preprint",
    ]) {
      const outputPath = await buildArtifact(project, artifactId);
      const firstBuild = await readFile(outputPath, "utf8");
      await buildArtifact(project, artifactId);
      const secondBuild = await readFile(outputPath, "utf8");
      assert.equal(secondBuild, firstBuild);
    }

    const presentation = await readFile(
      resolve(projectDirectory, "build/research-talk.md"),
      "utf8",
    );
    const poster = await readFile(
      resolve(projectDirectory, "build/conference-poster.md"),
      "utf8",
    );
    const preprint = await readFile(
      resolve(projectDirectory, "build/arxiv-preprint.md"),
      "utf8",
    );

    assert.match(presentation, /Method/);
    assert.doesNotMatch(presentation, /Example observation/);
    assert.match(poster, /Example observation/);
    assert.match(preprint, /Example observation/);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
