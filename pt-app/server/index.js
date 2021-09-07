// express
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();

// postgres
const pg = require('pg');
const conString = "postgres://" + process.env.PGUSER + ":" + process.env.PGPASSWORD + "@" + process.env.PGHOST + ":" + process.env.PGPORT + "/" + process.env.PGDATABASE;
const client = new pg.Client(conString);
client.connect();


// Trails GeoJSON
app.get('/api/geojson/trails', (req, res) => {
  client.query("SELECT ST_AsGeoJSON(trails.*, 'geom') FROM trails;").then(x => 
    {
      res.send(
          {
            "type": "FeatureCollection", 
            "features": x.rows.map(r=>JSON.parse(r.st_asgeojson))
          }
        )
    }
    );
})

// Lines GeoJSON
app.get('/api/geojson/transit_lines', (req, res) => {
  client.query("SELECT ST_AsGeoJSON(transit_lines.*, 'geom') FROM transit_lines;").then(x => 
    {
      res.send(
          {
            "type": "FeatureCollection", 
            "features": x.rows.map(r=>JSON.parse(r.st_asgeojson))
          }
        )
    }
    );
})

// Stops GeoJSON
app.get('/api/geojson/transit_stops', (req, res) => {
  client.query("SELECT ST_AsGeoJSON(transit_stops.*, 'geom') FROM transit_stops;").then(x => 
    {
      res.send(
          {
            "type": "FeatureCollection", 
            "features": x.rows.map(r=>JSON.parse(r.st_asgeojson))
          }
        )
    }
    );
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

