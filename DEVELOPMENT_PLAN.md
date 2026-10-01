# scholar-artifact-builder

> A reproducible builder for scholarly artifacts.

Research is rarely contained in a single document.
Ideas, notes, equations, references, source code, datasets, experiments, figures, and computational results are scattered across many files and repositories.

**scholar-artifact-builder** turns those research materials into reproducible scholarly artifacts such as:

* Research papers
* Conference papers
* Academic slides
* Seminar materials
* Posters
* Textbook chapters
* Technical reports
* Web articles
* Research summaries

The core idea is:

```text
Research Materials
        │
        ▼
 Research Model
        │
        ├──────────────┐
        ▼              ▼
   Validation       Generation
        │              │
        └──────┬───────┘
               ▼
      Scholarly Artifacts
               │
      ┌────────┼─────────┐
      ▼        ▼         ▼
    Paper    Slides    Textbook
      │        │         │
      ▼        ▼         ▼
     PDF      PDF       PDF
```

The project is not intended to be an "AI paper writer".

It is intended to be a **research artifact build system**.

---

# 1. Vision

## 1.1 Problem

Research projects often contain:

```text
idea.md
notes/
references/
experiments/
data/
figures/
equations/
source code/
Git repositories/
Jupyter notebooks/
```

but these materials are not necessarily connected.

As a result:

* The same information must be rewritten repeatedly.
* Paper and presentation materials become inconsistent.
* Figures may not have clear provenance.
* Numerical claims may not be connected to their source data.
* References are manually copied.
* Computational results may become outdated.
* Reproducing a paper can be difficult.
* Changing one research result may require manually updating many documents.

## 1.2 Goal

Create a system where a researcher can specify:

```text
Research project
+
sources
+
references
+
data
+
code
+
figures
+
equations
+
research notes
```

and build multiple outputs:

```text
Paper
Conference presentation
Seminar material
Poster
Textbook chapter
Technical report
Web article
```

from the same underlying research information.

## 1.3 Core Principle

The source of truth should be the **research project**, not any particular output format.

Do not make Markdown, LaTeX, or Marp the canonical representation.

Instead:

```text
Research Project
      │
      ▼
Research Model
      │
      ├── LaTeX
      ├── Markdown
      ├── Marp
      ├── HTML
      └── other renderers
```

---

# 2. Core Concepts

## 2.1 Research Project

A research project is the top-level unit.

Example:

```text
projects/
└── step-web-viewer/
```

A project contains research materials and configuration.

## 2.2 Research Material

Research materials include:

* Ideas
* Research questions
* Hypotheses
* Notes
* Literature
* Datasets
* Experimental results
* Source code
* Git repositories
* Figures
* Tables
* Equations
* Computational notebooks
* External resources

## 2.3 Claim

A claim is a statement made by the researcher.

Example:

```text
The proposed method reduces rendering time.
```

Claims should optionally have evidence.

```text
Claim
 ├── experiment
 ├── dataset
 ├── figure
 ├── calculation
 └── reference
```

## 2.4 Evidence

Evidence supports a claim.

Possible evidence:

* Experimental data
* Statistical calculation
* Source code
* Literature
* Dataset
* Figure
* Table
* External document

## 2.5 Artifact

An artifact is a generated research output.

Examples:

```text
paper
conference-paper
presentation
poster
seminar
textbook
technical-report
web-article
research-summary
```

## 2.6 Renderer

A renderer converts the research model into a particular output format.

Examples:

```text
LaTeX Renderer
Markdown Renderer
Marp Renderer
HTML Renderer
PDF Renderer
```

---

# 3. Design Goals

## Must Have

* Reproducible builds
* Source/evidence traceability
* Multiple output formats
* Local-first development
* Git-friendly project structure
* CLI-first architecture
* AI integration without requiring AI for basic builds
* Extensible renderer architecture
* Template support
* Validation
* Build logs

## Should Have

* GitHub integration
* Jupyter integration
* Citation management
* Figure provenance
* Equation management
* Automatic bibliography generation
* Cross-reference validation
* Artifact dependency graph
* Incremental builds

## Could Have

* Web UI
* VS Code extension
* Visual research graph
* AI research assistant
* Automated literature analysis
* Experiment execution
* Dataset versioning
* Remote build services

