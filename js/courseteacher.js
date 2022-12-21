function getPie(){
    var container = document.getElementById('piechart');
    //anychart.onDocumentReady(function() {
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({"courseID": sessionStorage.getItem('current_create_course')}),
        url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/teacher/getcheckindetail",
        //url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/student/checkin_qr",
        success: function(data){
            console.log('success data', data);
            data = JSON.parse(data['body']);
            console.log("after parse",data);
            // format the data obtained as the following
            var dataLen = data.length
            var checked = 0;
            for(var i =0; i< dataLen; i++){
                if(data[i]['checkedIn']){
                    checked++;
                }
            }

            var chartData = [
                {x: "CheckIn", value: checked},
                {x: "NotCheckIn", value: dataLen-checked},
            ];
            
            // create the chart
            var chart = anychart.pie();
        
            // set the chart title
            chart.title("Check-in Statistics");
        
            // add the data
            chart.data(chartData);
        
            // display the chart in the container
            chart.container(container);
            chart.draw();
        },
        error: function(data){
            console.log('error')
            console.log(data);
            var chartData = [
                {x: "CheckIn", value: 13},
                {x: "NotCheckIn", value: 10},
            ];
            
            // create the chart
            var chart = anychart.pie();
        
            // set the chart title
            chart.title("Check-in Statistics");
        
            // add the data
            chart.data(chartData);
        
            // display the chart in the container
            chart.container(container);
            chart.draw();
        }
    });
        
      
    //  });
    //document.getElementById("showpie").style.display="none";
}

/*
function getCheckinDetail(){
    var classinfo = {
        course_name: sessionStorage.getItem('current_create_course'),
        userid: sessionStorage.getItem("userid")
    };

    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            course_name: sessionStorage.getItem('current_create_course'),
            userid: sessionStorage.getItem("email")
        }),
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
*/
function generate_qr(){
 // Specify an onclick function
    // for the generate button
    
    function success(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        // data: JSON.stringify([{
        //     course_name: "321"
        // }]),
        data: JSON.stringify({course_name: sessionStorage.getItem("current_create_course"), latitude: crd.latitude, longitude: crd.longitude}),
        url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/teacher/generate_qr",
        success: function(data){
            console.log('success')
            console.log('data:',data);
            let str = data['body'].split("#")
            console.log(str)
            //let finalURL =
            //'https://chart.googleapis.com/chart?cht=qr&chl=' + str[0]+ "!" + str[1] + '&chs=160x160&chld=L|0'
            //console.log(finalURL)

            // Replace the src of the image with
            // the QR code image
            let newqr = new QRCode(document.getElementById("qrcode"), str[0]+ "!" + str[1]);
            console.log('newqr:',newqr);
            //$('.qr-code').attr('src', finalURL);
            }
    });
    }

    function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
    

}