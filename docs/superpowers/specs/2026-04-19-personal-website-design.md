# Personal Website Design Spec
**Date:** 2026-04-19
**Stack:** al-folio (Jekyll) + GitHub Pages + D3.js graph

---

## Purpose

A stable professional hub at a personal domain that serves three audiences:
- General visitors (professional presence)
- Recruiters and hiring managers (work history, CV)
- Academic peers and collaborators (publications, research)

---

## Site Structure

Three pages accessible via top navigation:

### Page 1: Home
Combines About, CV, and Contact in a single scrollable page.

**Sections:**
- Profile photo, name, title, institution (NIST), and social links (Google Scholar, ORCID, LinkedIn)
- About: short bio and research interests
- CV: work experience timeline + downloadable PDF button
- Contact: email, office address, links

### Page 2: Research
Combines Projects and Publications. Publications are listed under their corresponding project.

**Layout toggle:** Graph View (default) and List View.

**Graph View:** Interactive D3.js force-directed graph styled after Obsidian.
- Center node: researcher
- Second-level nodes: projects (purple/indigo)
- Leaf nodes: individual papers
  - Published papers: green
  - In-progress papers: yellow
- Interactions: drag nodes, hover to preview paper title/year, click to open full entry or paper link

**List View:** Projects listed sequentially. Each project has a title, description, and a nested list of publications (published + in-progress).

### Page 3: Blog
Chronological list of posts. Standard al-folio blog layout. Used for news, updates, and writing.

---

## Content Sources

| Content | Source | Format |
|---|---|---|
| Published papers | Google Scholar export | BibTeX (`.bib` file) |
| In-progress papers | Word document (manual entry) | BibTeX with `note = {In preparation}` |
| Projects | One Markdown file per project | `_projects/project-name.md` |
| Bio and research interests | Markdown | `_pages/about.md` |
| CV | Uploaded PDF | `assets/pdf/cv.pdf` |
| Work experience | YAML | `_data/cv.yml` |
| Blog posts | Markdown | `_posts/YYYY-MM-DD-title.md` |
| Contact, social links | Config | `_config.yml` |

Publications link to their project via a `projects` field in each BibTeX entry. The D3.js graph reads this relationship to draw edges.

---

## Architecture

```
Google Scholar (BibTeX export) ──┐
                                  ├──> _bibliography/papers.bib ──> Research page
Word doc (unpublished papers) ───┘                                   (graph + list)

Markdown files ──> About / Blog / Project pages

CV PDF ──> Home page (download link)

GitHub push ──> GitHub Actions builds Jekyll ──> yourname.com (custom domain)
```

---

## D3.js Graph Implementation

- A single JavaScript file (`assets/js/publication-graph.js`) loads on the Research page
- It reads publication and project data rendered into the page as JSON by Jekyll
- Renders a force-directed graph using D3.js v7
- Node colors: indigo for projects, green for published papers, yellow for in-progress papers
- Supports drag, hover (tooltip with title/year/venue), and click (navigates to paper or project anchor)
- Falls back gracefully to List View if JavaScript is disabled
- Papers with no `projects` field are grouped under an "Other" node in the graph rather than being orphaned

---

## Deployment Workflow

1. Fork `alshedivat/al-folio` on GitHub
2. Configure `_config.yml` (name, institution, social links, custom domain)
3. Add Google Scholar BibTeX export to `_bibliography/papers.bib`
4. Manually add in-progress papers to the same `.bib` file
5. Create project Markdown files in `_projects/`
6. Upload CV PDF to `assets/pdf/`
7. Enable GitHub Pages in repo settings (source: GitHub Actions)
8. Point custom domain DNS to GitHub Pages

**Ongoing updates:** Edit files in GitHub's web editor or locally, commit, and GitHub Actions deploys automatically in ~2 minutes. No terminal required for routine updates.

---

## Out of Scope

- CMS or admin interface
- Comments or contact forms (email link is sufficient)
- Analytics (can be added later via a config flag in al-folio)
- Multi-language support
