package com.frojasg1.web.languageweb.servlet;

/*
 * By Fran Rojas (2021)
 */

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.frojasg1.web.languageweb.filetextreplacer.JavaTextReplacer;


/**
 * Servlet implementation class DownloadsServlet
 */
public abstract class LanguageWebGenServlet extends HttpServlet {
//	private static final long serialVersionUID = 1L;
    private static final Logger LOGGER = LoggerFactory.getLogger(LanguageWebGenServlet.class);

	protected String _htmlTemplateFileName;
	protected String _defaultLanguageDirname;

	protected Map<String, String> _languagesMap;

	protected JavaTextReplacer _textReplacer;

	/**
     * @see HttpServlet#HttpServlet()
     */	
    public LanguageWebGenServlet( String htmlTemplateFileName, String defaultLanguageDirname ) {
        super();
        // TODO Auto-generated constructor stub

        _htmlTemplateFileName = htmlTemplateFileName;
        _defaultLanguageDirname = defaultLanguageDirname;
    }

    /**
     * Initialize the servlet.
     * @see HttpServlet#init().
     */
    @Override
    public void init() throws ServletException {
    	_languagesMap = createLanguagesMap();
    	_textReplacer = createTextReplacer();
    	initLanguagesMap(_languagesMap);
    }
    
    protected JavaTextReplacer createTextReplacer() {
    	return( new JavaTextReplacer() );
    }
    
    protected JavaTextReplacer getTextReplacer() {
    	return( _textReplacer );
    }

    protected void initLanguagesMap( Map<String, String> map )
    {
    	map.put( "es", "Espanyol" );
    	map.put( "ca", "Catala" );
    	map.put( "en", "English" );
    }

    protected Map<String, String> createLanguagesMap()
    {
    	return new HashMap<>();
    }

    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		ServletContext servletContext = getServletContext();
		String contextPath = servletContext.getRealPath(File.separator);

//    	String downloadResource = normalizeDownloadResourceName( req );

//		contextPath = contextPath.substring( 0, contextPath.lastIndexOf( req.getContextPath().substring( 1 ) ) );

		String webRoot = getWebRoot( req );

		String language = req.getParameter( "language" );

		String html = getHtmlForLanguage( contextPath, language, readCookie( req, "language" ),
											getDefaultLanguage(req), getDefaultLanguage() );

		doAnswer( resp, html );
	}

	protected void prepareResponseBeforeAnswering(HttpServletResponse resp)
	{
		resp.setContentType("text/html; charset=UTF-8");
	}

	protected void doAnswer(HttpServletResponse resp, String answer) throws IOException
	{
		prepareResponseBeforeAnswering(resp);
		resp.getWriter().write(answer);
	}

	protected String getHtmlTemplateFileName()
	{
		return( _htmlTemplateFileName );
	}

	protected String getDefaultLanguage()
	{
		return( _defaultLanguageDirname );		
	}

	protected String getHtmlForLanguage( String contextPath, String ... languages)
	{
		String result = null;
		for( String language: languages )
		{
			result = getTextReplacer().replaceFileTextsFromLanguage( contextPath + "/" + getHtmlTemplateFileName(), language);
			if( result != null )
				break;
		}

		return( result );
	}

	protected String getDefaultLanguage( HttpServletRequest request )
	{
		String result = null;

		// https://stackoverflow.com/questions/15492750/detect-browser-language-in-java/34733857
        Enumeration locales = request.getLocales();
        while (locales.hasMoreElements()) {
             Locale locale = (Locale) locales.nextElement();

             String languageCode = locale.getLanguage().split( "-" )[0];

             result = _languagesMap.get(languageCode);
             if( result != null )
            	 break;
        }

		return result;
	}


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	throws ServletException
	{
		try
		{
			request.setCharacterEncoding("UTF-8");
			chain.doFilter(request, response);
		}
		catch( Throwable th )
		{
			throw( new ServletException( th.getMessage() ) );
		}
	}
/*
	protected String normalizeDownloadResourceName( HttpServletRequest req )
	{
		String context = req.getContextPath();
		String uri = req.getRequestURI();

		String result = "";
		if( uri.substring( context.length(), context.length() + (new String( "/downloadServlet" ) ).length() ).compareTo("/downloadServlet") == 0 )
		{
			result = uri.substring( context.length() + (new String( "/downloadServlet" ) ).length() );
		}
		return( result );
	}
*/

	protected String getWebRoot( HttpServletRequest req )
	{
		String url = new String( req.getRequestURL() );
		String context = req.getContextPath();

		int index = url.indexOf( context );

		String rootFolder = url.substring( 0, index + context.length() );

		return( rootFolder );
	}

	// https://www.baeldung.com/java-servlet-cookies-session
	public String readCookie(HttpServletRequest request, String key) {
		String result = null;
		Cookie[] cookies = request.getCookies();

		if( cookies != null )
			result = Arrays.stream(cookies)
				      .filter(c -> key.equals(c.getName()))
				      .map(Cookie::getValue)
				      .findAny().orElseGet( () -> null );

	    return( result );
	}
}
