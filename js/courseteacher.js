function getPie(){
    var container = document.getElementById('piechart');
    anychart.onDocumentReady(function() {
        var classinfo = {
            course_name: "test",
            userid: sessionStorage.getItem("userid")
        };

        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(classinfo),
            url: "aws-get-checkin-detail",
            success: function(data){
                console.log('success')
                console.log(data);
                // format the data obtained as the following
                /*
                var data = [
                    {x: "White", value: 223553265},
                    {x: "Black or African American", value: 38929319},
                    {x: "American Indian and Alaska Native", value: 2932248},
                    {x: "Asian", value: 14674252},
                    {x: "Native Hawaiian and Other Pacific Islander", value: 540013}
                ];
                */
                // create the chart
                var chart = anychart.pie();
            
                // set the chart title
                chart.title("Check-in Statistics");
            
                // add the data
                chart.data(data);
            
                // display the chart in the container
                chart.container(container);
                chart.draw();
            },
            error: function(data){
                console.log('error')
                console.log(data);
            }
        })
        
      
      });
    document.getElementById("showpie").style.display="none";
}


function getCheckinDetail(){
    var classinfo = {
        course_name: "test",
        userid: sessionStorage.getItem("userid")
    };

    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(classinfo),
        url: "aws-get-checkin-detail",
        success: function(data){
            console.log('success')
            console.log(data);
            $('#checkin_table').DataTable({
                data: data,
                columns: [
                    { title: 'Name' },
                    { title: 'Position' },
                    { title: 'Office' },
                    { title: 'Extn.' },
                    { title: 'Start date' },
                    { title: 'Salary' },
                ],
            });
        },
        error: function(data){
            console.log('error')
            console.log(data);
        }
    })


}

        

