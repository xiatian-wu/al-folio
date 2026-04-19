const { buildNodes, buildLinks, findOrphans } = require('../assets/js/publication-graph');

const sampleData = {
  nodes: [
    { id: 'researcher',  type: 'researcher', label: 'Dr. Smith' },
    { id: 'proj-a',      type: 'project',    label: 'Project A', years: '2022–present', url: '/projects/proj-a' },
    { id: 'paper-1',     type: 'paper',      label: 'Paper 1',   status: 'published',   year: 2023, venue: 'Nature', url: 'https://doi.org/1' },
    { id: 'paper-2',     type: 'paper',      label: 'Paper 2',   status: 'in-progress', year: 2025, venue: '',       url: '' },
    { id: 'paper-3',     type: 'paper',      label: 'Paper 3',   status: 'published',   year: 2022, venue: 'Science', url: 'https://doi.org/2' },
  ],
  edges: [
    { source: 'researcher', target: 'proj-a' },
    { source: 'proj-a',     target: 'paper-1' },
    { source: 'proj-a',     target: 'paper-2' },
    // paper-3 has no edge — orphan
  ],
};

describe('buildNodes', () => {
  it('returns all nodes as shallow copies', () => {
    const nodes = buildNodes(sampleData);
    expect(nodes).toHaveLength(5);
    expect(nodes.find(n => n.id === 'researcher').type).toBe('researcher');
    expect(nodes.find(n => n.id === 'proj-a').type).toBe('project');
    expect(nodes.find(n => n.id === 'paper-1').type).toBe('paper');
  });

  it('does not mutate the original data', () => {
    const before = JSON.stringify(sampleData.nodes);
    buildNodes(sampleData);
    expect(JSON.stringify(sampleData.nodes)).toBe(before);
  });
});

describe('buildLinks', () => {
  it('returns one link per edge', () => {
    const links = buildLinks(sampleData);
    expect(links).toHaveLength(3);
  });

  it('each link has string source and target', () => {
    const links = buildLinks(sampleData);
    links.forEach(link => {
      expect(typeof link.source).toBe('string');
      expect(typeof link.target).toBe('string');
    });
  });
});

describe('findOrphans', () => {
  it('finds papers with no incoming project edge', () => {
    const orphans = findOrphans(sampleData);
    expect(orphans).toHaveLength(1);
    expect(orphans[0].id).toBe('paper-3');
  });

  it('returns empty array when all papers have edges', () => {
    const dataNoOrphans = {
      nodes: sampleData.nodes,
      edges: [
        ...sampleData.edges,
        { source: 'proj-a', target: 'paper-3' },
      ],
    };
    expect(findOrphans(dataNoOrphans)).toHaveLength(0);
  });

  it('does not return project or researcher nodes as orphans', () => {
    const orphans = findOrphans(sampleData);
    orphans.forEach(n => expect(n.type).toBe('paper'));
  });
});
