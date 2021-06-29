
function activateCookiesBanner( language )
{
	console.log( "typeof(true)" + " " + typeof( true ) ); 

	if( ! areCookiesAccepted() )
	{
		showElement( $('.cookie-message') );
		$('.my-close-button').click( function() {
						acceptCookies( language );
						$('.cookie-message').slideUp();
						return( false ); });
	}
}

function isCookieEmpty( value )
{
	var result = false;
	result = ( (value === undefined) || ( value === "false" ) );

	return( result );
}

function areCookiesAccepted()
{
	var result = false;
	var cookiesAccepted = getSimpleCookie( 'cookiesAccepted' );

	result = !isCookieEmpty( cookiesAccepted );

	return( result );
}

function acceptCookies( language )
{
	setSimpleCookie( "cookiesAccepted", "true" );
	setLanguageCookie( language );
}

function getCookie( name )
{
	return( getSimpleCookie( name ) );
}

