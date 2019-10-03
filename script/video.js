    $(function(){  
        initVideo();
        initLikes();
        
        let videoList = {
            videoA: "./media/dmxiong1.mp4",
            videoB: "./media/dmxiong2.mp4",
            videoC: "./media/dmxiong3.mp4",
            videoD: "./media/dmxiong4.mp4",
            videoE: "./media/dmxiong5.mp4"
        }
        $(".video-icon .oi").on("click",function(e){

            let action = $(this).attr("title");
            switch (action) {
                case "media-play":
                    $(".oi").removeClass("disabled");
                    playVideo(this);    
                    break;
                case "media-pause":
                    $(".oi").removeClass("disabled");
                    pauseVideo(this);
                    break;				  
                case "media-stop":
                    $(".oi").removeClass("disabled");
                    stopVideo(this);
                    break;
                case "plus":
                    volumeUp(this);
                    break;
                case "minus":
                    volumeDown(this);
                    break;
                case "thumb-up":
                    addlikes();
                    break;
                case "thumb-down":
                    unlikes();
                    break;   
                case "headphones":
                    muted();
                    break;
                                                                
            }
        });
        
        $(".videoList .oi").on("click",function(e){
            initVideo();

            let key = $(this).data("video");    
            $("#mainvideo").attr("src",videoList[key]);    
            console.log(videoList[key]);             
        });

        $("#mainvideo").on("play", function(e){
            alert("play");
        });
    });

    function initVideo(){
        $(".oi").removeClass("disabled");
        $(".oi[title=media-pause]").addClass("disabled");
        $(".oi[title=media-stop]").addClass("disabled");
    }

    function initLikes(){
        $('#likesNumber').html(localStorage.likes + " likes");
        $('#unlikesNumber').html(localStorage.unlikes + " unlikes");
    }

    function addlikes(){
        if(localStorage.likes){
            localStorage.likes ++;
            $('#likesNumber').html(localStorage.likes + " likes");
        }else{
            localStorage.likes = parseInt(1);
        }
    }

    function unlikes(){
        if(localStorage.unlikes){
            localStorage.unlikes ++;
            $('#unlikesNumber').html(localStorage.unlikes + " unlikes");
        }else{
            localStorage.unlikes = parseInt(1);
        }
    }    

    function playVideo(t){
        $("#mainvideo")[0].play();
        $(t).addClass("disabled"); 
    }

    function pauseVideo(t){
        $("#mainvideo")[0].pause();
        $(t).addClass("disabled"); 
    }    

    function stopVideo(t){
        if($("#mainvideo")[0].currentTime > 0) {
            $("#mainvideo")[0].load();
            initVideo();
        }
    } 

    function volumeUp(){
        let volume = $("#mainvideo")[0].volume + 0.2
        $("#mainvideo")[0].volume = volume > 1 ? 1: volume;
        console.log($("#mainvideo")[0].volume);
    }
 
    function volumeDown(){
        let volume =  $("#mainvideo")[0].volume - 0.2;
        $("#mainvideo")[0].volume = volume < 0 ? 0: volume;
        console.log($("#mainvideo")[0].volume);
    }		

    function muted(){
        $("#mainvideo")[0].muted = !$("#mainvideo")[0].muted;
    }

    function updateProgress(){
        var duration = $("#mainvideo")[0].duration
        var currentTime = $("#mainvideo")[0].currentTime;

        var percent = currentTime/duration;

        $('.progress-bar').attr("aria-valuenow", percent * 100);
        $('.progress-bar').css("width", percent * 100 + "%");
    }

    setInterval(updateProgress,500);

    $(function(){
        $('#numberoflikes').html(localStorage.likes + " likes");
        $("#playdisabledbutton").css("display", "none");
        $("#mainvideo")[0].volume = 0.2;
    })