---

# 4. Repository Structure

Initial repository:

```text
scholar-artifact-builder/
│
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── DEVELOPMENT_PLAN.md
├── CHANGELOG.md
│
├── docs/
│   ├── architecture/
│   ├── concepts/
│   ├── guides/
│   ├── specifications/
│   └── examples/
│
├── examples/
│   ├── minimal/
│   ├── paper/
│   ├── presentation/
│   └── textbook/
│
├── packages/
│   ├── core/
│   ├── model/
│   ├── parser/
│   ├── validator/
│   ├── builder/
│   ├── renderer/
│   ├── citations/
│   ├── provenance/
│   ├── templates/
│   ├── ai/
│   └── cli/
│
├── templates/
│   ├── paper/
│   ├── presentation/
│   ├── poster/
│   ├── textbook/
│   └── report/
│
├── schemas/
│   ├── project.schema.json
│   ├── artifact.schema.json
│   ├── claim.schema.json
│   └── source.schema.json
│
├── scripts/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── fixtures/
│   └── snapshots/
│
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── package.json
├── tsconfig.json
└── ...
```

The exact package structure may change during implementation.

---

# 5. Initial Technology Direction

The initial implementation should prioritize:

```text
TypeScript
Node.js
```

because the project is fundamentally a document/data transformation pipeline and should be easy to run on Windows, Linux, and macOS.

Potential external tools:

```text
Pandoc
LaTeX
Marp
Mermaid
Graphviz
Jupyter
Git
```

These should be treated as optional adapters rather than hard-coded assumptions.

---

# 6. Project Structure for Users

A generated research project could look like:

```text
my-research/
│
├── project.yaml
│
├── research/
│   ├── overview.md
│   ├── questions.md
│   ├── hypotheses.md
│   ├── claims/
│   └── notes/
│
├── sources/
│   ├── papers/
│   ├── books/
│   ├── websites/
│   └── datasets/
│
├── experiments/
│   ├── experiment-001/
│   └── experiment-002/
│
├── calculations/
│
├── data/
│
├── code/
│
├── figures/
│
├── tables/
│
├── equations/
│
├── artifacts/
│   ├── paper.yaml
│   ├── presentation.yaml
│   └── textbook.yaml
│
├── templates/
│
└── build/
```

---

# 7. Project Configuration

Example:

```yaml
name: step-web-viewer
version: 0.1.0

language: en

sources:
  - research/
  - sources/
  - experiments/
  - figures/
  - equations/

artifacts:

  paper:
    type: paper
    template: generic-academic
    renderer: latex
    output: build/paper.pdf

  presentation:
    type: presentation
    renderer: marp
    output: build/presentation.pdf

  textbook:
    type: textbook
    renderer: latex
    output: build/textbook.pdf
```

The configuration format should remain simple and human-readable.

---

# 8. Artifact Definition

Example:

```yaml
id: paper

type: paper

title: Web-Based STEP Visualization

authors:
  - name: Example Author

sections:

  - introduction

  - related-work

  - method

  - experiment

  - results

  - discussion

  - conclusion

references:
  style: ieee

renderer:
  type: latex
  template: generic-academic
```

---

# 9. Research Model

The internal research model should eventually represent:

```text
Project
 │
 ├── ResearchQuestion
 ├── Hypothesis
 ├── Claim
 │    └── Evidence
 │
 ├── Source
 │
 ├── Experiment
 │    ├── Dataset
 │    ├── Parameters
 │    ├── Code
 │    └── Result
 │
 ├── Figure
 ├── Table
 ├── Equation
 └── Artifact
```

This model should be independent of:

* Markdown
* LaTeX
* Marp
* HTML
* PDF

---

# 10. Claim and Evidence System

A major feature should be traceability.

Example:

```yaml
id: claim-rendering-performance

text: |
  The proposed renderer reduces rendering time.

evidence:

  - type: experiment
    id: experiment-003

  - type: figure
    id: figure-05

  - type: dataset
    id: benchmark-2026-01
```

The system should be able to answer:

```text
Where did this claim come from?
```

and:

```text
Which generated documents contain this claim?
```

---

# 11. Provenance

Every generated artifact should optionally contain provenance.

Example:

