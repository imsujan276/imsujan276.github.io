/*
|--------------------------------------------------------------------------
	Light - Coming Soon HTML5 Responsive Template Main JS
|--------------------------------------------------------------------------
*/
document.addEventListener("touchstart", function() {},false);
(function ($) {
	"use strict";
/*
|--------------------------------------------------------------------------
	CountUp
|--------------------------------------------------------------------------
*/
	var austDay = new Date();
	austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 1);
	$('#defaultCountdown').countdown({until: austDay});
	$('#year').text(austDay.getFullYear());

/*
|--------------------------------------------------------------------------
	Subscribe Form
|--------------------------------------------------------------------------
*/
	//Change YOUR MAILCHIMP ACCOUNT LIST FORM ACTION URL
	$('#mc-form').ajaxChimp({
		url: 'https://mgscoder.us2.list-manage.com/subscribe/post?u=57eb49699512ae629a24aca54&id=bfa98bd8f0'
	});

/*
|--------------------------------------------------------------------------
	Contact Form
|--------------------------------------------------------------------------
*/	
	$("#contactForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitMSG(false, "Please fill in the form properly!");
		} else {
			//everything looks good!
			event.preventDefault();
			submitForm();
		}
	});
	
	function submitForm(){
		$.ajax({
			type: "POST",
			url: "contact-process.php",
			data: $( "#contactForm" ).serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					formError();
					submitMSG(false,text);
				}
			}
		});
	}
	
	function formSuccess(){
		$("#contactForm")[0].reset();
		submitMSG(true, "Your Message Submitted Successfully!")
	}
	
	function formError(){
		$(".help-block.with-errors").removeClass('hidden');
	}
	
	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

})(jQuery);

/*
|--------------------------------------------------------------------------
	Typewrite
|--------------------------------------------------------------------------
*/	
	var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

/*
|--------------------------------------------------------------------------
	overly
|--------------------------------------------------------------------------
*/
	function openAboutStyle() {
		$( "#Main" ).addClass( "slide-left" );
		$( "#About" ).addClass( "show" );
	}
	function closeAboutStyle() {
		$( "#About" ).removeClass( "show" );
		$( "#Main" ).removeClass( "slide-left" );
	}
	function openServicesStyle() {
		$( "#Main" ).addClass( "slide-dowun" );
		$( "#Services" ).addClass( "show" );
	}
	function closeServicesStyle() {
		$( "#Services" ).removeClass( "show" );
		$( "#Main" ).removeClass( "slide-dowun" );
	}	
	function openSubscribeStyle() {
		$( "#Main" ).addClass( "slide-right" );
		$( "#Subscribe" ).addClass( "show" );
	}
	function closeSubscribeStyle() {
		$( "#Subscribe" ).removeClass( "show" );
		$( "#Main" ).removeClass( "slide-right" );
	}
	function openContactStyle() {
		$( "#Main" ).addClass( "slide-up" );
		$( "#myContact" ).addClass( "show" );
	}
	function closeContactStyle() {
		$( "#myContact" ).removeClass( "show" );
		$( "#Main" ).removeClass( "slide-up" );
	}

/*
|--------------------------------------------------------------------------
	End
|--------------------------------------------------------------------------
*/