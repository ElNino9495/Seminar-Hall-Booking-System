/*  ---------------------------------------------------
    Template Name: Europa Hotel And Spa
    Description: Europa Hotel And Spa HTML Template
    Author: Colorlib
    Author URI: http://www.colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

"use strict";
var startDate;
var endDate;

$(".datepicker-1").datepicker({
  dateFormat: "dd-mm-yy",
});
// $(".datepicker-2").datepicker({
//   dateFormat: "dd-mm-yy",
// });

// $(".datepicker-1").change(function () {
//   console.log("change in dp1");
//   startDate = $(this).datepicker("getDate");
//   console.log(startDate);
//   $(".datepicker-2").datepicker("option", "minDate", startDate ,'dateFormat',"dd-mm-yy");
// });
// $(".datepicker-2").change(function () {
//   console.log("change in dp2");
//   endDate = $(this).datepicker("getDate");
//   console.log(endDate);
//   $(".datepicker-1").datepicker("option", "maxDate", endDate,'dateFormat',"dd-mm-yy");
// });

var venue_location="";
$(document).ready(function () {
  $(".check-form").submit(function (e) {
    e.preventDefault();
    const start_date = $(".datepicker-1").val();
    // const end_date = $(".datepicker-2").val();
    const selection = $('#duration').val();
    const venue = $("#venue_select").val();
    console.log(start_date, selection, venue);
    // console.log(JSON.stringify({'start date': start_date, 'end date': end_date, 'venue': venue})),
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/reg",
      data: JSON.stringify({'startDate': start_date, 'selection': selection, 'venue': venue}),
      crossDomain: true,
      contentType: "application/json",
      dataType:'json',
      success: function (resultData) {
        console.log("success");
        console.log(resultData);
        if(resultData.record == 'unsuccessful')
        {
          window.alert("Date Unavailable")
          window.location.assign("C:\\Users\\HP\\Documents\\College Sem 5\\Software_Engineering\\project\\europa\\europa\\Cellindex.html");
        }
        else
        {
          window.alert("Date Available!");
          venue_location = venue;
          window.location.assign("C:\\Users\\HP\\Documents\\College Sem 5\\Software_Engineering\\project\\europa\\europa\\forms.html");
        }
      },
      error: (result) => {
        console.log("error");
        console.log(result);
      },
    });
  });
  $("#submit_form").submit(function(e){
    e.preventDefault();
    console.log("in submit")
    var name = $('#name').val();
    var phone_gmail = $('#phone_gmail').val();
    var org_nature = $('#org_nature').val();
    var event_nature = $('#event_nature').val();
    var chief_guest= $('#chief_guest').val();
    var nature_participants= $('#nature_participants').val();
    var num_participants= $('#num_participants').val();
    var meals= $('#meals').val();;
    var ticket = $('#ticket').val();
    var date = $('#date').val();
    var timmings = $('#timmings').val();
    var others = $('#others').val();
    

    var event_details = {
        'name': name,
        'phone_gmail':phone_gmail,
        'org_nature':org_nature,
        'event_nature':event_nature,
        'chief_guest':chief_guest,
        'nature_participants':nature_participants,
        'num_participants':num_participants,
        'meals':meals,
        'ticket':ticket,
        'date':date,
        'timmings':timmings,
        'others':others,
        'venue':venue_location
    }
    console.log(event_details)
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/event_details",
        data: JSON.stringify(event_details),
        crossDomain: true,
        contentType: "application/json",
        dataType:'json',
        success: function (resultData) {
          console.log("success");
          console.log(resultData);
          if(resultData.record == 'successful')
          {
            window.alert("Details Registered!")
            window.location.assign("C:\\Users\\HP\\Documents\\College Sem 5\\Software_Engineering\\project\\europa\\europa\\index.html");
          }
          else
          {
            window.alert("Details were incomplete");
            window.location.assign("C:\\Users\\HP\\Documents\\College Sem 5\\Software_Engineering\\project\\europa\\europa\\forms.html");
          }
        },
        error: (result) => {
          console.log("error");
          console.log(result);
        },
      });

})
});





(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*------------------
		Date Picker
	--------------------*/
  // $(".datepicker-1").datepicker();
  // $(".datepicker-2").datepicker();

  /*------------------
		Nice Selector
	--------------------*/
  $(".suit-select").niceSelect();

  /*------------------
        Room Slider
    --------------------*/
  var hero_s = $(".ri-sliders");
  hero_s.owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    items: 1,
    dots: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: false,
    onInitialized: function () {
      var a = this.items().length;
      $("#snh-1").html("<span>1</span><span>" + a + "</span>");
    },
  });

  /*------------------
        Milestone Counter
    --------------------*/
  $(".counter").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  /*-------------------
		Quantity change
	--------------------- */
  var proQty = $(".pro-qty");
  proQty.prepend('<span class="dec qtybtn">-</span>');
  proQty.append('<span class="inc qtybtn">+</span>');
  proQty.on("click", ".qtybtn", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass("inc")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });

  /*------------------
        Magnific Popup
    --------------------*/
  $(".pop-up").magnificPopup({
    type: "iframe",
  });
})(jQuery);
