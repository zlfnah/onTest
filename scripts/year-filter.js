$(document).ready(function(){
	$('.presentationContainer .dropdown-menu li').click(function(){
		 var urlString  = window.location.href.split('?');
		 var url = urlString[0] + '?year=' + $(this).text();
		 window.location.href = url;
	});
});