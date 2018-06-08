
# Making a referendum map of Switzerland

This boilerplate is a starting point for the workshop exercise on making a map of Switzerland showing referendum results.

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

Open the directory in atom and start coding :)

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
  return geoData.map(function(dataPoint) {
    const cantonId = dataPoint.properties.id
    const csvDataPoint = csvData.find(function(d) {
      return d.code === cantonId
    })
    dataPoint.properties.csvData = csvDataPoint
    return dataPoint
  })
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

#### Creating a color scale

If you want to use a linear scale gradient showing the amount of the population who voted for or against an issue, you can use `d3.scaleLinear()`.

```js
const colorScale = d3.scaleLinear()
  .domain([0,100])
  .range(["#FFF","#000"])
```

If you pass a number between `0` and `100` into the colorScale function, you will receive the corresponding color.

```js
colorScale(75) //
colorScale(50) //
colorScale(25) //
```
