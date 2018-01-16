function hideerror()
{
	$(".formError").remove();
}
function hidemsg()
{
	$(".contact-success").remove();
}
		
function checkEmail(id) {
	var email = document.getElementById(id);
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email.value)) {				
		return false;
	}
	return true;
}

function checkNull(id, mess, defaultvalue, left, top){
	var name = $('#'+id).val();
	if(name=='' || name==defaultvalue){
		if($('#error_'+id).length>0){
			$('#error_'+id).html(mess);
		}else{
			$('#'+id).after('<div class="nameformError parentFormfrm_contact formError" style="left: '+left+'px; margin-top: '+top+'px; opacity: 0.8;"><div id="error_'+id+'" class="formErrorContent">'+mess+'<br></div><div class="formErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3n"></div><div class="line2n"></div><div class="line1"></div></div></div>');
		}
		return false;
	}
	
	return true;
}

function checkMail(id, mess, defaultvalue, left, top){
	if(!checkEmail(id)){
		if($('#error_'+id).length>0){
			$('#error_'+id).html(mess);
		}else{
			$('#'+id).after('<div class="nameformError parentFormfrm_contact formError" style="left: '+left+'px; margin-top: '+top+'px; opacity: 0.8;"><div id="error_'+id+'" class="formErrorContent">'+mess+'<br></div><div class="formErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3n"></div><div class="line2n"></div><div class="line1"></div></div></div>');
		}
		return false;
	}
	
	return true;
}

function checkCaptcha(id, mess, defaultvalue, left, top){
	var captcha = $('#'+id).val();
	var captcha_bk = $('#'+id+'_bk').val();
	
	if(captcha!=captcha_bk ){
		if($('#error_'+id).length>0){
			$('#error_'+id).html(mess);
		}else{
			$('#'+id).after('<div class="nameformError parentFormfrm_contact formError" style="left: '+left+'px; margin-top: '+top+'px; opacity: 0.8;"><div id="error_'+id+'" class="formErrorContent">'+mess+'<br></div><div class="formErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3n"></div><div class="line2n"></div><div class="line1"></div></div></div>');
		}
		return false;
	}
	
	return true;
}
