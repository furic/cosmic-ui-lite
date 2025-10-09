#!/bin/bash
# Script to manually sync wiki documentation
# Usage: ./scripts/sync-wiki.sh

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WIKI_REPO="$PROJECT_ROOT/cosmic-ui-lite.wiki"

echo "🔄 Starting wiki sync..."

# Check if docs/wiki directory exists
if [ ! -d "$PROJECT_ROOT/docs/wiki" ]; then
    echo "❌ Error: docs/wiki directory not found"
    exit 1
fi

# Clone or update wiki repository
if [ -d "$WIKI_REPO" ]; then
    echo "📦 Updating existing wiki repository..."
    cd "$WIKI_REPO"
    git pull origin master
else
    echo "📦 Cloning wiki repository..."
    cd "$PROJECT_ROOT"
    git clone https://github.com/fuR-Gaming/cosmic-ui-lite.wiki.git
fi

# Copy documentation files
echo "📝 Copying documentation files..."
cp "$PROJECT_ROOT/docs/wiki/wiki-home.md" "$WIKI_REPO/Home.md"
cp "$PROJECT_ROOT/docs/wiki/wiki-installation-setup.md" "$WIKI_REPO/Installation-&-Setup.md"
cp "$PROJECT_ROOT/docs/wiki/wiki-component-reference.md" "$WIKI_REPO/Component-Reference.md"
cp "$PROJECT_ROOT/docs/wiki/wiki-complete-examples.md" "$WIKI_REPO/Complete-Examples.md"
cp "$PROJECT_ROOT/docs/wiki/wiki-troubleshooting.md" "$WIKI_REPO/Troubleshooting.md"
cp "$PROJECT_ROOT/docs/wiki/wiki-architecture-overview.md" "$WIKI_REPO/Architecture-Overview.md"

# Check for changes
cd "$WIKI_REPO"
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to sync"
    exit 0
fi

# Show changes
echo "📊 Changes detected:"
git status --short

# Commit and push
echo "💾 Committing changes..."
git add .

# Get the latest commit message from main repo for context
LATEST_COMMIT=$(cd "$PROJECT_ROOT" && git log -1 --pretty=format:"%s")

git commit -m "Sync wiki documentation

Latest main repo commit: $LATEST_COMMIT

🔄 Manual sync via script"

echo "🚀 Pushing to GitHub..."
git push origin master

echo "✅ Wiki documentation synced successfully!"
echo "📚 View at: https://github.com/fuR-Gaming/cosmic-ui-lite/wiki"
