/**
 * Publication Graph — D3.js v7 force-directed graph
 *
 * Pure data functions (buildNodes, buildLinks, findOrphans) are exported for
 * unit testing. initGraph is browser-only and runs on DOMContentLoaded.
 */

// ── Pure data functions ────────────────────────────────────────────────────

function buildNodes(data) {
  return data.nodes.map(function(n) { return Object.assign({}, n); });
}

function buildLinks(data) {
  return data.edges.map(function(e) { return { source: e.source, target: e.target }; });
}

function findOrphans(data) {
  var targeted = new Set(data.edges.map(function(e) { return e.target; }));
  return data.nodes.filter(function(n) { return n.type === 'paper' && !targeted.has(n.id); });
}

// ── Visual helpers ─────────────────────────────────────────────────────────

function nodeColor(type, status) {
  if (type === 'researcher')      return '#4f46e5';
  if (type === 'project')         return '#818cf8'; // light indigo
  if (status === 'published')     return '#22c55e'; // green
  if (status === 'under-review')  return '#eab308'; // yellow
  if (status === 'in-preparation') return '#94a3b8'; // grey
  return '#94a3b8';
}

function nodeRadius(type) {
  if (type === 'researcher') return 20;
  if (type === 'project')    return 14;
  return 8;
}

// ── D3 rendering ──────────────────────────────────────────────────────────

function initGraph(data) {
  var container = document.getElementById('publication-graph');
  if (!container) return;

  container.innerHTML = '';
  d3.selectAll('.graph-tooltip').remove();

  var width  = container.clientWidth  || 900;
  var height = container.clientHeight || 600;

  // Route orphan papers through an "Other" node
  var orphans  = findOrphans(data);
  var augNodes = buildNodes(data);
  var augLinks = buildLinks(data);

  if (orphans.length > 0) {
    augNodes.push({ id: '__other__', type: 'project', label: 'Other', years: '', url: '' });
    augLinks.push({ source: 'researcher', target: '__other__' });
    orphans.forEach(function(o) {
      augLinks.push({ source: '__other__', target: o.id });
    });
  }

  var svg = d3.select('#publication-graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Tooltip
  var tooltip = d3.select('body').append('div')
    .attr('class', 'graph-tooltip')
    .style('display', 'none');

  var simulation = d3.forceSimulation(augNodes)
    .force('link', d3.forceLink(augLinks).id(function(d) { return d.id; }).distance(80))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(function(d) { return nodeRadius(d.type) + 4; }));

  var link = svg.append('g')
    .selectAll('line')
    .data(augLinks)
    .join('line')
    .attr('stroke', '#cbd5e1')
    .attr('stroke-width', 1.5);

  var node = svg.append('g')
    .selectAll('circle')
    .data(augNodes)
    .join('circle')
    .attr('r', function(d) { return nodeRadius(d.type); })
    .attr('fill', function(d) { return nodeColor(d.type, d.status); })
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .call(
      d3.drag()
        .on('start', function(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', function(event, d) { d.fx = event.x; d.fy = event.y; })
        .on('end', function(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        })
    )
    .on('mouseover', function(event, d) {
      var lines = [d.label];
      if (d.year)  lines.push(String(d.year));
      if (d.venue) lines.push(d.venue);
      tooltip.style('display', 'block').html(lines.join('<br>'));
    })
    .on('mousemove', function(event) {
      tooltip
        .style('left', (event.pageX + 12) + 'px')
        .style('top',  (event.pageY - 20) + 'px');
    })
    .on('mouseout', function() { tooltip.style('display', 'none'); })
    .on('click', function(event, d) {
      if (d.type === 'project') {
        // Switch to list view and scroll to the project section
        if (typeof showView === 'function') showView('list');
        var target = document.getElementById(d.id);
        if (target) {
          setTimeout(function() {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        }
      } else if (d.type === 'paper' && d.url) {
        window.open(d.url, '_blank');
      }
    });

  var label = svg.append('g')
    .selectAll('text')
    .data(augNodes.filter(function(d) { return d.type !== 'paper'; }))
    .join('text')
    .text(function(d) { return d.label; })
    .attr('font-size', 11)
    .style('fill', 'var(--global-text-color)')
    .attr('text-anchor', 'middle')
    .attr('pointer-events', 'none');

  simulation.on('tick', function() {
    link
      .attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });

    node
      .attr('cx', function(d) { return Math.max(20, Math.min(width  - 20, d.x)); })
      .attr('cy', function(d) { return Math.max(20, Math.min(height - 20, d.y)); });

    label
      .attr('x', function(d) { return Math.max(20, Math.min(width  - 20, d.x)); })
      .attr('y', function(d) { return Math.max(20, Math.min(height - 20, d.y + nodeRadius(d.type) + 14)); });
  });
}

// ── Entry point ────────────────────────────────────────────────────────────

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildNodes, buildLinks, findOrphans };
} else {
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.graphData !== 'undefined') initGraph(window.graphData);
  });
}
