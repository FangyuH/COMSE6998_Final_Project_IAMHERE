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


    $("#getCreate").click(function(){
        var courseinfo = {
            email: sessionStorage.getItem("email"), //username or userid
        };

        console.log(courseinfo);

        $.ajax({
            type: "POST",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(courseinfo),
            url: "get course listhttps://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/getenrolledcourse",
            success: function(data){
                console.log("success response:", data);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i][courseRole]=='teacher'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i];
                        document.getElementById("create_course").appendChild(btn); 
                    }    
                }
            },
            error: function(data){
                console.log("error response:", data);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i][courseRole]=='teacher'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i];
                        document.getElementById("create_course").appendChild(btn); 
                    } 
                }
                
            }
        })
    });


    $("#getJoin").click(function(){
        var courseinfo = {
            email: sessionStorage.getItem("email"), //username or userid
        };

        console.log(courseinfo);

        $.ajax({
            type: "POST",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(courseinfo),
            url: "get course listhttps://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/getenrolledcourse",
            success: function(data){
                console.log("success response:", data);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i][courseRole]=='student'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i];
                        document.getElementById("join_course").appendChild(btn); 
                    }    
                }
            },
            error: function(data){
                console.log("error response:", data);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i][courseRole]=='student'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i];
                        document.getElementById("join_course").appendChild(btn); 
                    } 
                }
            }
        })
    });

    var coursecontainer = document.getElementById("create_course");
    if (coursecontainer.children.length > 0){
        for (var i = 0; i < coursecontainer.children.length; i++) {
            console.log("child course:",coursecontainer.children[i]);
            coursecontainer.children[i].onclick = function(){
                sessionStorage.setItem("current_create_course",coursecontainer.children[i]);
                window.location.href = "./courseteacher.html";
            }
        }
    }

    var joincoursecontainer = document.getElementById("join_course");
    if (joincoursecontainer.children.length > 0){
        for (var i = 0; i < joincoursecontainer.children.length; i++) {
            console.log("child course:",joincoursecontainer.children[i]);
            joincoursecontainer.children[i].onclick = function(){
                sessionStorage.setItem("current_join_course",joincoursecontainer.children[i]);
                window.location.href = "./coursestudent.html";
            }
        }
    }
});