
// Util for merging geojson data with csv data
function mergeDatasets(geoData, csvData) {
  return geoData.map(function(dataPoint) {
    const cantonId = dataPoint.properties.id
    const csvDataPoint = csvData.find(function(d) {
      return d.code === cantonId
    })
    dataPoint.properties.csvData = csvDataPoint
    return dataPoint
  })
}

// Util for creating a color scale
const colorScale = d3.scaleLinear()
  .domain([0,100])
  .range(["#FFF","#000"])


document.addEventListener("DOMContentLoaded", function() {
  // Make a map...
})