```text
Artifact
  ↓
Section
  ↓
Claim
  ↓
Evidence
  ↓
Experiment
  ↓
Code
  ↓
Git commit
```

The system should support provenance information such as:

```text
source file
source location
Git repository
Git commit
dataset version
experiment ID
generation timestamp
builder version
template version
```

---

# 12. Citation Management

Initial goals:

* BibTeX support
* DOI support
* URL references
* Citation keys
* Citation validation
* Unused reference detection
* Missing reference detection

Example:

```text
references/
├── references.bib
└── metadata/
```

Future support:

* CSL
* Crossref
* OpenAlex
* arXiv
* Semantic Scholar

External services should be optional.

---

# 13. Equation System

Equations should have stable identifiers.

Example:

```yaml
id: equation-attention

latex: |
  Attention(Q,K,V) =
  softmax(QK^T / sqrt(d_k))V

description: |
  Standard scaled dot-product attention.
```

Artifacts can reference:

```text
equation-attention
```

and render it appropriately.

---

# 14. Figure System

Figures should have metadata.

Example:

```yaml
id: architecture

source:
  type: svg
  path: figures/architecture.svg

caption: |
  Architecture of the proposed system.

generated_by:
  type: mermaid
  source: figures/architecture.mmd
```

Potential future support:

```text
Mermaid
Graphviz
PlantUML
Python
Jupyter
SVG
PNG
PDF
TikZ
```

---

# 15. Table System

Tables should ideally have structured sources.

Example:

```text
CSV
 ↓
Table definition
 ↓
Markdown
 ↓
LaTeX
 ↓
HTML
```

This avoids manually copying experimental results into documents.

---

# 16. Experiment System

An experiment should contain:

```text
experiment-001/
├── experiment.yaml
├── input/
├── scripts/
├── output/
├── figures/
└── logs/
```

Example:

```yaml
id: experiment-001

name: Rendering benchmark

code:
  repository: ./code/benchmark

dataset:
  path: ./data/benchmark.csv

command:
  - npm
  - run
  - benchmark
```

Future support:

* Python
* Node.js
* C#
* Jupyter
* Docker
* GitHub Actions

---

# 17. Build System

Basic command:

```bash
sab build
```

Specific artifact:

```bash
sab build paper
```

Multiple artifacts:

```bash
sab build paper presentation textbook
```

Clean:

```bash
sab clean
```

Validate:

```bash
sab validate
```

Inspect:

```bash
sab inspect
```

Show dependencies:

```bash
sab graph
```

Initialize:

```bash
sab init
```

---

# 18. CLI

Initial command design:

```text
sab init
sab validate
sab build
sab clean
sab inspect
sab graph
sab source
sab artifact
sab experiment
sab template
sab doctor
```

Example:

```bash
sab init my-research
```

```bash
sab artifact add paper
```

```bash
sab build paper
```

```bash
sab validate
```

```bash
sab doctor
```

`doctor` checks external dependencies:

```text
✓ Node.js
✓ Git
✓ Pandoc
✓ LaTeX
✓ Marp
⚠ Mermaid
```

---

# 19. Renderer Architecture

Renderers should implement a common interface.

Conceptually:

```text
Artifact
   ↓
Renderer
   ↓
Intermediate Representation
   ↓
Output
```

Potential renderers:

```text
LatexRenderer
MarkdownRenderer
MarpRenderer
HtmlRenderer
```

Future:

```text
DocxRenderer
PptxRenderer
EpubRenderer
JupyterRenderer
```

---

# 20. Template System

Templates should be independent from the core builder.

Example:

```text
templates/
├── paper/
│   ├── generic/
│   ├── ieee/
│   ├── acm/
│   └── springer/
│
├── presentation/
│   ├── generic/
│   └── academic/
│
├── textbook/
│   └── generic/
│
└── poster/
    └── academic/
```

Templates should define:

* Layout
* Metadata
* Sections
* Bibliography style
* Figure style
* Table style
* Page settings

---

# 21. AI Integration

AI should be an optional layer.

Basic building must work without AI.

```text
                 ┌── OpenAI
                 ├── Gemini
                 ├── Local model
                 └── Other provider
                       │
Research Model ────────┤
                       ▼
                 AI Services
```

