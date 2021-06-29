package com.frojasg1.emailtesterweb.servlet;

/*
 * By Fran Rojas (2021)
 */

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.frojasg1.web.languageweb.servlet.LanguageWebGenServlet;

/**
 * Servlet implementation class LanguageServlet
 */
@WebServlet("/web/languageServlet")
public class LanguageServlet extends LanguageWebGenServlet {
	private static final long serialVersionUID = 1L;
    private static final Logger LOGGER = LoggerFactory.getLogger(LanguageServlet.class);

	protected static final String TEMPLATE_FILENAME = "web/languageServlet.template.html";
	protected static final String DEFAULT_LANGUAGE = "English";

	/**
     * @see HttpServlet#HttpServlet()
     */
    public LanguageServlet() {
        super(TEMPLATE_FILENAME, DEFAULT_LANGUAGE);
        // TODO Auto-generated constructor stub
    }

	@Override
    public void init() throws ServletException {
		super.init();

		LOGGER.info( "LanguageServlet home dir ----> {}", new File( "." ).getAbsolutePath() );
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
