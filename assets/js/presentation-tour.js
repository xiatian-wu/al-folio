/**
 * Presentation Tour — activated by ?tour=1 in the URL
 * Persists step index via sessionStorage so navigation across pages works.
 */

(function () {
  'use strict';

  // ─── Tour script ────────────────────────────────────────────────────────────
  // Each step: { page, hash, en, zh }
  //   page  — substring that must appear in pathname to match (null = any)
  //   hash  — optional anchor to scroll to after page load
  //   en    — English talking points (HTML allowed)
  //   zh    — Chinese talking points (HTML allowed)

  var STEPS = [
    {
      page: '/about',
      hash: null,
      title: '1 / 7 — Welcome',
      en: '<strong>Hi, I\'m Xiatian Iogansen</strong> — a transportation researcher at George Washington University and NIST. This site is a hub for my research, CV, and publications. Let me walk you through the main sections.',
      zh: '<strong>大家好，我是Xiatian Iogansen</strong>，目前在乔治华盛顿大学和美国国家标准与技术研究院从事交通研究。这个网站是我的学术主页，包含我的研究方向、简历和论文列表。让我带大家简单浏览一下。'
    },
    {
      page: '/about',
      hash: null,
      title: '2 / 7 — About Page',
      en: 'The <strong>About page</strong> introduces my background, current affiliation, and research focus. My CV timeline below shows my academic and work history — all rendered automatically from a single YAML data file, so I only need to update one place.',
      zh: '<strong>About页面</strong>介绍了我的学术背景、所在机构和研究方向。下方的简历时间轴展示了我的学习和工作经历——这些内容由一个YAML数据文件自动渲染，只需更新一处即可同步显示。'
    },
    {
      page: '/about',
      hash: null,
      title: '3 / 7 — CV & Links',
      en: 'At the top you\'ll find links to my <strong>CV PDF</strong>, email, Google Scholar, and GitHub profiles. The CV section below lists my positions and education with dates and descriptions — no HTML editing required to maintain it.',
      zh: '页面顶部有我的<strong>CV下载链接</strong>、邮箱、Google Scholar和GitHub主页。下方的简历部分按时间列出了我的职位和教育经历，维护起来非常方便，不需要直接编辑HTML。'
    },
    {
      page: '/research',
      hash: null,
      title: '4 / 7 — Research Graph',
      en: 'This is the <strong>Research page</strong>. The interactive graph shows how my research topics and papers are connected — inspired by the knowledge graph in Obsidian. Nodes are color-coded: <span style="color:#818cf8">■</span> topics, <span style="color:#22c55e">■</span> published, <span style="color:#eab308">■</span> under review, <span style="color:#94a3b8">■</span> in preparation.',
      zh: '这是<strong>Research（研究）页面</strong>。交互式图谱展示了我的研究主题和论文之间的关联——灵感来自Obsidian的知识图谱。节点按颜色分类：<span style="color:#818cf8">■</span>研究主题，<span style="color:#22c55e">■</span>已发表，<span style="color:#eab308">■</span>审稿中，<span style="color:#94a3b8">■</span>准备中。'
    },
    {
      page: '/research',
      hash: null,
      title: '5 / 7 — Graph Interactions',
      en: '<strong>Try it:</strong> hover any node to see a tooltip with details. Click a topic node (like "EV Adoption") to jump straight to that section in the list view below. Click a paper node to open the publication.',
      zh: '<strong>可以试试：</strong>将鼠标悬停在节点上，可以看到详细信息的提示框。点击研究主题节点（如"EV Adoption"）会直接跳转到下方列表视图中对应的部分。点击论文节点则会打开该论文链接。'
    },
    {
      page: '/research',
      hash: null,
      title: '6 / 7 — List View & Drafts',
      en: 'Switch to <strong>List View</strong> to browse papers by topic. Papers under review or in preparation are marked with badges. Some have a <strong>Draft</strong> button — click it to download the working paper before it\'s formally published.',
      zh: '切换到<strong>列表视图</strong>可以按主题浏览论文。审稿中或准备中的论文会标注状态标签。部分论文还有<strong>Draft（草稿）</strong>按钮，点击即可在正式发表前下载工作论文。'
    },
    {
      page: '/blog',
      hash: null,
      title: '7 / 7 — Blog',
      en: 'The <strong>Blog</strong> documents how this site was built — entirely through natural-language instructions to Claude Code, an AI coding assistant, with no prior web development experience. If you\'re an academic thinking about building your own site, this post walks through the full process.',
      zh: '<strong>Blog页面</strong>记录了这个网站的搭建过程——完全通过自然语言指令与AI编程助手Claude Code协作完成，全程无需网页开发基础。如果你也想搭建自己的学术主页，这篇文章详细介绍了整个流程。'
    }
  ];

  var STORAGE_KEY = 'presentation_tour_step';
  var LANG_KEY    = 'presentation_tour_lang';

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function currentStep() {
    return parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
  }

  function setStep(n) {
    sessionStorage.setItem(STORAGE_KEY, String(n));
  }

  function currentLang() {
    return sessionStorage.getItem(LANG_KEY) || 'en';
  }

  function setLang(lang) {
    sessionStorage.setItem(LANG_KEY, lang);
  }

  // ─── Panel UI ─────────────────────────────────────────────────────────────────

  function buildPanel() {
    var panel = document.createElement('div');
    panel.id = 'tour-panel';
    panel.innerHTML =
      '<div id="tour-header">' +
        '<span id="tour-title"></span>' +
        '<div id="tour-lang-toggle">' +
          '<button id="tour-btn-en" class="tour-lang-btn active">EN</button>' +
          '<button id="tour-btn-zh" class="tour-lang-btn">中文</button>' +
        '</div>' +
        '<button id="tour-close" title="Exit tour">&times;</button>' +
      '</div>' +
      '<div id="tour-body"></div>' +
      '<div id="tour-footer">' +
        '<button id="tour-prev">&#8592; Prev</button>' +
        '<div id="tour-dots"></div>' +
        '<button id="tour-next">Next &#8594;</button>' +
      '</div>';
    document.body.appendChild(panel);

    // Styles (injected so no extra CSS file needed)
    var style = document.createElement('style');
    style.textContent = [
      '#tour-panel {',
      '  position: fixed;',
      '  bottom: 24px;',
      '  right: 24px;',
      '  width: 360px;',
      '  max-width: calc(100vw - 48px);',
      '  background: #1e2030;',
      '  color: #e2e8f0;',
      '  border-radius: 12px;',
      '  box-shadow: 0 8px 32px rgba(0,0,0,0.5);',
      '  font-family: inherit;',
      '  font-size: 0.88rem;',
      '  line-height: 1.55;',
      '  z-index: 99999;',
      '  overflow: hidden;',
      '  transition: opacity 0.2s;',
      '}',
      '#tour-header {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '  background: #4f46e5;',
      '  padding: 8px 12px;',
      '}',
      '#tour-title {',
      '  font-weight: 700;',
      '  font-size: 0.8rem;',
      '  letter-spacing: 0.03em;',
      '  flex: 1;',
      '  color: #fff;',
      '}',
      '#tour-lang-toggle { display: flex; gap: 4px; }',
      '.tour-lang-btn {',
      '  background: rgba(255,255,255,0.15);',
      '  border: none;',
      '  color: #fff;',
      '  border-radius: 4px;',
      '  padding: 2px 7px;',
      '  font-size: 0.75rem;',
      '  cursor: pointer;',
      '  transition: background 0.15s;',
      '}',
      '.tour-lang-btn.active { background: rgba(255,255,255,0.35); font-weight: 700; }',
      '.tour-lang-btn:hover { background: rgba(255,255,255,0.25); }',
      '#tour-close {',
      '  background: none;',
      '  border: none;',
      '  color: rgba(255,255,255,0.7);',
      '  font-size: 1.2rem;',
      '  cursor: pointer;',
      '  line-height: 1;',
      '  padding: 0 2px;',
      '  transition: color 0.15s;',
      '}',
      '#tour-close:hover { color: #fff; }',
      '#tour-body {',
      '  padding: 14px 16px;',
      '  min-height: 80px;',
      '}',
      '#tour-footer {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  padding: 8px 12px;',
      '  border-top: 1px solid rgba(255,255,255,0.08);',
      '}',
      '#tour-prev, #tour-next {',
      '  background: rgba(255,255,255,0.1);',
      '  border: none;',
      '  color: #e2e8f0;',
      '  border-radius: 6px;',
      '  padding: 4px 12px;',
      '  font-size: 0.82rem;',
      '  cursor: pointer;',
      '  transition: background 0.15s;',
      '}',
      '#tour-prev:hover, #tour-next:hover { background: rgba(255,255,255,0.2); }',
      '#tour-prev:disabled, #tour-next:disabled { opacity: 0.3; cursor: default; }',
      '#tour-dots { display: flex; gap: 5px; }',
      '.tour-dot {',
      '  width: 7px; height: 7px;',
      '  border-radius: 50%;',
      '  background: rgba(255,255,255,0.25);',
      '  transition: background 0.15s;',
      '}',
      '.tour-dot.active { background: #818cf8; }',
    ].join('\n');
    document.head.appendChild(style);

    return panel;
  }

  function renderStep(panel, stepIndex, lang) {
    var step = STEPS[stepIndex];
    panel.querySelector('#tour-title').textContent = step.title;
    panel.querySelector('#tour-body').innerHTML    = step[lang];

    // Dots
    var dotsEl = panel.querySelector('#tour-dots');
    dotsEl.innerHTML = '';
    for (var i = 0; i < STEPS.length; i++) {
      var dot = document.createElement('span');
      dot.className = 'tour-dot' + (i === stepIndex ? ' active' : '');
      dotsEl.appendChild(dot);
    }

    panel.querySelector('#tour-prev').disabled = (stepIndex === 0);
    panel.querySelector('#tour-next').textContent =
      stepIndex === STEPS.length - 1 ? 'Finish' : 'Next \u2192';

    // Lang buttons
    panel.querySelector('#tour-btn-en').className =
      'tour-lang-btn' + (lang === 'en' ? ' active' : '');
    panel.querySelector('#tour-btn-zh').className =
      'tour-lang-btn' + (lang === 'zh' ? ' active' : '');
  }

  function navigateToStep(stepIndex) {
    setStep(stepIndex);
    var step    = STEPS[stepIndex];
    var baseUrl = (window.TOUR_BASE || '').replace(/\/$/, '');

    // Determine target URL
    var targetPath = baseUrl + step.page + '/';
    var currentPath = window.location.pathname;

    // Are we already on the right page?
    var onPage = step.page === null || currentPath.includes(step.page);
    if (onPage) {
      // Just re-render (already here)
      return false;
    } else {
      // Navigate — panel will re-init on load
      var tourUrl = targetPath + '?tour=1';
      if (step.hash) tourUrl += '#' + step.hash;
      window.location.href = tourUrl;
      return true;
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    // Only activate when ?tour=1
    if (getParam('tour') !== '1') return;

    var stepIndex = currentStep();
    var lang      = currentLang();

    // Guard: clamp step to valid range
    if (stepIndex < 0 || stepIndex >= STEPS.length) {
      stepIndex = 0;
      setStep(0);
    }

    // Check if current page matches the expected step; if not, advance to find
    // the first step that matches.
    var path = window.location.pathname;
    var step = STEPS[stepIndex];
    if (step.page && !path.includes(step.page)) {
      // Find first step that matches current page
      for (var i = 0; i < STEPS.length; i++) {
        if (!STEPS[i].page || path.includes(STEPS[i].page)) {
          stepIndex = i;
          setStep(i);
          break;
        }
      }
    }

    var panel = buildPanel();
    renderStep(panel, stepIndex, lang);

    // Lang toggle
    panel.querySelector('#tour-btn-en').addEventListener('click', function () {
      setLang('en');
      renderStep(panel, currentStep(), 'en');
    });
    panel.querySelector('#tour-btn-zh').addEventListener('click', function () {
      setLang('zh');
      renderStep(panel, currentStep(), 'zh');
    });

    // Prev
    panel.querySelector('#tour-prev').addEventListener('click', function () {
      var idx = currentStep() - 1;
      if (idx < 0) return;
      var navigated = navigateToStep(idx);
      if (!navigated) renderStep(panel, idx, currentLang());
    });

    // Next / Finish
    panel.querySelector('#tour-next').addEventListener('click', function () {
      var idx = currentStep();
      if (idx >= STEPS.length - 1) {
        // End tour
        sessionStorage.removeItem(STORAGE_KEY);
        panel.style.opacity = '0';
        setTimeout(function () { panel.remove(); }, 200);
        // Strip ?tour=1 from URL without reload
        var url = new URL(window.location.href);
        url.searchParams.delete('tour');
        history.replaceState({}, '', url.toString());
        return;
      }
      var navigated = navigateToStep(idx + 1);
      if (!navigated) renderStep(panel, idx + 1, currentLang());
    });

    // Close
    panel.querySelector('#tour-close').addEventListener('click', function () {
      sessionStorage.removeItem(STORAGE_KEY);
      panel.style.opacity = '0';
      setTimeout(function () { panel.remove(); }, 200);
      var url = new URL(window.location.href);
      url.searchParams.delete('tour');
      history.replaceState({}, '', url.toString());
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
