# scholar-artifact-builder

## Development

The current implementation includes the minimal paper build and experimental
Markdown drafts for an early presentation, a poster, and a preprint:

```text
project.yaml + research/*.md
	  |
	  v
	research model
	  |
	  v
  validation
	  |
	  v
build/paper.md
```

Install dependencies and run the Foundation checks:

```bash
npm install
npm run typecheck
npm test
```

The minimal example project is in `examples/minimal/`. See
[`docs/development-units/00-minimal-poc-slice.md`](docs/development-units/00-minimal-poc-slice.md)
for the current scope and exit criteria.

## Early Dissemination Example

The example in `examples/dissemination/` uses the same research files to build
different drafts. The presentation selects overview and method material, so it
can be built before results are ready. The poster and preprint select results
independently.

```bash
npm run build
node dist/cli.js validate --project examples/dissemination
node dist/cli.js build research-talk --project examples/dissemination
node dist/cli.js build conference-poster --project examples/dissemination
node dist/cli.js build arxiv-preprint --project examples/dissemination
```

These commands create Markdown content drafts under `examples/dissemination/build/`.
The preprint is not an arXiv submission package, and the drafts are not
publication-ready PDF layouts.