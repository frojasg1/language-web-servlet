/*
	Necesita Jquery
*/

/*
var G__FUN_COM_lastOrientation;

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

function isPrefix( string, prefix )
{
	var result = false;
	if( string.length >= prefix.length )
	{
		if( string.substring( 0, prefix.length ) === prefix )
			result = true;
	}
	return( result );
}

function extraeRestoDeCadena( string, prefix )
{
	var result = "";
	if( isPrefix( string, prefix ) )
		result = string.substring( prefix.length, string.length );

	return( result );
}

function getArrayOfClasses( elem )
{
	var classes = elem.prop( "class" );
	var array = classes.split( " " );

	return( array );
}

function hasClass( elem, class_ )
{
	var array = getArrayOfClasses( elem );

	var found = false;
	var ii;
	for( ii=0; !found && ( ii< array.length ); ii++ )
		found = ( class_ === array[ii] );

	return( found );
}

function addClassFirst( elemento, clase )
{
	var classes = elemento.prop( "class" );
	if( classes != "" )
		elemento.removeClass( classes ).addClass( clase + " " + classes );
	else
		elemento.addClass( clase );
}


// incluye la "#" del id de la url.
function getHashOfUrl( url )
{
	var index1 = url.indexOf( "#" );
	var index2 = url.indexOf( "?" );
	
	if( ( index2 < 0 ) || ( index2 > url.length ) )
	{
		index2 = url.length;
	}

	var result = "";
	if( ( index1 >= 0 ) && ( index1 < (url.length-1) ) )
	{
		if( index1 < index2 )
			result = url.substring( index1, index2 );
	}

	return( result );
}

function getOrientation()
{
	var result = "landscape";
	if( window.innerHeight > window.innerWidth )
	{
		result = "portrait";
	}
	return( result );
}

// splits the url into the pure url part (without query), and the query part, returning both strings in the result
function splitUrlIntoPureUrlPlusQuery( url )
{
	var result = {};

	result["urlWithoutQuery"]=url;

	var index = url.indexOf( '?' );

	if( ( index >= 0 ) && ( index < (url.length - 1) ) )
	{
		result["searchString"] = url.substring( index + 1 );
		result["urlWithoutQuery"]=url.substring( 0, index );
	}

	return( result );
}

// the function returns:
//    result["urlWithoutQuery"]    	-----> pure url part
//    result["searchString"]    	-----> search string ( if any )
//    result["searchObject"]    	-----> search object ( if there was searchString )
function getSearchQueryOfURLInJsonObject( url )
{
	var result = splitUrlIntoPureUrlPlusQuery( url );
	var searchString = result["searchString"];
	
	result["searchObject"] = searchString?JSON.parse('{"' + searchString.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
                 function(key, value) { return key===""?value:decodeURIComponent(value) }):{}

	return( result );
}

// this function keeps the pure url part of the url, and set the query part given by the jsonObject
function setQueryPartOfUrl( url, jsonObject )
{
	var searchObject = splitUrlIntoPureUrlPlusQuery( url );
	var resultUrl = searchObject["urlWithoutQuery"];

	if( ( jsonObject !== undefined ) && ( Object.keys( jsonObject ).length > 0 ) )
	{
		resultUrl += "?";
		resultUrl += $.param( jsonObject );
	}

	return( resultUrl );
}

// adds or replaces a set of pairs of key/value in the query part (get) of an url.
function addOrReplaceQueryUrlObject( url, jsonObject )
{
	var searchObject = getSearchQueryOfURLInJsonObject( url );
	var resultUrl = searchObject["urlWithoutQuery"];

	if( jsonObject !== undefined )
	{
		if( searchObject["searchObject"] === undefined )
			searchObject["searchObject"] = {};

		var keys = Object.keys( jsonObject );
		var ii;
		for( ii=0; ii<keys.length; ii++ )
		{
			var key = keys[ii];
			var value = jsonObject[key];
			searchObject["searchObject"][key] = value;
		}

		resultUrl = setQueryPartOfUrl( url, searchObject["searchObject"] );
	}

	return( resultUrl );
}

function addOrReplaceQueryUrlValue( url, key, value )
{
	var object = {};
	object[key] = value;
	return( addOrReplaceQueryUrlObject( url, object ) );
}

function cutUrlToUntilHtml( url )
{
	var result = url;

	var index1 = url.indexOf( "?" );
	var index2 = url.indexOf( "#" );

	index1 = ( (index1 == -1) ? (url.length) : index1 );
	index2 = ( (index2 == -1) ? (url.length) : index2 );

	var index = ( ( index1 < index2 ) ? index1 : index2 );

	var result = url.substring( 0, index );

	return( result );
}

function encodeQueryString( queryStringObject )
{
	var result = "";
	
	var keys = Object.keys( queryStringObject );
	
	if( ( keys !== undefined ) && ( keys.length > 0 ) )
	{
//		result += "?";
		
		var ii;
		for( ii=0; ii<keys.length; ii++ )
		{
			if( ii > 0 )
				result += "&";
			
			result += keys[ii];
			result += "=";
			result += encodeURIComponent( queryStringObject[keys[ii]] );

//			alert( result );
		}
	}

	return( result );
}


function getValueFromUrl( url, key )
{
	var searchObject = getSearchQueryOfURLInJsonObject( url );

	return( searchObject["searchObject"][key] );
}

function creaUrlConParametrosCustom( arrayParams, idioma, urlActual )
{
	var idiomaTmp = idioma;
	var queryStringObject = {};

	if( urlActual === undefined )
		urlActual = location.href;

	queryStringObject = getSearchQueryOfURLInJsonObject( urlActual )["searchObject"];

	if( idiomaTmp === undefined )
	{
		idiomaTmp = queryStringObject['language'];
	}
	else
	{
		queryStringObject['language']=idiomaTmp;
	}

	var keys = Object.keys( arrayParams );
	var ii;
	for( ii=0; ii<keys.length; ii++ )
	{
		var key = keys[ii];
		var value = arrayParams[key];

		if( ( value !== undefined ) && ( value !== "" ) )
			queryStringObject[key]=value;
		else if( queryStringObject[key] !== undefined )
			delete queryStringObject[key];
	}
	

	var queryStringForUrl = "";

//	alert( Object.keys( queryStringObject ).length );

//	alert( '$.param( queryStringObject ) = ' + $.param( queryStringObject ) );

	if( Object.keys( queryStringObject ).length > 0 )
		queryStringForUrl = "?" + $.param( queryStringObject );
//		queryStringForUrl = "?" + encodeQueryString( queryStringObject );

//	var result = cutUrlToUntilHtml( location.href ) + "#" + dameUltimoIdMenuPestanyasSeleccionadoDeIdElemento( id ) + queryStringForUrl;
	var result = cutUrlToUntilHtml( urlActual ) + queryStringForUrl;

	return( result );
}


function creaUrlParaIdActual( id, idioma, urlActual )
{
	var arrayParams = { "id":id };

	return( creaUrlConParametrosCustom( arrayParams, idioma, urlActual ) );
}

function getFirstClass( elem )
{
	var result = elem.prop( "class" );
	if( result !== undefined )
	{
		var classes = result.split( " " );
		if( classes.length > 0 )
			result = classes[0];
	}

	return( result );
}

function hasVerticalScrolls( elem )
{
	var result = false;
	
	if( elem.scrollTop() > 0 )
		result = true;
	else
	{
		elem.scrollTop( 1 );
		result = ( elem.scrollTop() > 0 );

		elem.scrollTop( 0 );
	}

	return( result );
}

function getOffsetParent( elem )
{
	var result = undefined;

	if( ( elem !== undefined ) && !elem.is( "html" ) )
	{
		elem = elem.parent();
		while( (elem !== undefined) && ( result === undefined ) )
		{
			if( ( elem.is( "html" ) ) || hasVerticalScrolls( elem ) )
				result = elem;
			else
				elem = elem.parent();
		}
	}

	return( result );
}

function getOffsetTop( elem )
{
	var result = undefined;

	if( elem !== undefined )
	{
		var offsetParent = getOffsetParent( elem );
		result = 0;
		while( elem.get(0) !== offsetParent.get(0) )
		{
			result = result + elem.position()["top"];

			elem = elem.offsetParent();
		}
	}

	return( result );
}

function maxFun( value1, value2 )
{
	return( (value1 > value2) ? value1 : value2 );
}

function minFun( value1, value2 )
{
	return( (value1 < value2) ? value1 : value2 );
}

function absFun( value )
{
	return( (value > 0 ) ? value : -value );
}

function limitValue( value, minVal, maxVal )
{
	var result = maxFun( value, minVal );

	result = minFun( result, maxVal );

	return( result );
}


function getHtml( elem )
{
	return( $("<div />").append( elem.clone() ).html() );
}

function dameDimensionesBackgroundImage( elem, callbackFunction )
{
	var bg = elem.css('background-image');
	bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "").replace(/^\./gi, "" );

	dameDimensionesImagenFromUrl( bg, callbackFunction );
}

function restringeImagen( imgElem, tamanyoMaximo )
{
	dameDimensionesImage( imgElem, function( elem, result ) {
		if( result !== undefined )
		{
			var horizFactor = tamanyoMaximo["width"] / result["width"];
			var vertFactor = tamanyoMaximo["height"] / result["height"];

			var imageSizeFactor = horizFactor;
			if( vertFactor < horizFactor )
				imageSizeFactor = vertFactor;

			elem.width( result["width"] * imageSizeFactor );
			elem.height( result["height"] * imageSizeFactor );
		}
	});
}

// https://stackoverflow.com/questions/178325/how-do-i-check-if-an-element-is-hidden-in-jquery
function isVisible( elem )
{
	return( elem.is(":visible") );
}

function dayDiff( date1, date2 )
{
	var numberOfDays = Math.trunc( ( date2 - date1 ) / 86400000 );

	return( numberOfDays );
}

function getTodaysDate()
{
	var result = new Date();
	result.setHours(0);
	result.setMinutes(0);
	result.setSeconds(0);

	return( result );
}

function createOptionHtml( value, selected, $text )
{
	var html = '<option value="' + value + '"';
	
	if( ( selected !== undefined ) && ( selected != "" ) )
	{
		html += ' selected="' + selected + '"';
	}
	
	html += '>' + $text + "</option>\n";
	
	return( html );
}


function getWidthOfHtmlContents( elem )
{
	var result = 0;
	elem.children().each( function () {
		$this = $(this);
		if( $this.width() > result )
			result = $this.width();
	});
	return( result );
}


function getInnerWidth(elem)
{
	return( elem.innerWidth() );
}

// dameUrlActual function must be implemented specifically for every page.
function dameUrlActual_comun()
{
	var urlActual = location.href;
	if( typeof( dameUrlActual ) === "function" )
		urlActual = dameUrlActual();

	return( urlActual );
}

function creaEntradaEnHistorico()
{
	var nuevaUrl = dameUrlActual_comun();
	history.pushState( {}, "automatic", nuevaUrl );
}


// selectElem is a jquery selection of a select element
function fillInTranslatedSelect( selectElem, arrayOfItems, selectedItem )
{
	var arrayOfTexts = [];
	var ii=0;
	var currentItem;

	if( !( arrayOfItems === undefined ) )
	{
		var ii;
		for( var ii=0; ii<arrayOfItems.length; ii++ )
		{
			currentItem = arrayOfItems[ii];
			var $text = dameTextoIdioma( currentItem );
			arrayOfTexts.push( $text );
		}
	}

	fillInSelect( selectElem, arrayOfItems, arrayOfTexts, selectedItem );
}

// selectElem is a jquery selection of a select element
function fillInSelect( selectElem, arrayOfItems, arrayOfTexts, selectedItem )
{
	selectElem.empty();

	var ii=0;
	var currentItem;
	var selected = "";

	if( !( arrayOfItems === undefined ) )
	{
		var ii;
		for( var ii=0; ii<arrayOfItems.length; ii++ )
		{
			currentItem = arrayOfItems[ii];

			if( ( selectedItem !== undefined ) &&
				( selectedItem !== "" ) )
			{
				if( selectedItem === currentItem )
					selected = "selected";
				else
					selected = "";
			}
			else if( ii=== 0 )
				selected = "selected";

			var $text = arrayOfTexts[ii];
			var optionHtml = createOptionHtml( currentItem, selected, $text );
			selected = "";
			selectElem.append( optionHtml );
		}
	}

	selectElem.data("prev", selectElem.val() );
}

// https://gist.github.com/spyesx/b58d61f280fae9f2f95a
function getClassesRegEx( elem, regex )
{
	var result = [];

	var classes = elem.attr('class');

	if(!classes || !regex)
	{
		return( result );
	}

	classes = classes.split(' ');
	var len = classes.length;

	var ii;
	for( ii=0; ii<len; ii++)
	{
		if(classes[ii].match(regex))
		{
			result.push( classes[ii] );
		}
	}

	return result;
}

function getSingleIdSelector( initialSelector )
{
	var result = $( initialSelector ).attr( 'id' );

	if( result === undefined )
		result = initialSelector;
	else
		result = "#" + result;

	return( result );
}

function deepCopy( input )
{
	var result = undefined;
	var type = typeof( input );
	if( type === "object" )
	{
		result = {};
		
		var keys = Object.keys( input );
		var ii=0;
		for( ii=0; ii<keys.length; ii++ )
			result[keys[ii]] = deepCopy( input[keys[ii]] );
	}
	else if( type === "array" )
	{
		result = [];
		var ii=0;
		for( ii=0; ii<input.length; ii++ )
			result.push( deepCopy( input[ii] ) );
	}
	else
	{
		result = input;
	}

	return( result );
}


function getCSSvariableValue( elem, variableName )
{
//	var bodyStyles = window.getComputedStyle(document.body);
	var bodyStyles = window.getComputedStyle( elem.get(0) );
	var value = bodyStyles.getPropertyValue(variableName);

	return( value );
}

function getImageFactor( elem )
{
	var imageSizeFactorStr = getCSSvariableValue( elem, "--image_size_factor" );

	var factor
	if( imageSizeFactorStr === undefined )
		factor = 1.0;
	else
	{
		factor = parseFloat( imageSizeFactorStr );
		if( factor === NaN )
			factor = 1.0;
	}

	return( factor );
}

function redimensionaImagen( imgElem, imageSizeFactor )
{
	if( (imageSizeFactor !== undefined) && ( imageSizeFactor !== 1.0 ) )
	{
		dameDimensionesImage( imgElem, function( elem, result ) {

			if( result !== undefined )
			{
				elem.width( result["width"] * imageSizeFactor );
				elem.height( result["height"] * imageSizeFactor );
			}
		});
	}
}

function dameDimensionesImage( imgElem, callbackFunction )
{
	var url = imgElem.attr('src');

	dameDimensionesImagenFromUrl( url, function( result ) {

		if( result !== undefined )
		{
			var transform = getTransform( imgElem );
			var scale = getScaleFromTransform( transform );
			if( scale !== undefined )
			{
				result["width"]=result["width"] * scale;
				result["height"]=result["height"] * scale;
			}
		}

		callbackFunction( imgElem, result );
	} );
}

function dameDimensionesImagenFromUrl( url, callbackFunction )
{
	var img = new Image();

	img.onload = function() {
		
		var result = {};
		result["width"]=img.width;
		result["height"]=img.height;

		callbackFunction( result );
	};

	img.onerror = function() {
		
		callbackFunction();
	};

	img.src=url;
}

function getTransform( elem )
{
	return( elem.css("-webkit-transform") ||
			elem.css("-moz-transform")    ||
			elem.css("-ms-transform")     ||
			elem.css("-o-transform")      ||
			elem.css("transform") );
}

function getScaleFromTransform( transformString )
{
	var result;

	var regExp = new RegExp( "^matrix *\\( *(.*) *\\)$" );
	
	if( transformString.match( regExp ) )
	{
		var tmp = transformString;

		var matrixElems = tmp.replace( regExp, "$1" ).replace( / /g, "" ).split(',');

		if( ( matrixElems.length > 3 ) && (matrixElems[0] === matrixElems[3] ) )
			result = parseFloat( matrixElems[0] );
	}

	return( result );
}
*/

function hideElement( elem )
{
	elem.hide().css("visibility", "hidden");
}

function showElement( elem )
{
	elem.show().css("visibility", "visible");
}

