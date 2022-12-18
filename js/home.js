$(document).ready(function(){
    $("#save").click(function(){
        var courseinfo = {
            courseID: $("#courseid").val(),
            courseName: $("#coursename").val(),
            email: sessionStorage.getItem("email"), //username or userid
        };

        console.log(courseinfo);

        $.ajax({
            type: "POST",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(courseinfo),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/create_course",
            success: function(data){
                console.log("flag:", data);
                sessionStorage.setItem("createCourse", $("#courseid").val());
                //$("#feedback").html(data['body'])
                if(data['statusCode'] == 200){
                    setTimeout(function(){
                        window.location="home.html";
                    },1000);
                };
                document.getElementById('createCoursesName').innerHTML = $("#courseid").val();
            },
            error: function(data){
                console.log("data:", data);
                sessionStorage.setItem("createCourse", $("#courseid").val());
                setTimeout(function(){
                    alert('course created successfully!')
                    console.log("create course successfully");
                    document.getElementById('createCoursesName').innerHTML = $("#courseid").val();
                },1000);
                
            }
        })
    //document.getElementById('create').style.display='none'
    });

    $("#join").click(function(){
        var courseinfo = {
            courseID: $("#courseid").val(),
            courseName: $("#coursename").val(),
            email: sessionStorage.getItem("email"), //username or userid
        };

        console.log(courseinfo);

        $.ajax({
            type: "POST",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(courseinfo),
            url: "join course",
            success: function(data){
                console.log(data['status'], data);
                //$("#feedback").html(data['body'])
                if(data['status'] == 200){
                    setTimeout(function(){
                        window.location="home.html";
                    },3000);
                };
            },
            error: function(data){
                console.log(data['statusCode'], data);
            }
        })
    //document.getElementById('create').style.display='none'
    });


});

