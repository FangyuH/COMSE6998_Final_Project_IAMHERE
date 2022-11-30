$(document).ready(function(){
    $("#login").click(function(){
        var login = {
            username: $("#username").val(),
            password: $("#password").val(),
        };

        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(login),
            url: "aws_login_api_url",
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

})
