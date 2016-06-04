var map;
        function init(){
        
      var toggler = new L.LayerGroup();
      // initiate leaflet map
      map = new L.Map('map', { 
        center: [40.705,-74.00], 
        zoom: 11,
        layers: [toggler]
      })
      //L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
      //  attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
      //}).addTo(map);
      //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      //}).addTo(map);
      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);

    
      var layerUrl = "https://dms2203.cartodb.com/api/v2/viz/18a45e40-150d-11e5-998e-0e4fddd5de28/viz.json";
    
      var sublayers = [];
    
      cartodb.createLayer(map, layerUrl,{
                title: true,
                description: false,
                search: true,
                tiles_loader: true,
                layer_selector:true,
                cartodb_logo: false,
                legends: true
            })
      .addTo(map)
      .addTo(toggler)
      .on('done', function(layer) {
        // change the query for the first layer
        var subLayerOptions = {
          //sql: "SELECT * FROM ne_10m_populated_places_simple",
          //cartocss: "#ne_10m_populated_places_simple{marker-fill: #F84F40; marker-width: 8; marker-line-color: white; marker-line-width: 2; marker-clip: false; marker-allow-overlap: true;}"
        }
    
        var sublayer = layer.getSubLayer(0);
    
        sublayer.set(subLayerOptions);
    
        sublayers.push(sublayer);
      }).on('error', function() {
        //log the error
      });
      var baseLayers = {
        //turned off just so can add to L.control.layers
      };

      var overlays = {
        "Pedestrians Injured 1995-2013 Layer On/Off": toggler
      };

      L.control.layers(baseLayers, overlays).addTo(map);
    }