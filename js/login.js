$(document).ready(function(){
    $("#login").click(function(){
        var login = {
            email: $("#email").val(),
            password: $("#password").val(),
        };
        
        console.log(login);
        
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                email: $("#email").val(),
                password: $("#password").val(),
            }),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/login",
            success: function(data){
                console.log('success', data);
                $("#feedback").html(data['body'])
                if (data['statusCode'] == 200){
                    let email = $("#email").val();
                    sessionStorage.setItem("email", email);
                    console.log(sessionStorage.getItem("email"));
                    setTimeout(function(){
                        window.location="home.html";
                      },1000);
                }
                else {
                    alert("Wrong password");
                };
            },
            error: function(data){     
                alert("wrong password");
            }
        })
    });

})
