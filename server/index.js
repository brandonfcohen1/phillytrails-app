// express
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
require("dotenv").config();

// postgres
const pg = require("pg");
const conString =
  "postgres://" +
  process.env.PGUSER +
  ":" +
  process.env.PGPASSWORD +
  "@" +
  process.env.PGHOST +
  ":" +
  process.env.PGPORT +
  "/" +
  process.env.PGDATABASE;
const client = new pg.Client(conString);
client.connect();

// TODO: error handling for bad table names
app.get("/api/geojson/:table", (req, res) => {
  const table = req.params.table;
  client
    .query("SELECT ST_AsGeoJSON(" + table + ".*, 'geom') FROM " + table + ";")
    .then((result) => {
      res.send({
        type: "FeatureCollection",
        features: result.rows.map((r) => JSON.parse(r.st_asgeojson)),
      });
    });
});

app.get("/api/center/trail/:id", (req, res) => {
  client
    .query(
      `SELECT ST_AsText(pt) AS centroid, ST_AsText(ST_ClosestPoint(line,pt)) AS line_point
    FROM (
      SELECT ST_Centroid(geom) AS pt, geom AS line
      FROM trails
      WHERE id = ` +
        req.params.id +
        `
    ) AS feature`
    )
    .then((result) => {
      res.send(result);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`, '0.0.0.0');
});
