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
                      },3000);
                };
            },
            error: function(data){
                console.log('Error', data);
            }
        })
    });

});
