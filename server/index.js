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

// TODO: error handling for bad table names
app.get('/api/geojson/:table', (req, res) => {
  const table = req.params.table;
  client.query("SELECT ST_AsGeoJSON(" + table + ".*, 'geom') FROM " + table + ";").then(x => 
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