AI features may include:

### Research organization

```text
notes → topics
notes → claims
notes → research questions
```

### Draft generation

```text
research model → section draft
```

### Summarization

```text
paper → summary
```

### Literature analysis

```text
references → related work
```

### Consistency checking

```text
claim ↔ evidence
```

### Educational transformation

```text
research → beginner explanation
```

AI-generated content must remain traceable.

---

# 22. AI Safety / Reliability

AI should not silently invent:

* Experimental results
* References
* Numerical values
* Equations
* Citations
* Dataset properties
* Experimental conditions

Generated statements should ideally be classified as:

```text
SOURCE
DERIVED
GENERATED
UNVERIFIED
```

Example:

```text
[SOURCE]
Directly supported by source material.

[DERIVED]
Calculated from existing data.

[GENERATED]
Created by AI from available material.

[UNVERIFIED]
Requires human verification.
```

---

# 23. Validation System

Validation should be a first-class feature.

Example:

```bash
sab validate
```

Checks:

```text
✓ Project configuration
✓ Missing files
✓ Missing references
✓ Broken citations
✓ Broken figure references
✓ Broken equation references
✓ Broken cross references
✓ Missing evidence
✓ Duplicate IDs
✓ Invalid metadata
✓ Artifact configuration
```

Future checks:

```text
⚠ Claim has no evidence
⚠ Number differs from source dataset
⚠ Figure generated from outdated data
⚠ Reference appears to be incomplete
⚠ Generated section contains unsupported claims
```

---

# 24. Static Analysis for Research

A long-term goal is to build a research equivalent of a compiler/static analyzer.

Potential diagnostics:

```text
SAB001 Missing citation
SAB002 Unsupported claim
SAB003 Broken reference
SAB004 Missing figure
SAB005 Missing equation
SAB006 Data-source mismatch
SAB007 Stale experiment
SAB008 Unused reference
SAB009 Duplicate identifier
SAB010 Artifact dependency cycle
```

This is one of the core differentiators of the project.

---

# 25. Dependency Graph

The builder should maintain a graph.

Example:

```text
experiment-001
       │
       ├── result.csv
       │
       ├── figure-01
       │
       └── claim-01
              │
              ├── paper
              └── presentation
```

If:

```text
result.csv
```

changes, the builder should know which artifacts may need rebuilding.

---

# 26. Incremental Build

Future build system:

```text
source changed
      ↓
dependency graph
      ↓
affected nodes
      ↓
rebuild only affected artifacts
```

Similar concepts:

* Make
* Ninja
* MSBuild
* Bazel
* GitHub Actions

but applied to scholarly artifacts.

---

# 27. Reproducible Build

A build should record:

```text
Builder version
Template version
Input files
Git commit
External tools
Environment
Generation timestamp
```

Example:

```text
build/
└── manifest.json
```

```json
{
  "builderVersion": "0.1.0",
  "gitCommit": "abc123",
  "template": "generic-academic",
  "renderer": "latex"
}
```

---

# 28. GitHub Integration

Future functionality:

```bash
sab github import owner/repository
```

Possible uses:

* Import source code
* Read README
* Detect experiments
* Detect figures
* Detect documentation
* Track commit
* Attach repository as evidence

GitHub should remain an optional source.

---

# 29. CI/CD

Example GitHub Actions workflow:

```text
push
 ↓
sab validate
 ↓
sab build
 ↓
PDF generation
 ↓
artifact upload
```

Possible workflow:

```yaml
name: Build Research Artifacts

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - run: npm install

      - run: npx sab validate

      - run: npx sab build

      - uses: actions/upload-artifact@v4
```

---

# 30. Web UI

Not part of the first MVP.

Possible future UI:

```text
Research Project
│
├── Sources
├── Claims
├── Evidence
├── Experiments
├── Figures
├── Equations
│
└── Artifacts
      ├── Paper
      ├── Slides
      ├── Poster
      └── Textbook
```

Potential visualizations:

* Research graph
* Claim/evidence graph
* Artifact dependency graph
* Citation graph
* Experiment graph

---

# 31. VS Code Extension

Future extension:

```text
scholar-artifact-builder
```

Features:

