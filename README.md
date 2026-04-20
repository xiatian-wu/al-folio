# Xiatian Iogansen — Academic Personal Website

> Live site: **[xiatian-wu.github.io/about-me](https://xiatian-wu.github.io/about-me/)**
>
> Read the build story: **[How I Built This Website](https://xiatian-wu.github.io/about-me/blog/2026/building-personal-website/)**

A clean, responsive academic personal website built on [al-folio](https://github.com/alshedivat/al-folio) and hosted on GitHub Pages. Built with the assist from [Claude Code](https://claude.com/claude-code) AI assistance.

---

## What Makes This Template Unique

### Interactive Research Graph
The Research page features a **D3.js force-directed graph** that visualizes the relationship between research topics and publications — inspired by the knowledge graph in [Obsidian](https://obsidian.md). Nodes are color-coded by paper status (published, under review, in preparation). Clicking a topic node scrolls directly to the paper list; hovering shows a description.

### Integrated CV Timeline
Experience and education are rendered automatically from a structured YAML file (`_data/cv.yml`) — no HTML required. Update your CV in one place and the site reflects it instantly.

### Draft Paper Support
Papers under review or in preparation can include a **Draft** download button, so visitors can read your work before it's formally published. Just drop a PDF in `assets/pdf/` and add the path to `_data/graph.yml`.

### Workflow
The [blog post](https://xiatian-wu.github.io/about-me/blog/2026/building-personal-website/) documents the full process, decisions made, and lessons learned — useful if you want to replicate the workflow.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Jekyll](https://jekyllrb.com/) + [al-folio](https://github.com/alshedivat/al-folio) theme |
| Hosting | [GitHub Pages](https://pages.github.com) (free, auto-deploy on push) |
| Research graph | [D3.js v7](https://d3js.org) |
| Styling | Bootstrap 4 + custom SCSS |
| AI assistant | [Claude Code](https://claude.com/claude-code) |

---

## Use This as a Template

If you like this setup, you're welcome to use it as a starting point for your own academic site.

1. **Fork or use as template** — click the button at the top right of this page
2. **Enable GitHub Actions** — go to Settings → Actions → Allow all actions (disabled by default on forks)
3. **Update `_config.yml`** — set your name, email, baseurl, and url
4. **Add your content** — edit `_pages/about.md`, `_data/cv.yml`, `_bibliography/papers.bib`, and `_data/graph.yml`
5. **Push** — GitHub Actions builds and deploys automatically

See the [al-folio documentation](https://github.com/alshedivat/al-folio) for full configuration options.

---

## Repository Structure

```
_data/
  cv.yml              # Experience and education (auto-rendered on About page)
  graph.yml           # Research graph nodes and edges (topics, papers, statuses)
_bibliography/
  papers.bib          # BibTeX entries for the Publications page
_pages/
  about.md            # Homepage / bio
  research.md         # Research page (graph + list view)
  blog.md             # Blog index
_posts/               # Blog posts (Markdown)
assets/pdf/           # CV and paper drafts
_sass/                # Custom styles
```

---

*Built with [al-folio](https://github.com/alshedivat/al-folio) and [Claude Code](https://claude.com/claude-code).*
