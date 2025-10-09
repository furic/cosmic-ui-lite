# Scripts

Utility scripts for Cosmic UI Lite development and maintenance.

## sync-wiki.sh

Manually sync documentation from `docs/wiki/` to the GitHub wiki repository.

### Usage

```bash
# Via npm script (recommended)
npm run sync-wiki

# Or directly
./scripts/sync-wiki.sh
```

### What it does

1. Clones or updates the wiki repository (`cosmic-ui-lite.wiki`)
2. Copies all documentation files from `docs/wiki/` to the wiki repo
3. Commits and pushes changes to GitHub

### File Mapping

| Source File | Wiki Page |
|-------------|-----------|
| `wiki-home.md` | `Home.md` |
| `wiki-installation-setup.md` | `Installation-&-Setup.md` |
| `wiki-component-reference.md` | `Component-Reference.md` |
| `wiki-complete-examples.md` | `Complete-Examples.md` |
| `wiki-troubleshooting.md` | `Troubleshooting.md` |
| `wiki-architecture-overview.md` | `Architecture-Overview.md` |

### Automatic Sync

Wiki documentation is automatically synced via GitHub Actions when:
- Changes are pushed to `docs/wiki/` on the `main` branch
- Workflow can also be triggered manually from GitHub Actions tab

See `.github/workflows/sync-wiki.yml` for the automation workflow.
