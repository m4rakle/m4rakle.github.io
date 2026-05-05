# Personal Website Handoff

Last updated: 2026-05-05

## Project

This repository is the GitHub Pages user site for:

- Live site: https://m4rakle.github.io/
- GitHub repo: https://github.com/m4rakle/m4rakle.github.io
- Publishing branch: `master`
- Publishing source: repository root

The site is intentionally static HTML/CSS with no build step. GitHub Pages serves the checked-in files directly.

## Local Move Notes

The checkout can be moved anywhere on the machine with a normal directory move:

```bash
mv /old/path/m4rakle.github.io /new/path/m4rakle.github.io
cd /new/path/m4rakle.github.io
git status --short --branch
git remote -v
```

No repo config needs to change just because the local directory moves. The important remote should remain:

```text
origin  https://github.com/m4rakle/m4rakle.github.io.git
```

If opening this repo in Codex after moving it, start Codex from the new checkout path so file edits and local server checks use the new location.

## Current Site Shape

Active pages:

- `index.html`: homepage
- `blog/2016-03-15-asus-z97-bios-splash-screen.html`: imported Blogger post
- `blog/2015-03-10-logitech-t650-tap-click.html`: imported Blogger post

Active assets:

- `favicon.svg`: simple `YD` icon
- `stylesheets/stylesheet.css`: screen styles
- `stylesheets/print.css`: print styles
- `javascripts/main.js`: placeholder for future small interactions

Important intentional behavior:

- `/blog/` is intentionally removed and should return `404`.
- The homepage lists the full current post list directly.
- `Resume.pdf` was removed from the repo and should not be reintroduced without an explicit request.
- Imported Blogger posts show: `Legacy post from my Blogger.` with `my Blogger` linking to `https://m4rakle.blogspot.com/`.

There are old theme files and image assets still present from the original GitHub Pages theme. They are not active in the current site. They can be cleaned up later if desired, but do not delete them casually in unrelated edits.

## Current Homepage Copy

Keep the homepage terse unless explicitly asked otherwise:

```text
Yang Du
I'm currently a Senior Software Engineer at Google focused on data and ML infrastructure.
```

The homepage should show only the short identity block, three social icons, and the post list.

Social links:

- X: https://x.com/M4rakle
- LinkedIn: https://www.linkedin.com/in/yondu/
- GitHub: https://github.com/m4rakle

## Adding A New Post

1. Create a new HTML file under `blog/`, preferably:

```text
blog/YYYY-MM-DD-short-slug.html
```

2. Use one of the existing blog HTML files as a template.
3. Add the post to the homepage list in `index.html`.
4. Verify locally:

```bash
python3 -m http.server 8976 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8976/
```

Also open the new post URL directly.

5. Commit and push:

```bash
git add .
git commit -m "Add <post title>"
git push origin master
```

6. Check GitHub Pages deployment:

```bash
gh run list --repo m4rakle/m4rakle.github.io --limit 3
```

7. Verify live with a cache-busted URL:

```text
https://m4rakle.github.io/?v=<commit-sha>
```

## Validation Checklist

Before pushing site changes:

```bash
git diff --check
node --check javascripts/main.js
```

For visual changes, verify in a browser, not just with `curl`. At minimum check:

- Homepage
- One imported Blogger post
- Any newly edited or added page

After pushing:

- Wait for the GitHub Pages build to complete.
- Verify the changed live URL with a cache-busting query string.
- Confirm `git status --short --branch` is clean and synced with `origin/master`.

## Codex Collaboration Preference

For this repo, changes should normally be committed and pushed automatically after verification unless the user explicitly says to keep them local.
