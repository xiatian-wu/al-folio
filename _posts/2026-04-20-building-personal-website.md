---
layout: post
title: "How I Built This Website"
date: 2026-04-20
description: A plain-language walkthrough of building an academic personal website with AI assistance — what we built, decisions made, and tools used.
tags: [website, workflow]
categories: [meta]
---

> Thinking about building your own website? The barrier is lower than it looks — especially with AI assistance!

This site was built in a single session using [Claude Code](https://claude.com/claude-code), an AI coding assistant. I described what I wanted, and we built it together step by step. This post is a record of how that went.

---

## The Steps We Followed

<div class="flow-steps">
  <div class="flow-step">1 &nbsp; Define goals &amp; design</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">2 &nbsp; Pick a website template</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">3 &nbsp; Set up GitHub hosting</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">4 &nbsp; Fill in real content</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">5 &nbsp; Add custom features</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">6 &nbsp; Refine the look &amp; feel</div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">7 &nbsp; Fix bugs &amp; ship</div>
</div>

<style>
.flow-steps {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1.5rem 0 2rem 0;
}
.flow-step {
  background: var(--global-theme-color);
  color: #fff;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  min-width: 240px;
}
.flow-arrow {
  font-size: 1.4rem;
  color: var(--global-theme-color);
  margin: 0.1rem 0.75rem;
  line-height: 1;
}
</style>

---

## Tools Used

| Tool | Purpose |
|---|---|
| [Claude Code](https://claude.com/claude-code) | AI coding assistant — wrote and debugged code from plain instructions |
| [al-folio](https://github.com/alshedivat/al-folio) | Website template built for academics |
| [GitHub Pages](https://pages.github.com) | Free hosting with automatic deployment |
| [D3.js](https://d3js.org) | Library used to draw the interactive research graph |

---

## Key Choices

**Website template:** I used [al-folio](https://github.com/alshedivat/al-folio), a free template designed for academic researchers. It came with a publications page, a blog, and a clean layout out of the box.

**Hosting:** The site is hosted on GitHub Pages — free, reliable, and automatically rebuilds every time I save a change. No server to manage.

**Research graph:** The interactive graph on the Research page was inspired by my experience using [Obsidian](https://obsidian.md) — a note-taking app where ideas are visualized as a network of connected nodes. I wanted the same feel for my research: topics and papers linked together, explorable at a glance. Clicking a topic scrolls to the paper list; hovering shows a description.

**CV section:** Rather than designing a timeline from scratch, I structured my CV as a simple data file. The site reads it and renders the timeline automatically.

**Color scheme:** The default template used a bright magenta. I replaced it with indigo — more professional and easier on the eyes.

---

## Lessons Learned

- **Describe what you want in plain terms.** The AI handles the technical translation. You don't need to know the code.
- **Review on mobile early.** Several design choices that looked fine on desktop looked cramped or cluttered on a phone.
- **One change at a time.** When multiple things changed at once and something broke, it was hard to tell what caused it.
- **Keep data in one place.** I maintain paper information in two files (one for the publications page, one for the graph). Keeping them in sync requires discipline.

---

## AI Tools That Helped

The entire project was built using **Claude Code** with the [Superpowers plugin](https://github.com/superpowers-sh/superpowers), which adds structured workflows called *skills*. Here is how each skill contributed:

| Skill | What it did |
|---|---|
| `writing-plans` | Created a step-by-step spec before writing any code, so the AI knew exactly what to build |
| `subagent-driven-development` | Delegated each task to a fresh AI worker, reviewed the result, then moved to the next step |
| `finishing-a-development-branch` | Handled the clean wrap-up: running checks, committing, and pushing to GitHub |
| `requesting-code-review` | Got an independent review after each major feature to catch mistakes early |

The most impactful habit was **writing a plan before coding**. Even a short list of steps prevents the drift that comes from making decisions on the fly.

---
