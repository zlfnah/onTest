var currentPage;

$(document).ready(function(){
	
	initialize();
	
	$('.showmoreButton a').click(function(){
		getEvent();
	});
});

function initialize() {
	currentPage = 1;
	var lastDropdownItem = '';
	$('.dropdown-menu li').each(function(){
		 if(lastDropdownItem==$(this).text())
		{
			$(this).remove();		 
		}
		else
		{
			lastDropdownItem = $(this).text();		
		}
	});
}

function getEvent()
{
	currentPage++;
	$('.showmoreButton a').button('loading');
	setTimeout(function(){
		ajax();
		checkEvent(currentPage+1);
	},400);
}
	

function ajax()
{
    var url = window.location.href + '&page='+currentPage;
	
	if(getUrlVars()['year'] ==undefined)
	{
		url = window.location.href + '?page='+currentPage;
	}
	
	$.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            var dom = $(data);
			var eventList = dom.find('#presentationList .presentationItem');
			$(eventList).each(function(){
				$('#presentationList').append(this);
			});
			$('.showmoreButton a').button('reset');
		},
		error:function(){
			$('.showmoreButton a').button('reset');
			alert('fail');
		}
   });
}

function checkEvent(page)
{
    var url = window.location.href + '&page='+page;
	if(getUrlVars()['year'] ==undefined)
	{
		url = window.location.href + '?page='+page;
	}
	
	$.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            var dom = $(data);
			var eventList = dom.find('#presentationList .presentationItem');
			if(eventList.length < 1)
			{
				$('.showmoreButton').remove();
			}
		}
   });
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}