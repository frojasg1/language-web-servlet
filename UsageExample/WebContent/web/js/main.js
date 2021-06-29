/*
	Necesita Jquery
	Necesita funciones.comunes.js
*/

function registerActionListener()
{
	$( '#execute' ).on( 'click', function(evt) {
		alert( dameTextoIdioma( "notice" ) )
		return false;
	});
}

$(document).ready( function() {
	if( typeof inicializaIdioma === "function" )
		inicializaIdioma();

	registerActionListener();

	var language = getLanguageOfPage();
	activateCookiesBanner( language );
	setLanguageCookie( language );
});
