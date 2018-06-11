
document.addEventListener("DOMContentLoaded", () => {

  // 1. Fetch the geojson data to construct
  // the shape of each canton.
  d3.json("cantons.json")
    .then(geoData => {

      // 2. Fetch the csv data that contains the
      // voting results from the referendum. You can plug in other
      // csv files from the data repo: https://github.com/zcreativelabs/referendum-data
      d3.csv("atomausstiegsinitiative.csv")
        .then(csvData => {

          // 3. Merge the datasets using the 'mergeDatasets'
          // helper function (see utils.js)
          const mergedGeoData = mergeDatasets(geoData, csvData)

          // 4. Get the svg element based on its id (#map)
          // from the DOM (see index.html)
          const svg = d3.select("#map")

          // 5. Create a projection for Switzerland. In order to
          // compensate for the mercator distortion at the poles,
          // we rotate the map projection to center on Bern:
          // https://www.swisstopo.admin.ch/en/knowledge-facts/surveying-geodesy/reference-systems/map-projections.html
          // The center property is used to push the map into
          // the center of the SVG canvas.
          const projection = d3.geoMercator()
                               .translate([800/2,500/2])
                               .rotate([-7.45,-46.95])
                               .scale(12000)
                               .center([0.5,-0.1])

          // 6. Define a path-generator based on the projection
          const path = d3.geoPath().projection(projection)

          // 7. Bind the merged geoData to path elements using d3,
          // and draw the cantons using the path-generator. Here the custom
          // fill of each canton is based on whether the canton voted "yes"
          // or "no" in the referendum
          const cantons = svg.selectAll(".canton")
                             .data(mergedGeoData.features)
                             .enter()
                             .append("path")
                             .attr("d", d => path(d))
                             .attr("class", "canton")
                             .attr("stroke", "#FFF")
                             .attr("fill", d => {
                               if (d.properties.ja >= 50) {
                                 return "#9CCC65"
                               }
                               else {
                                 return "#FF7043"
                               }
                             })

          // 8. Add annotations
          const legend = svg.append("g")
                            .attr("transform", "translate(20,450)")

          const jaCircle = legend.append("circle")
                                 .attr("r", 10)
                                 .attr("fill", "#9CCC65")

          const ja = legend.append("text")
                           .text("Ja")
                           .attr("x", 15)
                           .attr("alignment-baseline", "central")

          const neinCircle = legend.append("circle")
                                   .attr("r", 10)
                                   .attr("cy", 25)
                                   .attr("fill", "#FF7043")

          const nein = legend.append("text")
                             .text("Nein")
                             .attr("x", 15)
                             .attr("y", 25)
                             .attr("alignment-baseline", "central")

          // 9. Add title and date of the referendum
          const title = svg.append("text")
                           .text("Atomausstiegsinitiative")
                           .attr("x", 20)
                           .attr("y", 40)
                           .attr("font-size", "1.5rem")

          const date = svg.append("text")
                          .text("27.11.2016")
                          .attr("x", 20)
                          .attr("y", 65)

        })

  })

})
