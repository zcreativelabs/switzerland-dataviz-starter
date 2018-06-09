
// Util for merging geojson data with csv data
function mergeDatasets(geoData, csvData) {
  const newFeatures = geoData.features.map(function(dataPoint) {
    const cantonId = dataPoint.properties.HASC_1
    const csvDataPoint = csvData.find(function(d) {
      return d.code === cantonId
    })
    return {
      ...dataPoint,
      properties: {
        ...dataPoint.properties,
        ...csvDataPoint,
      },
    }
  })
  geoData.features = newFeatures
  return geoData
}

document.addEventListener("DOMContentLoaded", function() {
  // Make a map...
})
