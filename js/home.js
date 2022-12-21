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
            data: JSON.stringify({
                courseID: $("#courseid").val(),
                courseName: $("#coursename").val(),
                email: sessionStorage.getItem("email"), //username or userid
            }),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/create_course",
            success: function(data){
                console.log('success response:', data);
                //$("#feedback").html(data['body'])
                if(data['statusCode'] == 200){ 
                    alert("Course created successfully!");   
                }
                      
            },
            error: function(data){
                console.log("error response", data);
                setTimeout(function(){
                alert("Course created successfully!");
                },1000);
                  
            }
        });
    //document.getElementById('create').style.display='none'
    })

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
            data: JSON.stringify({
                courseID: $("#joinCourseID").val(),
                email: sessionStorage.getItem("email"), //username or userid
            }),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/join_course",
            success: function(data){
                console.log("success response:", data);
                //$("#feedback").html(data['body'])
                if(data['statusCode'] == 200){ 
                    console.log(data['status'], data);
                    setTimeout(function(){
                    alert("Joined course successfully!");
                    },1000);       
                }
                else if(data['statusCode'] == 401){ 
                    console.log(data['status'], data);
                    setTimeout(function(){
                    alert("Joined course failed. No such course ID exist.");
                    },1000);       
                }
                else if(data['statusCode'] == 402){ 
                    console.log(data['status'], data);
                    setTimeout(function(){
                    alert("Joined course failed. User cannot join the course they created.");
                    },1000);       
                }
                else if(data['statusCode'] == 403){ 
                    console.log(data['status'], data);
                    setTimeout(function(){
                    alert("Joined course failed. User is already in this course.");
                    },1000);       
                }

                
            },
            error: function(data){  
                console.log("error response:", data);
                setTimeout(function(){
                alert("Joined course failed!");
                },1000);
                
            }
        })
    })


    $("#getCreate").click(function(){
        var courseinfo = {
            email: sessionStorage.getItem("email"), //username or userid
        };

        console.log(courseinfo);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            data: JSON.stringify({email: sessionStorage.getItem("email")}),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/getenrolledcourse",
            success: function(data){
                console.log("success response:", JSON.parse(data['body']));
                console.log("length:", JSON.parse(data['body']).length);
                data = JSON.parse(data['body']);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i]["courseRole"]=='teacher'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i]['courseName'];
                        document.getElementById("create_course").appendChild(btn); 
                    }    
                }
            },
            error: function(data){
                console.log("error response:", data);
                console.log("length:", JSON.parse(data['body']).length);
                data = JSON.parse(data['body']);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i]['courseRole']=='teacher'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i]['courseName'];
                        document.getElementById("create_course").appendChild(btn); 
                    } 
                }
                
            }
        });
    })


    $("#getJoin").click(function(){
        var courseinfo = {
            email: sessionStorage.getItem("email"), //username or userid
        };

        console.log(courseinfo);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            data: JSON.stringify({email: sessionStorage.getItem("email")}),
            url: "https://rlofxcp9dd.execute-api.us-east-1.amazonaws.com/beta/course/getenrolledcourse",
            success: function(data){
                console.log("success response:", data);
                console.log("length:", JSON.parse(data['body']).length);
                data = JSON.parse(data['body']);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i]['courseRole']=='student'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i]['courseName'];
                        document.getElementById("join_course").appendChild(btn); 
                    }    
                }
            },
            error: function(data){
                console.log("error response:", data);
                console.log("length:", JSON.parse(data['body']).length);
                data = JSON.parse(data['body']);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i]['courseRole']=='student'){
                        var btn = document.createElement("button");
                        btn.innerHTML = data[i]['courseName'];
                        document.getElementById("join_course").appendChild(btn); 
                    } 
                }
            }
        });
    })

    document.getElementById('getCreate').onclick = function(event){
        console.log("start checking create...");
        setTimeout(() => {
            for (var i = 0; i < document.getElementById('create_course').children.length; i++) {
                console.log("child course btn:",document.getElementById('create_course').children[i]);
                document.getElementById('create_course').children[i].onclick = function(event){
                    console.log('courseid:',event.currentTarget);
                    sessionStorage.setItem("current_create_course",event.currentTarget.innerHTML);
                    window.location.href = "./courseteacher.html";
                }
            }
        }, 2000);
    }
    

    document.getElementById('getJoin').onclick = function(event){
        console.log("start checking join...");
        setTimeout(() => {
            for (var i = 0; i < document.getElementById('join_course').children.length; i++) {
                console.log("child course btn:",document.getElementById('join_course').children[i]);
                document.getElementById('join_course').children[i].onclick = function(event){
                    console.log('courseid:',event.currentTarget);
                    sessionStorage.setItem("current_join_course",event.currentTarget.innerHTML);
                    window.location.href = "./coursestudent.html";
                }
            }
        }, 2000);
    }

});
