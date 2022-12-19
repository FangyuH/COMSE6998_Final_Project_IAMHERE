/*
$(document).ready(function(){
    
    $("#submit").click(function(){
        
        var profile = {
                email: $("#email").val(),
                username: $("#username").val(),
                password: $("#password").val(),
                photo: $("#photo").val(),
        };
        
        console.log(profile)

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(profile),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/user/create_user",
            success: function(data){
                console.log('success', data);
                $("#feedback").html(data['body'])
                if(data['statusCode'] == 200){
                    let email = $("#email").val();
                    sessionStorage.setItem("email", email);
                    console.log(sessionStorage.getItem("email"));
                    setTimeout(function(){
                        window.location="home.html";
                      },1000);
                };
            },
            
            error: function(data){
                let email = $("#email").val();
                sessionStorage.setItem("email", email);
                console.log(sessionStorage.getItem("email"));
                setTimeout(function(){
                    window.location="home.html";
                    },1000);
                console.log('Error', data);
            }
        })
    });

});
*/
function register(){
    setTimeout(() => {
    userid = $("#email").val();
    var apigClient = apigClientFactory.newClient();
    // var reader = new FileReader();
    var file = document.getElementById('upload_face').files[0];
    file.constructor = () => file;

    console.log('File : ', file);
    //document.getElementById('uploaded_file').value = "";
    var filePath = (document.getElementById('upload_face').value).split("\\");
    var fileName = filePath[filePath.length - 1];
    console.log("imagename:",fileName);
    if ((filePath == "") || (!['png', 'jpg', 'jpeg'].includes(fileName.split(".")[1]))) {
        alert("Please upload a valid .png/.jpg/.jpeg file!");
    } else {

        var params = {
            "folder":"lixuanyanghw2",
            "item": userid + '.jpg',
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

    var profile = {
        email: $("#email").val(),
        username: $("#username").val(),
        password: $("#password").val(),
        bucket: 'lixuanyanghw2',
        photo: email+'.'+file.type
    };      
    console.log("send data:", profile);

    //send face photo info
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        data: JSON.stringify({
            email: $("#email").val(),
            username: $("#username").val(),
            password: $("#password").val(),
            bucket: 'lixuanyanghw2',
            photo: email+'.'+file.type
        }),
        url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/user/create_user",
        success: function(data){
            console.log('success:',data)
            if(data['status'] == 200){
                let email = $("#email").val();
                sessionStorage.setItem("email", email);
                console.log(sessionStorage.getItem("email"));
                setTimeout(function(){
                    window.location="home.html";
                },1000);
            };
        }
    });
}, 2000);
}