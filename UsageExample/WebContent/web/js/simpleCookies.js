
/////////////////////////////////////////////////////
// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
/////////////////////////////////////////////////////
// simple cookies
function setSimpleCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getSimpleCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return undefined;
}

function eraseSimpleCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

///////////////////////////////////////////////////////

function setSimpleCookieSafely( name, value )
{
	if( areCookiesAccepted() )
		setSimpleCookie( name, value, 30 );
}


function setLanguageCookie( language )
{
	setSimpleCookieSafely( "language", language );
}

function getLanguageCookie()
{
	return( getSimpleCookie( "language" ) );
}










