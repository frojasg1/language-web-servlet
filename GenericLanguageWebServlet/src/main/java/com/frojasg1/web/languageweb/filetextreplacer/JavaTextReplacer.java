package com.frojasg1.web.languageweb.filetextreplacer;

/*
 * By Fran Rojas (2021)
 */

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.frojasg1.web.languageweb.charset.CharsetManager;

public class JavaTextReplacer {
    private static final Logger LOGGER = LoggerFactory.getLogger(JavaTextReplacer.class);

    protected Pattern pattern = Pattern.compile( "%\\*([A-Za-z0-9_]+)\\*%" );
    protected int _depth;

    public JavaTextReplacer()
    {
    	this(1);
    }

    public JavaTextReplacer( int depth )
    {
    	_depth = depth;
    }
    
    protected String createReplacementFileName( String fileName, String language )
	{
		File file = new File( fileName );
		String result = String.format( "%s/%s/%s", file.getParent(), "languages/" + language, file.getName() + ".properties" );

		return( result );
	}

	public String replaceFileTextsFromLanguage( String fileName, String language )
	{
		return( replaceFileTexts( fileName, createReplacementFileName( fileName, language ) ) );
	}

	protected Charset getCharset( String fileName )
	{
		Charset result = StandardCharsets.UTF_8;
		try
		{
			String charsetName = CharsetManager.instance().M_detectCharset(fileName);
			if( (charsetName != null) && !charsetName.isEmpty() )
			{
				LOGGER.info( "Charset [{}] found for file: {}", charsetName, fileName );
				result = Charset.forName(charsetName);
			}
		}
		catch( Exception ex )
		{
			LOGGER.error( "Error getting charset of: " + fileName );
		}

		return( result );
	}

	public String replaceFileTexts( String fileName, String fileReplacement )
	{
		String result = null;
		try
		{
			List<String> lines = null;
			// it can be optimized
			lines = Files.readAllLines(Paths.get(fileName), getCharset(fileName));

			StringBuilder sb = new StringBuilder();
			// it can be optimized
			Properties prop = readProperties( fileReplacement );
			List<String> replacedLines = replaceLines( lines, prop );
			for(String line: replacedLines)
				sb.append(line).append("\n");

			result = sb.toString();
			
			LOGGER.info( "Success on translating file: {}, fileReplacement: {}", fileName, fileReplacement );
		}
		catch( Exception ex )
		{
			LOGGER.error( "error when translating file: {}, fileReplacement: {}", fileName, fileReplacement, ex );
		}

		return( result );
	}

	protected List<String> replaceLines( List<String> lines, Properties languageStrings )
	{
		return lines.stream().map( line -> replaceLine( line, languageStrings ) ).collect( Collectors.toList() );
	}

	protected int getDepth() // 0 means simple replacement
	{
		return _depth;
	}

	protected String replaceLine( String line, Properties prop )
	{
		String result = line;
		for( int ii=0; ii<=getDepth(); ii++ ) // to make it possible to make references from one property label to others.
			result = simpleReplaceLine(result, prop);

		return( result );
	}

	protected String simpleReplaceLine( String line, Properties prop )
	{
		String result = line;
		String key = null;
		try
		{
			Matcher matcher = pattern.matcher(line);
			int pos = 0;
			StringBuilder sb = null;
			int length = line.length();
			while( (pos < length ) && matcher.find(pos) )
			{
				if( sb == null )
					sb = new StringBuilder();
				int newPos = matcher.start();
				sb.append( line.substring(pos, newPos) );
				key = matcher.group(1);
				String value = prop.getProperty(key);
				sb.append(value);
				pos = matcher.end();
			}

			if( sb != null )
			{
				if( pos < length )
					sb.append( line.substring( pos, length ) );

				result = sb.toString();
			}
		}
		catch( Exception ex )
		{
			throw( new RuntimeException( String.format( "Error replacing line: %s. Latest key: %s, errorMessage: %s",
					line, key, ex.getMessage() ), ex ) );
		}

		return( result );
	}

	protected Properties readProperties( String fileName )
	{
		Properties result = new Properties();
		Charset charset = getCharset(fileName);
		try( FileInputStream fis = new FileInputStream(fileName);
				InputStreamReader isr = new InputStreamReader(fis, charset) )
		{
			result.load(isr);
		}
		catch( Exception ex )
		{
			throw new RuntimeException( String.format( "Error reading properties file: %s", fileName ), ex );
		}
		return( result );
	}
}
