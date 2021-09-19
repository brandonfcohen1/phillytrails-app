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


// // Trails GeoJSON
// app.get('/api/geojson/trails', (req, res) => {
//   client.query("SELECT ST_AsGeoJSON(trails.*, 'geom') FROM trails;").then(x => 
//     {
//       res.send(
//           {
//             "type": "FeatureCollection", 
//             "features": x.rows.map(r=>JSON.parse(r.st_asgeojson))
//           }
//         )
//     }
//     );
// })

// // Lines GeoJSON
// app.get('/api/geojson/transit_lines', (req, res) => {
//   client.query("SELECT ST_AsGeoJSON(transit_lines.*, 'geom') FROM transit_lines;").then(x => 
//     {
//       res.send(
//           {
//             "type": "FeatureCollection", 
//             "features": x.rows.map(r=>JSON.parse(r.st_asgeojson))
//           }
//         )
//     }
//     );
// })

// // Stops GeoJSON
// app.get('/api/geojson/transit_stops', (req, res) => {
//   client.query("SELECT ST_AsGeoJSON(transit_stops.*, 'geom') FROM transit_stops;").then(x => 
//     {
//       res.send(
//           {
//             "type": "FeatureCollection", 
//             "features": x.rows.map(r=>JSON.parse(r.st_asgeojson))
//           }
//         )
//     }
//     );
// })

// // Bike Network GeoJSON
// app.get('/api/geojson/bike_network', (req, res) => {
//   client.query("SELECT ST_AsGeoJSON(bike_network.*, 'geom') FROM bike_network;").then(x => 
//     {
//       res.send(
//           {
//             "type": "FeatureCollection", 
//             "features": x.rows.map(r=>JSON.parse(r.st_asgeojson))
//           }
//         )
//     }
//     );
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

