package com.frojasg1.web.languageweb.charset;

/*
 * By Fran Rojas (2021)
 */

public class PairDescriptionCharset {
	protected String a_description;
	protected String a_charsetName;

	public PairDescriptionCharset( String description, String charsetName )
	{
		a_description = description;
		a_charsetName = charsetName;
	}

	@Override
	public String toString()
	{
		return( a_description );
	}

	public String M_getCharsetName()
	{
		return( a_charsetName );
	}

	void setDescription( String description )
	{
		a_description = description;
	}

	void setCharsetName( String charsetName )
	{
		a_charsetName = charsetName;
	}
}
