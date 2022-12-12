function createCourse(){
    var courseinfo = {
        courseid: $("#courseid").val(),
        coursename: $("#coursename").val(),
        userid: sessionStorage.getItem("username"), //username or userid
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(courseinfo),
        url: "aws_createcourse_api_url",
        success: function(data){
            console.log(data['statusCode'], data);
            //$("#feedback").html(data['body'])
            if(data['statusCode'] == 200){
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
}

function addCourse(){
    var coursetoadd = {
        courseid: $("#courseid").val(),
        userid: sessionStorage.getItem("username"), //username or userid
        sectionid: sectionid, //need to get sectionid
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(coursetoadd),
        url: "aws_joincourse_api_url",
        success: function(data){
            console.log(data['statusCode'], data);
            //$("#feedback").html(data['body'])
            if(data['statusCode'] == 200){
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
}