function dispatchEnquiry(event) {
    event.preventDefault();
    var name = $('#contact-form input[name=name]').val();
    var email = $('#contact-form input[name=email]').val();
    var companyName = $('#contact-form input[name=company]').val();
    var jobTitle = $('#contact-form input[name=jobTitle]').val();
    var jiraTier = $('#contact-form select[name=jiraTier]').val();
    var jiraId = $('#contact-form input[name=jiraId]').val();
    var hidden = $('#contact-form input[name=additionalField]').val();

    var data = {
        'name': name,
        'email': email,
        'company': companyName,
        'tier': jiraTier,
        'id': jiraId,
        'hidden': hidden
    };

    console.log(data);

    if ($('#contact-form').form('is valid')) {
        $('#contact-form').addClass('loading');
        console.log('form submitted');
        $.ajax({
            url: 'http://try-behave-pro-contact.elasticbeanstalk.com/submit/enquiry/',
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(req) {
                console.log(req);
                if (req.success) {
                    $('#contact-form').removeClass('loading').addClass('success');
                    $('#contact-form input[name=submit]').attr('disabled', 'disabled');
                    setTimeout(function() {
                        location.assign('/form-submission/success#server-eval');
                    }, 800);
                } else {
                    $('#contact-form').removeClass('loading').removeClass('success').addClass('error');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        });
    }
}