* Project explorer
* Claim navigation
* Evidence navigation
* Citation completion
* Artifact preview
* Build command
* Validation diagnostics
* Figure preview
* Equation preview

---

# 32. MCP Integration

Future MCP support could expose research projects to AI tools.

Potential operations:

```text
list_sources
search_sources
get_claim
get_evidence
get_experiment
get_figure
get_equation
build_artifact
validate_project
inspect_provenance
```

This would allow an AI agent to work against the structured research project rather than blindly reading files.

---

# 33. Local-First Architecture

The project should work without a hosted service.

Preferred model:

```text
Local files
   +
Git
   +
Local build tools
   +
Optional AI provider
```

No mandatory cloud backend.

Cloud services should be optional adapters.

---

# 34. Privacy

Research materials may contain unpublished research.

Therefore:

* Local-first by default
* Do not upload files without explicit configuration
* AI providers must be configurable
* External network access should be visible
* Build logs should not accidentally expose secrets
* API keys must never enter generated artifacts
* `.env` and credentials should be excluded from builds

---

# 35. MVP

The first MVP should be intentionally small.

## MVP-1

Implement:

```text
✓ Project initialization
✓ project.yaml
✓ Markdown research sources
✓ Artifact definition
✓ Basic research model
✓ Validation
✓ Markdown renderer
✓ LaTeX renderer
✓ PDF build
✓ Basic references
✓ Figures
✓ CLI
```

Example:

```bash
sab init
sab validate
sab build paper
```

Output:

```text
build/
└── paper.pdf
```

## MVP-2

Add:

```text
✓ Marp renderer
✓ Presentation artifacts
✓ Multiple artifact targets
✓ Templates
✓ Citation handling
✓ Build manifest
```

Example:

```bash
sab build paper presentation
```

Output:

```text
build/
├── paper.pdf
└── presentation.pdf
```

## MVP-3

Add:

```text
✓ Claim/evidence model
✓ Provenance
✓ Dependency graph
✓ Experiment metadata
✓ Incremental build
✓ Static analysis
```

## MVP-4

Add:

```text
✓ AI adapter
✓ AI-assisted organization
✓ AI-assisted drafting
✓ AI validation
✓ Literature analysis
```

## MVP-5

Add:

```text
✓ GitHub integration
✓ Jupyter integration
✓ VS Code extension
✓ MCP server
```

---

# 36. Suggested Development Phases

## Phase 0 — Specification

Goal:

Define the domain model.

Deliverables:

```text
project schema
artifact schema
claim schema
source schema
experiment schema
architecture document
```

No AI.

---

## Phase 1 — CLI Skeleton

Implement:

```text
sab init
sab validate
sab build
sab clean
sab doctor
```

---

## Phase 2 — Basic Builder

Implement:

```text
Markdown
    ↓
Research Model
    ↓
LaTeX
    ↓
PDF
```

---

## Phase 3 — Multiple Artifacts

Implement:

```text
Paper
Presentation
Report
```

with:

```text
LaTeX
Marp
Markdown
```

---

## Phase 4 — Provenance

Implement:

```text
Claim
Evidence
Source
Experiment
Figure
Equation
```

and relationships between them.

---

## Phase 5 — Static Analysis

Implement:

```text
SAB001 ...
SAB002 ...
```

diagnostics.

---

## Phase 6 — Reproducibility

Implement:

```text
Build manifest
Dependency graph
Incremental build
Git commit tracking
```

---

## Phase 7 — AI

Add AI adapters only after the deterministic pipeline works.

---

## Phase 8 — Integrations

Add:

```text
GitHub
Jupyter
VS Code
MCP
```

---

# 37. Non-Goals

The project should initially avoid becoming:

* A general-purpose word processor
* A full reference manager
* A general AI chatbot
* A cloud collaboration platform
* A replacement for LaTeX
* A replacement for Git
* A replacement for Jupyter
* A publisher submission system

The project should orchestrate these tools rather than replace them.

---

# 38. Example End-to-End Workflow

Researcher starts:

```bash
sab init my-research
```

Adds:

```text
research/
sources/
data/
code/
figures/
equations/
```

Defines:

```text
paper
presentation
textbook
```

Runs:

```bash
sab validate
```

Then:

```bash
sab build
```

The system performs:

