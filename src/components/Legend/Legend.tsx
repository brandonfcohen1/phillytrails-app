import L from 'leaflet';
import {useMap} from 'react-leaflet';
import {useEffect} from 'react';
import './Legend.css';


export default function Legend() {

    const map = useMap();

    useEffect(() => {



        // Add legend
        let legend = new L.Control();

        legend.options.position = 'bottomleft';

        legend.onAdd = function (map: any) {

            var div = L.DomUtil.create('div', 'info legend'),
                    types = [
                        "paved trail", "paved road", "dirt road", "dirt trail"
                    ],
                    colors = ["#454545", "#000000", "#FF0000", "#800000"];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < types.length; i++) {
                    div.innerHTML += '<i style="background:' + colors[i] + '">&nbsp&nbsp&nbsp&nbsp</i> ' + types[i] + '<br>';
            }

            return div;
        };

        legend.addTo(map);
    }, [map]);

    return null;
}
