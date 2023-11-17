

$(document).ready(function(){
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
            'others':others
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
                // window.location.assign("C:\\Users\\HP\\Documents\\College Sem 5\\Software_Engineering\\project\\europa\\europa\\index.html");
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
})