```text
Load project
    ↓
Parse research materials
    ↓
Build research model
    ↓
Resolve references
    ↓
Resolve figures
    ↓
Resolve equations
    ↓
Resolve claims/evidence
    ↓
Validate
    ↓
Generate artifact representation
    ↓
Render
    ↓
Generate PDF
    ↓
Generate build manifest
```

Result:

```text
build/
├── paper.pdf
├── presentation.pdf
├── textbook.pdf
└── manifest.json
```

---

# 39. Long-Term Vision

The long-term goal is:

```text
                    Research Project
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
      Sources            Data               Code
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    Research Model
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          Claims       Experiments    References
             │             │             │
             └─────────────┼─────────────┘
                           │
                  Validation / Analysis
                           │
                           ▼
                 Artifact Builder
                           │
       ┌──────────┬────────┼────────┬──────────┐
       ▼          ▼        ▼        ▼          ▼
     Paper      Slides   Poster   Textbook    Web
       │          │        │        │          │
       └──────────┴────────┴────────┴──────────┘
                           │
                           ▼
                 Reproducible Outputs
```

The system should make it possible to say:

> **"This entire paper can be rebuilt from the research project."**

and eventually:

> **"Every important statement in this artifact can be traced back to its source, experiment, calculation, or reference."**

That principle should guide architectural decisions throughout the project.

---

# 40. First Implementation Milestone

The first practical milestone is intentionally narrow: build one complete,
deterministic paper from local Markdown sources.

## Input

```text
my-research/
├── project.yaml
├── research/
│   ├── overview.md
│   ├── method.md
│   └── results.md
├── references/
│   └── references.bib
└── figures/
  └── result.png
```

## Command

```bash
sab validate
sab build paper
```

## Output

```text
my-research/build/
├── paper.pdf
└── manifest.json
```

## Acceptance Criteria

The milestone is complete when:

* `sab init` creates a valid project skeleton.
* `sab validate` reports configuration and reference errors with file paths.
* `sab build paper` works without an AI provider.
* The same inputs produce the same document content across repeated builds.
* Markdown sections, citations, and figures appear in the generated PDF.
* The build manifest records the builder version, input files, renderer, and build time.
* Unit and integration tests run on Windows, Linux, and macOS in CI.

This milestone does not include claims, experiments, incremental builds, AI,
or external repository integrations. Those features must not block the first
deterministic pipeline.

---

# 41. Execution Roadmap

This section turns the architectural direction above into an implementation
sequence. Each phase should produce a usable, testable result before the next
phase begins.

## Phase 0 — Repository and Specification

**Goal:** establish the project contract before implementing behavior.

**Deliverables:**

* TypeScript and Node.js package configuration.
* Monorepo boundaries for `model`, `parser`, `validator`, `builder`, `renderer`, and `cli`.
* JSON Schemas for `project`, `artifact`, `source`, and `claim`.
* Architecture decision record for YAML parsing, CLI framework, logging, and PDF generation.
* Minimal example project used by integration tests.

**Exit criteria:** schemas validate the example project, and the repository has
working format, lint, type-check, and test commands.

## Phase 1 — Project Model and CLI Foundation

**Goal:** load a project and provide useful command-line feedback.

**Deliverables:**

* `sab init <directory>`.
* `sab validate` for YAML parsing, schema validation, duplicate IDs, and missing files.
* `sab inspect` for a human-readable project summary.
* `sab clean` for generated output only.
* `sab doctor` for Node.js, Git, and optional renderer dependencies.
* Stable error codes and non-zero exit codes on failure.

**Exit criteria:** a newly initialized project can be validated from a clean
checkout, and invalid fixtures produce deterministic diagnostics.

## Phase 2 — Deterministic Paper Pipeline

**Goal:** deliver the first complete artifact build.

**Deliverables:**

* Parsers for project configuration, artifact definitions, Markdown, BibTeX, and figure metadata.
* A format-independent research model and intermediate representation.
* Markdown renderer for debugging and snapshot tests.
* LaTeX renderer and PDF adapter.
* `sab build paper` with clear build logs.
* Build manifest containing input paths, renderer, template, versions, and timestamps.

**Exit criteria:** the First Implementation Milestone acceptance criteria pass
for the example project, including repeated-build and missing-input tests.

