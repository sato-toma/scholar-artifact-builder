# scholar-artifact-builder

## Development

The current implementation target is the minimal Markdown POC:

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