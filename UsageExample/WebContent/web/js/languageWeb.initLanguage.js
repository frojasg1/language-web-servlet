// changeFileName:"onlineCalculator.initLanguage.20210626_01.js"

var __language_strings__={};

function dameTextoIdioma( key )
{
	return( __language_strings__[key] );
}

function changeLanguage( idioma )
{
	__language_strings__= getLanguageStrings();
}


function inicializaIdioma()
{
	var idioma = getLanguageOfPage();

	changeLanguage( idioma );

	init_touchHandler();
};

