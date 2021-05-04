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

  it('finds the correct header with subheaders', () => {
    const values = [
      ['Heading A', 'Heading B', ''],
      ['Subheader', '', ''],
      [1, 2, ''],
    ]

    const { clusterToHeader, coordToCluster } = cluster(values)
    expect(clusterToHeader[1]).toEqual(['Heading A', 'Heading B', ''])
    expect(coordToCluster[2][0]).toBe(1)
    expect(coordToCluster[2][1]).toBe(1)
  })

  it('finds the correct header with missing row data and subheader', () => {
    const values = [
      ['Heading A', 'Heading B', 'Header C'],
      ['Subheader', '', ''],
      ['Foo', '', 1]
    ]

    const { clusterToHeader, coordToCluster } = cluster(values)
    expect(clusterToHeader[1]).toEqual(['Heading A', 'Heading B', 'Header C'])
    expect(coordToCluster[2][2]).toBe(1)
  })
});