## Phase 3 — Multiple Artifacts and Templates

**Goal:** reuse the same research model for more than one output.

**Deliverables:**

* Presentation and technical-report artifact types.
* Marp renderer and Markdown-based presentation output.
* Template loading and template versioning.
* `sab build paper presentation report`.
* Cross-renderer snapshot and integration tests.

**Exit criteria:** one source project builds at least two distinct artifacts
without duplicating research content.

## Phase 4 — Traceability and Research Metadata

**Goal:** make important statements and assets traceable.

**Deliverables:**

* Claims, evidence, sources, experiments, figures, tables, and equations.
* Stable IDs and reference resolution across all entities.
* Provenance records from artifact sections to source files and Git commits.
* `sab inspect --claim <id>` and `sab inspect --provenance <id>`.
* Diagnostics for missing evidence and broken relationships.

**Exit criteria:** a claim can be traced to its evidence, and an artifact can
be queried to show the claims and sources it contains.

## Phase 5 — Static Analysis and Dependency Graph

**Goal:** detect research-specific inconsistencies before rendering.

**Deliverables:**

* SAB diagnostic codes, severity levels, and machine-readable output.
* Checks for unsupported claims, missing citations, stale data, and duplicate IDs.
* Dependency graph for sources, experiments, claims, and artifacts.
* `sab graph` in text and JSON formats.

**Exit criteria:** representative invalid fixtures produce actionable
diagnostics, and dependency cycles are rejected before a build starts.

## Phase 6 - Reproducibility and Incremental Builds

**Goal:** make rebuilds auditable and efficient.

**Deliverables:**

* Content-based input fingerprints.
* Incremental rebuild decisions based on the dependency graph.
* Git commit and external-tool version capture.
* Reproducibility checks and manifest comparison.
* CI workflow that validates and builds the example project.

**Exit criteria:** unchanged inputs are not rebuilt, changed inputs rebuild
only affected artifacts, and the manifest explains every build decision.

## Phase 7 - Optional AI Adapters

**Goal:** add assistance without making AI part of the build contract.

**Deliverables:**

* Provider-neutral AI adapter interface.
* Explicit opt-in configuration and network access reporting.
* Source, derived, generated, and unverified content labels.
* Human review checkpoints for generated claims, references, equations, and numbers.
* Tests proving deterministic builds work with AI disabled.

**Exit criteria:** AI can assist with organization or drafting, but cannot
silently modify validated source data or enter the deterministic build path.

## Phase 8 - External Integrations

**Goal:** connect the local builder to common research tools.

**Deliverables:**

* Optional GitHub and Jupyter adapters.
* VS Code extension backed by the CLI.
* MCP server exposing read, validate, inspect, and build operations.
* Documentation for credentials, privacy, and network access.

**Exit criteria:** integrations remain optional, local projects remain fully
usable offline, and no integration is required by the core test suite.

---

# 42. Development Rules

* Keep the core build deterministic and usable without AI or network access.
* Keep the research model independent from Markdown, LaTeX, Marp, HTML, and PDF.
* Treat external tools as adapters and report missing tools clearly.
* Prefer stable IDs and structured metadata over filename conventions.
* Write a failing test before adding a new validation rule or renderer behavior.
* Keep generated files under `build/`; never modify research sources during a build.
* Preserve source locations and provenance whenever content is transformed.
* Add a user-facing example for every new public CLI command.
* Do not expand the MVP to include a web UI, cloud backend, or general-purpose editor.


# 43. Initial Backlog

The first implementation backlog should be completed in this order:

1. Create the TypeScript/Node.js workspace and package scripts.
2. Define the project and artifact schemas.
3. Implement project loading and `sab init`.
4. Implement schema validation and diagnostic formatting.
5. Add the example project and validation fixtures.
6. Build the format-independent research model.
7. Parse Markdown and references.
8. Implement the Markdown renderer.
9. Implement the LaTeX renderer and PDF adapter.
10. Generate the build manifest and build logs.
11. Add CI for type-checking, tests, validation, and the example build.
12. Document the end-to-end workflow in `README.md`.

The backlog should be revised only when implementation evidence changes the
architecture. New features should be added to a later phase unless they are
required to satisfy the First Implementation Milestone.
