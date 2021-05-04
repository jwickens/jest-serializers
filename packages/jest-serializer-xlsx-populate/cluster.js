
function cluster (matrix) {
  let clusterCount = 1;
  const coordToCluster = {};
  const clusterToCoords = {};
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === '' || cell === null || typeof cell === 'undefined') {
        return
      }

      let cluster;
      if (coordToCluster[i-1] && coordToCluster[i-1][j]) {
        cluster = coordToCluster[i-1][j]
      } else if (coordToCluster[i] && coordToCluster[i][j-1]) {
        cluster = coordToCluster[i][j-1]
      } else {
        cluster = clusterCount
        clusterCount += 1
      }

      if (coordToCluster[i]) {
        coordToCluster[i][j] = cluster
      } else {
        coordToCluster[i] = { [j]: cluster }
      }

      const coords = clusterToCoords[cluster]

      if (coords && coords.length === 1) {
        coords.push([i,j])
      } else if (coords && coords.length === 2) {
        if (coords[1][0] < i) {
          coords[1][0] = i
        }
        if (coords[1][1] < j) {
          coords[1][1] = j
        }
      } else {
        clusterToCoords[cluster] = [[i,j]]
      }
    })
  })

  const clusterToHeaderIndex = {}
  const clusterToHeader = {}
  for (let cluster = 1; cluster < clusterCount; cluster++) {
    const coords = clusterToCoords[cluster]
    if (coords.length < 2) {
      continue;
    }

    const rowsLengths = matrix.slice(coords[0][0], coords[1][0] + 1).map(row => row.slice(coords[0][1], coords[1][1] + 1).reduce((agg, r) => {
      if (!!r) {
        return agg + 1
      }
      return agg
    },0));

    const maxLength = Math.max(...rowsLengths)
    const headerIndex = rowsLengths.findIndex(l => l === maxLength) + coords[0][0]
    clusterToHeaderIndex[cluster] = headerIndex
    const header = matrix[headerIndex]
    clusterToHeader[cluster] = header;

  }

  return { clusterToHeader, coordToCluster, clusterToHeaderIndex }
}

module.exports = {
  cluster
}