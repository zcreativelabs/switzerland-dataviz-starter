
# Making a map of Switzerland

This boilerplate is a starting point for the workshop exercise on making a map of Switzerland.

## Getting started

First clone this repo.

```
$ git clone git@github.com:zcreativelabs/switzerland-dataviz-starter.git
```

Once you have done that, navigate into the folder and unlink it from the starter git repo.

```
$ cd switzerland-dataviz-starter
$ rm -Rf .git
```

In order to start developing and loading data asynchronously make sure that you run a python server:

```
$ python -m SimpleHTTPServer 3000
```

To stop the server type `ctrl-c`. Once your server is running you can navigate to [`localhost:3000`](http://localhost:3000).

Open the directory in atom/vscode and start coding :)

## Helpers

The following are small snippets of code that will help you make a choropleth map.

#### Loading GeoJSON

```js
d3.json("ch.json")
  .then(function(geoData) {
    // process your geojson data
  })
```

#### Loading csv data

```js
d3.csv("data.csv")
  .then(function(csvData) {
    // process your csv data
  })
```

#### Merging geographic data with csv data

```js
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
```

To use the merge util make sure to load your geojson data and your csv data first.

```js
d3.json("ch.json")
  .then(function(geoData) {
    d3.csv("data.csv")
      .then(function(csvData) {

        const mergedDatasets = mergeDatasets(geoData, csvData)

        // use mergedDatasets to create the visualisation

      })
  })
```

#### Projection

```js
const projection = d3.geoMercator()
  .translate([800/2,500/2])
  .scale(8000)
  .center([8.2,46.8])
```

#### Coloring the map

You can set the color depending on the data in the following way:

```js
const cantons = svg.selectAll(".canton")
  .data(merged.features)
  .enter()
  .append("path")
  .attr("d", d => path(d))
  .attr("fill", d => {
    if (+d.properties.ja > 50) {
      return "#4CAF50"
    }
    else {
      return "#FF5722"
    }
  })
```

#### Adding points

To add points of interest to your map, you can use the projection function:

```js
// Zurich
const zurichCoordinates = projection([8.5417,47.3769])

const zurich = svg.append("circle")
                  .attr("cx", zurichCoordinates[0])
                  .attr("cy", zurichCoordinates[1])
                  .attr("r", 4)
```
