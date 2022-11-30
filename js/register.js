$(document).ready(function(){
    
    $("#submit").click(function(){
        
        var profile = {
                username: $("#username").val(),
                password: $("#password").val(),
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                photo: $("#photo").val(),

        };
        
        console.log(profile)

        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(profile),
            url: "aws_register_api_url",
            success: function(data){
                console.log('success', data);
                $("#feedback").html(data['body'])
                if(data['statusCode'] == 200){
                    let username = $("#username").val();
                    sessionStorage.setItem("username", username);
                    console.log(sessionStorage.getItem("username"));
                    setTimeout(function(){
                        window.location="home.html";
                      },3000);
                };
            },
            error: function(data){
                console.log('Error', data);
            }
        })
    });

});
