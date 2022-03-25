var currentPage;

$(document).ready(function(){
	initialize();

	$('.showmoreButton a').click(function(){
		getEvent();
	});
});

function initialize() {
	currentPage = 1;
}

function getEvent()
{
	currentPage++;
	$('.showmoreButton a').button('loading');
	setTimeout(function(){
		ajax();
		checkEvent(currentPage+1);
	},600);
}
	

function ajax()
{
    var url = window.location.href + '&page='+currentPage;
	if(getUrlVars() == 'year')
	{
		if(getUrlVars()['year'] ==undefined)
		{
			url = window.location.href + '?page='+currentPage;
		}
	}
	else if(getUrlVars() == 'tag')
	{
		if(getUrlVars()['tag'] ==undefined)
		{
			url = window.location.href + '?page='+currentPage;
		}
	}
	else if(getUrlVars() == window.location.href)
	{
		url = window.location.href + '?page='+currentPage;
	}

	$.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            var dom = $(data);
			var newsList = dom.find('.newslistContainer .newslist');
			$(newsList).each(function(){
				$('.newslistContainer').append(this);
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
	if(getUrlVars() == 'year')
	{
		if(getUrlVars()['year'] ==undefined)
		{
			url = window.location.href + '?page='+page;
		}
	}
	else if(getUrlVars() == 'tag')
	{
		if(getUrlVars()['tag'] ==undefined)
		{
			url = window.location.href + '?page='+page;
		}
	}
	else if(getUrlVars() == window.location.href)
	{
		url = window.location.href + '?page='+page;
	}

	$.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            var dom = $(data);
			var newsList = dom.find('.newslistContainer .newslist');
			if(newsList.length < 1)
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