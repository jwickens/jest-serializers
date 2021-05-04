const { cluster } = require('../packages/jest-serializer-xlsx-populate/cluster')

describe('cluster', () => {
  it('finds the correct header with an extra label', () => {
    const values = [
      ['This is a test', '', '' ],
      ['Heading A', 'Heading B', ''],
      [1, 2, '']
    ]

    const { clusterToHeader, coordToCluster } = cluster(values)
    expect(Object.keys(clusterToHeader).length).toBe(1)
    expect(clusterToHeader[1]).toEqual(['Heading A', 'Heading B', ''])

    expect(coordToCluster[2][1]).toBe(1)
  })

  it('finds the correct header with multiple clusters vertically', () => {
    const values = [
      ['Heading A', 'Heading B', ''],
      [1, 2, ''],
      ['', '', ''],
      ['', 'Heading C', 'Heading D'],
      ['', 1, 2],
    ]

    const { clusterToHeader, coordToCluster } = cluster(values)
    expect(clusterToHeader[1]).toEqual(['Heading A', 'Heading B', ''])
    expect(clusterToHeader[2]).toEqual(['', 'Heading C', 'Heading D'])
  })
});