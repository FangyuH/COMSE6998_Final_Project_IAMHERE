function getPie(){
    var container = document.getElementById('piechart');
    anychart.onDocumentReady(function() {

        // set the data
        var data = [
            {x: "White", value: 223553265},
            {x: "Black or African American", value: 38929319},
            {x: "American Indian and Alaska Native", value: 2932248},
            {x: "Asian", value: 14674252},
            {x: "Native Hawaiian and Other Pacific Islander", value: 540013}
        ];
      
        // create the chart
        var chart = anychart.pie();
      
        // set the chart title
        chart.title("Check-in Statistics");
      
        // add the data
        chart.data(data);
      
        // display the chart in the container
        chart.container(container);
        chart.draw();
      
      });
    document.getElementById("showpie").style.display="none";
}
