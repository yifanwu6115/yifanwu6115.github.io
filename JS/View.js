let colorState = 0;

let initsize={
    width:0,
    height:0
}
let j=1;
let collector = [];
let response = [];

let out;
let thedate;

$(document).ready(function(){

    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml6 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
        .add({
            targets: '.ml6 .letter',
            translateY: ["0.5em", 0],
            translateZ: 0,
            duration: 750,
            delay: (el, i) => 50 * i
        }).add({
        targets: '.ml6',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

    /*Show only main home on launch*/
    $("main").show();
    $("myhome").hide();
    $("#general_homepage_section").hide();
    $("#goto_myhome_section").hide();


    $('.right>* , .left>*').click(function() {
        if($(this).hasClass('no_content')) return;
        if (!$('.middle').hasClass('content_view') || $(this).hasClass('active')){
            changeMode();
        }
        toggleActive($(this));
        let choice = '#'+ $(this).attr('id') + '_content';

        $('.content>*').hide(); //hide all other divs under content
        $('.my_home_section').css({"width":"100%","margin":"0%"});
        $(choice).show(); //show the currently selected section
    });

    $('#right>*, #left>*').click(function(event){

        //special check for click on notifications section/sub divs
        if( event.target.classList.toString().search("notification") > -1 || event.target.id.search("notification") > -1){
            event.target = $("#notifications")[0];
        }

        //special check for click on inner section/sub divs
        else if(!event.target.id){

                let parentElement = event.target.parentElement.parentElement;
                event.target = parentElement;


        }
       /*choose which section to display*/
        let choice = '#'+ event.target.id + '_content'; //construct id of section to be displayed

        $('#content>*').hide(); //hide all other divs under content
        $('.my_home_section').css({"width":"100%","margin":"0%"});
        $(choice).show(); //show the currently selected section

        /*expand the selected section to meet the content box*/
        if(!$(this).hasClass('active')) {
            let a = "#" + event.target.id;
            if(a !== "#") {
                $(a).css("width", "108%"); //expland left sections
                if ([...event.target.classList].includes("right_section")) {
                    $(a).css("margin-left", "-8%"); //expand right sections in the opp direction
                }
            }
        }
        if(!$('.middle').hasClass('content_view') || $(this).hasClass('active')){
            changeMode($(this));
        }
        toggleActive($(this));
    });

    /*Close content view with close btn*/
    $('.content_view_close').click(function(){
        changeMode();
        /*reset all the css to default on close*/
        $('.my_home_section').css({"width":"100%","margin":"0%"});
        $('.active').removeClass('active');
    });

    /*Links the login button to my home view*/
        $('#login').click(function() {
            resetCSS();

            if($("#login").text() === "登录"){
                $("#login").text("退出");

            } else{
                $("#login").text("登录");
                $( "#logo" ).trigger( "click" );
                $("#goto_myhome_section").hide();
                return;
            }
            $("main").hide();
            $("#switch_campus_options").hide();
            $("#general_homepage_section").show();
            $("#goto_myhome_section").hide();
            $("myhome").show();
        });
    /*Links the logo main homepage*/
        $('#logo, #general_homepage, #go_to_home_title').click(function() {

            resetCSS();
            if($("#login").text() === "退出"){
                //add my home button
                $("#goto_myhome_section").show();
            }
            $("myhome").hide();
            $("main").show();
            $("#switch_campus_options").show();
            $("#general_homepage_section").hide();
        });

    //*When edit btn is clicked*/
    $("#edit_profile").click(function(){
      if($(this).text() === "Save"){
          $(this).text("Edit");
          $('.mpd_content').attr('contenteditable','false');

      } else {
          $(this).text("Save");
          $('.mpd_content').attr('contenteditable', 'true');
      }
    });

    //on clicking my page
    $('#goto_myhome_section').click(function() {

        resetCSS();
        $("main").hide();
        $("#switch_campus_options").hide();
        $("#general_homepage_section").show();
        $("#goto_myhome_section").hide();
        $("myhome").show();
    });


    function resetCSS(){
        if($('.middle').hasClass('content_view')){
            changeMode($(this));
        }
        $('.active').removeClass('active');
        $('.my_home_section').css({"width":"100%","margin":"0%"});
    }

// [Feedback] When an emoji clicked, it is colored.
    function faceSwitch(){
      $('.face').click(function(){
        if($('.clicked').length>0){
            let clickedId = $('.clicked').attr('id');
            console.log(clickedId);
            $('.clicked').attr('src','dummyPictures/face/'+clickedId+'.png');
            $('.clicked').removeClass('clicked');
        }

        let id = this.id;
        $(this).attr('src','dummyPictures/face/'+id+'-click.png');
        $(this).addClass('clicked');
      });
    };
// Show/update questions. Put the data(questions) to an array.
    function showQuestions(){
        for (let i=0; i<QDB.questions.length;i++){
          collector.push(QDB.questions[i]);};
              return collector;}


    //Put the questions from data into the DOM.
    function questionUpdate(){
      let item = '<div class = ask>' + collector[j-1]['question'+j] + '</div>'; //question1
      let percentage = '<span class = percentage>'+j+'0%'+'</span>'; //10%
      $(".inquiry").append(item);
      $("#percentage").append(percentage);
    }
    // Store responses in an array.
    function storeResponse(){
      $('.face').click(function(){
          let item = $(this).attr('id');
          response.push(item);
      })
      return response;
    }

    let QDB = {
        "questions":
            [{
                "question1" : "1.宝宝对幼儿园的总体感受."
            },{
                "question2" : "2.宝宝对体育课的总体感受."
            },{
                "question3" : "3.宝宝对厨艺课的总体感受."
            },{
                "question4" : "4.宝宝对美术课的总体感受."
            },{
                "question5" : "5.宝宝对音乐课的总体感受."
            },{
                "question6" : "6.宝宝对综合球类课的总体感受."
            },{
                "question7" : "7.宝宝对芭蕾舞课的总体感受."
            },{
                "question8" : "8.宝宝对音乐剧表演的总体感受."
            },{
                "question9" : "9.宝宝对建构课的总体感受."
            },{
                "question10" : "10.宝宝对科学课的总体感受."
            }]

    };



    faceSwitch();
    showQuestions();
    storeResponse();
// When the right arrow clicked
    $('#arrow-right').click(function(){
      // 1. Emoji reset
      if($('.clicked').length>0){
          let clickedId = $('.clicked').attr('id');
          $('.clicked').attr('src','dummyPictures/face/'+clickedId+'.png');
          $('.clicked').removeClass('clicked');
      }
      if(j<10){j++;}
      // 2. Move onto the next Question, Progress bar changes
      if($('.ask').length>0){
        $('.ask').remove();
        $('.percentage').remove();
        $('#percentage').css('width',j*10+'%');
      }
      questionUpdate();
      return j;

    })
    $('#arrow-left').click(function(){
          if(j>1){
          // 1.emoji reset
          console.log('current j is '+j);
          if($('.clicked').length>0){
              let clickedId = $('.clicked').attr('id');
              $('.clicked').attr('src','dummyPictures/face/'+clickedId+'.png');
              $('.clicked').removeClass('clicked');
            }
          // 2. Shows the previous response(emoji)
          let prevFace = response[response.length-1];
          $('#'+prevFace).attr('src','dummyPictures/face/'+prevFace+'-click.png');
          $('#'+prevFace).addClass('clicked');
          console.log(response);
          response.pop();

          //3.Progress bar and the question go backwards
          if($('.ask').length>0 || $('.percentage').length>0){
          $('.ask').remove();
          $('.percentage').remove();
          $('#percentage').css('width',(j-1)*10+'%');
          }

          let item = '<div class = ask>' + collector[j-2]['question'+(j-1)] + '</div>'; //question1
          let percentage = '<span class = percentage>'+(j-1)+'0%'+'</span>';
          $(".inquiry").append(item);
          $("#percentage").append(percentage);
          if(j>1){j--;}
          }
    });

    /* link to courses overview page*/
    $('#see_courses').click(function(){
        $('#logo').trigger('click');
        $("#course").trigger('click');
    })

    /*inteaction with courses*/
    $('.course').click(function(){
        $('.course').removeClass('active');
        $(this).addClass('active');
        let id = $(this).attr('id');
        $('#course_image').attr('src', 'dummyPictures/' + id + 'Class.jpg');
    })

// Attendance
const date = new Date();
let check = [];
let absentDates = new Object();

// DB for attendance
let ADB = {
  "July" : ["attend", "attend","attend","absent","attend",
            "attend", "attend","attend","attend","attend",
            "attend", "absent","attend","attend","attend",
            "attend", "attend","attend","attend","attend",
            "attend", "attend","absent","attend","attend",
          ],
  "August": ["attend","attend","absent","absent","attend",
             "attend","attend","attend"]
}

// Created a array of attendance
function getAttendance(){
  for(let i=0;i<ADB.August.length;i++){
    check.push(ADB.August[i]);
  }
  return check;
}
// Shows the image of attendance on the calender based on DB.
function showAttendance(){
  let datelist = $("ul.days>li").get();
  for(let x=0;x<datelist.length;x++){
    if(check[x]=="attend"){
    $("ul.days>li").eq(x).append('<img class=attend-img src="dummyPictures/attendance/attendance.svg"/>');
    $("ul.days>li").eq(x).addClass('attend');
  } else if(check[x]=="absent"){
    $("ul.days>li").eq(x).append('<img class=absent-img src="dummyPictures/attendance/absent.png"/>');
  } else{
  };
// Highlight 'today' on the calendar.
    if(datelist[x].innerText==date.getDate().toString()){
      $("ul.days>li").eq(x).addClass('today');
    } else if ((datelist[x].innerText!=date.getDate()) && ($("ul.days>li").eq(x).hasClass("today"))) {
      $("ul.days>li").eq(x).removeClass('today');
    }
    }
  }
  // Leave form is shown for days after today.
  function showForm(){
    let day = date.getDate();
    $("ul.days>li").each(function(index){
      if($(this).text()>day){
        $(this).addClass('form-show');
        $(this).append('<div class=form-overlay><img class=form-img src="dummyPictures/attendance/form.png"></div>');
      }else{
        return;
      }
    })
  }
  // Size of the leave form background follows that of parents.
  function modalWidth(){
    let parentwidth = $('#attendance_content').width();
    let parentheight = $('#attendance_content').height();
    $('.modal-wrap').width(parentwidth);
    $('.modal-wrap').height(parentheight);
    $('.confirm-wrap').width(parentwidth);
    $('.confirm-wrap').height(parentheight);
  }
  // Get the input data(date) from leave form.
  function getAbsentDate(){
    // let leaveFromDate = document.getElementById('from-date').value;
    let leaveFromTime = document.getElementById('from-time').value;
    // let leaveToDate = document.getElementById('to-date').value;
    let leaveToTime = document.getElementById('to-time').value;
  }

  // When the 'form' image clicked, pop-up window of leave form is shown
function writeForm(){
    $('body').on('click', '.form-img',function(){
        $('.modal-wrap').css('display','inline-block');
        modalWidth();
        let elofForm = $(this).parent(); //form-overlay
        out = $(this);
        let elofLi= elofForm.parent();   //form-show
        thedate=out.parent().parent().text();
        elofLi.addClass("data-"+thedate);  //li(form-show)에 숫자넣음.
    })

    $('body').on('click', '#submit',function() {
    $('.modal-wrap').css('display','none');
    out.parent().parent().removeClass('form-show');
    out.parent().parent().addClass('absent');
    out.parent().parent().append('<img class=absent-img src="dummyPictures/attendance/absent.png">');
    out.parent().remove(); //form-overlay지움....


    let leaveFromTime = document.getElementById('from-time').value;
    let leaveToTime = document.getElementById('to-time').value;

      absentDates[thedate] =  {
                                  'leaveFromTime': leaveFromTime,
                                  'leaveToTime' : leaveToTime};
    elofForm = undefined;
    elofLi = undefined;
    });
    //pop-up modal closed when 'close' clicked
    $('.close').click(function(){
        $('.modal-wrap').css('display','none');
    });

    $('body').on('click', '.absent-img',function() {
      out=$(this);
      thedate=out.parent().text();
        $('.confirm-wrap').css('display','inline-block');
        modalWidth();
        $('.close').click(function(){
           $('.confirm-wrap').css('display','none');
        })
        $("ul.days>li").each(function(index, element){
            $('.confirm-from-time').empty();
            $('.confirm-to-time').empty();
            $('.confirm-from-time').append('<span class=ab-date>'+absentDates[thedate]['leaveFromTime']+'</span>');
            $('.confirm-to-time').append('<span class=ab-date>'+absentDates[thedate]['leaveToTime']+'</span>');
        })

        $('body').on('click', '#cancel',function() {
            console.log(this);
            console.log(out);
            out.parent().removeClass('absent');
            out.parent().removeClass('data-'+thedate);
            out.parent().addClass('form-show');
            absentDates[thedate] = null;
            out.parent().append('<div class=form-overlay><img class=form-img src="dummyPictures/attendance/form.png"></div>')
            out.remove(); //remove the image.
            console.log(absentDates[thedate]);
            $('.confirm-wrap').css('display','none');
        })
});
};

getAttendance();
showAttendance();
showForm();
writeForm();


$(window).resize(function(){
    modalWidth();
  }
)

    $(".dailyData").hide();
    $(".physicalDev").hide();
    $(".abilities").show();

    $(".navbtnDaily").click(function(){
        $(".dailyData").show();
        $(".physicalDev").hide();
        $(".abilities").hide();
    });

    $(".navbtnAbility").click(function(){
        $(".dailyData").hide();
        $(".physicalDev").hide();
        $(".abilities").show();
    });

    $(".navbtnPhsysical").click(function() {
        $(".dailyData").hide();
        $(".physicalDev").show();
        $(".abilities").hide();
    });

})

$(document).keypress(function(e) {
  if(e.key == 'c') {
    toggleColor();
  }
});

function changeMode(obj){
    $('.left, .right, .middle').toggleClass('content_view');
    $('#left, #right, #middle').toggleClass('content_view');
    $('.content_view_close').toggleClass('show');
    /*Contents on the notification section hidden when collapsed*/
    if ($("#notification_homepage_display").is(":hidden")){
        $("#notification_homepage_display").show();
    } else{
        $("#notification_homepage_display").hide();
    }
}
function toggleActive(obj){

    let isActive = obj.hasClass('active');
    $('.active').removeClass('active');
    if(!isActive) {
        obj.addClass('active');
    }

}
function toggleColor(){
	$('#color').remove();
	if (colorState === 0) {
		$('head').append('<link id = "color" rel="stylesheet" type="text/css" href="../CSS/Color1.css">');
		colorState = 1;
	} else if (colorState === 1) {
		$('head').append('<link id = "color" rel="stylesheet" type="text/css" href="../CSS/Color3.css">');
		colorState = 2;
	    } else {
		$('head').append('<link id = "color" rel="stylesheet" type="text/css" href="../CSS/Color1.css">');
		colorState = 0;
	}
}

//Ability test section, show/hide physical,social,cognitive,language
var navcounter = 0;
$(document).ready(function(){

    $(".navforward").click(function(){
        if (navcounter === 4) {
            navcounter = 1;
        } else {
            navcounter++;
        }
        switchAbility(); console.log(navcounter);
    });

    $(".navback").click(function(){
        if (navcounter === 0) {
            navcounter = 3;
        } else {
            navcounter--;
        }
        switchAbility(); console.log(navcounter);
    });
});

function switchAbility() {
    switch(navcounter) {
        case 1:
            $(".abilityPhysical").css("display", "none");
            $(".abilitySocial").css("display", "initial");
            $(".abilityCognitive").css("display", "none");
            $(".abilityLanguage").css("display", "none");
            $(".abilitynav").text("社交能力");
            break;
        case 2:
            $(".abilityPhysical").css("display", "none");
            $(".abilitySocial").css("display", "none");
            $(".abilityCognitive").css("display", "initial");
            $(".abilityLanguage").css("display", "none");
            $(".abilitynav").text("常识能力");
            break;
        case 3:
            $(".abilityPhysical").css("display", "none");
            $(".abilitySocial").css("display", "none");
            $(".abilityCognitive").css("display", "none");
            $(".abilityLanguage").css("display", "initial");
            $(".abilitynav").text("语言能力");
            break;
        default:
            $(".abilityPhysical").css("display", "initial");
            $(".abilitySocial").css("display", "none");
            $(".abilityCognitive").css("display", "none");
            $(".abilityLanguage").css("display", "none");
            $(".abilitynav").text("体育能力");
            break;
    }

}
