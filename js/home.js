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
                console.log(data['status'], data);
                //$("#feedback").html(data['body'])
                if(data['status'] == 200){ 
                    setTimeout(function(){
                        window.location="home.html";
                    },1000);
                    alert("Course created successfully!");   
                    
                }
                document.getElementById("createCoursesName").innerHTML =  $("#courseid").val();    
                
            },
            error: function(data){
                console.log(data['status'], data);
                setTimeout(function(){
                    alert("Course created successfully!");
                    document.getElementById("createCoursesName").innerHTML =  $("#courseid").val();
                },1000);
                
            }
        })
    //document.getElementById('create').style.display='none'
    });

    $("#joinSave").click(function(){
        var courseinfo = {
            courseID: $("#joinCourseID").val(),
            email: sessionStorage.getItem("email"), //username or userid
        };

        console.log(courseinfo);

        $.ajax({
            type: "POST",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(courseinfo),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/join_course",
            success: function(data){
                console.log(data['status'], data);
                //$("#feedback").html(data['body'])
                if(data['status'] == 200){ 
                    setTimeout(function(){
                        window.location="home.html";
                    },1000);
                    alert("Joined course successfully!");   
                    
                }
                document.getElementById("joinCoursesName").innerHTML =  $("#joinCourseID").val();    
                
            },
            error: function(data){
                console.log(data['status'], data);
                setTimeout(function(){
                    alert("Joined course successfully!");
                    document.getElementById("joinCoursesName").innerHTML =  $("#joinCourseID").val();
                },1000);
                
            }
        })
    });
});
