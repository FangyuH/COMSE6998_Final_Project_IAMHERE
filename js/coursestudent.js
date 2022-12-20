function sendQr(){
    setTimeout(() => {
        var qrdecode = document.getElementById("content");
        var decodestr = qrdecode.innerText.replace(/['"]+/g, '');
        var email = sessionStorage.getItem("email");
        console.log("decoded str:",decodestr);

        //send geolocation
        function success(pos) {
            const crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            //send qrcode to backend
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType:"json",
                // data: JSON.stringify([{
                //     course_name: "321"
                // }]),
                data: JSON.stringify({userid: email, decode_qrstr: decodestr.split("!")[1], courseID: sessionStorage.getItem("current_join_course"), latitude: crd.latitude, longitude: crd.longitude}),
                url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/student/checkin_qr",
                success: function(data){
                    console.log('success response:');
                    if(data['statusCode'] == 200){
                        var elem = document.createElement("img");
                        elem.src = "js/green-check.png";
                        document.getElementById("qrCode_valid").appendChild(elem);
                    };
                },
                error: function(data){
                    console.log('error response');
                    var elem = document.createElement("img");
                    elem.src = "js/green-check.png";
                    document.getElementById("qrCode_valid").appendChild(elem);
                    
                }
            });
        }
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
          
        navigator.geolocation.getCurrentPosition(success, error);

    }, 2000);
}

function sendface(){
    setTimeout(() => {
    var apigClient = apigClientFactory.newClient();
    // var reader = new FileReader();
    var file = document.getElementById('uploaded_face').files[0];
    file.constructor = () => file;

    console.log('File : ', file);
    //document.getElementById('uploaded_file').value = "";
    var filePath = (document.getElementById('uploaded_face').value).split("\\");
    var fileName = filePath[filePath.length - 1];
    console.log("imagename:",fileName);
    if ((filePath == "") || (!['png', 'jpg', 'jpeg'].includes(fileName.split(".")[1]))) {
        alert("Please upload a valid .png/.jpg/.jpeg file!");
    } else {

        var params = {
            "folder":"lixuanyanghw2",
            "item": file.name,
            "Content-Type":file.type,
            'x-amz-meta-customLabels':'custom_labels.value'
            //'Access-Control-Allow-Origin':"*"
        };
        console.log("Content-Type:",file.type)
        var additionalParams = {
        };

        apigClient.uploadFolderItemPut(params, file, additionalParams)
            .then(function(result) {
                //API Call Success
                console.log("bucket success:",JSON.stringify(result));
                

            }).catch(function(result) {
                // API Call Failed
                console.log(JSON.stringify(result));
            });

    }

    var email = sessionStorage.getItem('email');
    var course_name = sessionStorage.getItem('current_join_course');
    var bucket = 'lixuanyanghw2';
    var image = fileName;

    console.log("send data:", email,course_name,bucket,image);

    //send face photo info
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        // data: JSON.stringify([{
        //     course_name: "321"
        // }]),
        data: JSON.stringify({userid: email, "course_name": sessionStorage.getItem('current_join_course'), "bucket_name": bucket, "image_name": image}),
        url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/student/checkin_face",
        success: function(data){
            console.log('success response:',data)
            if(data['statusCode'] == 200){
                var grncheck = document.createElement("img");
                grncheck.src = "js/green-check.png";
                document.getElementById("photo_valid").appendChild(grncheck);
            };

        },
        error: function(){
            console.log('error response:',data)
            if(data['statusCode'] == 200){
                var grncheck = document.createElement("img");
                grncheck.src = "js/green-check.png";
                document.getElementById("photo_valid").appendChild(grncheck);
            };
        }
    });
}, 2000);
}
