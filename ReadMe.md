# language-web-servlet
## _Simple java library for tomcat that helps with multi-language html web sites_

[![N|Solid](https://frojasg1.com:8443/downloads_web/web/images/web_icon.ico)](https://frojasg1.com:8443/downloads_web/web/index.html)

This library eases the designing of simple html multi-language web pages.

The idea is simple:

- Create a template of the html to convert to multilanguage.
- Create properties files with keys to ve replaced in the template for every language.

## Procedure

- Once you have the valid html
- Just replace the language depending texts by labels, with format: /\*LABEL\*/
- Those labels will be placed as keys in a properties file for every language
- A generic base class Servlet: LanguageWebGenServlet works by taking the html template (with the texts replaced by labels), and, with the language of the request, replace Labels for texts.
- You will have to create a derived class of that servlet, with the particular location of your html template


## Example

There is a usage example at folder ./UsageExample/

## Dependencies

language-web-servlet uses some dependencies:

- [juniversalchardet 1.0.3](https://mvnrepository.com/artifact/com.googlecode.juniversalchardet/juniversalchardet/1.0.3) - Library for detecting charsets of text files.
- [jquery.cookiebar plugin](https://www.primebox.co.uk/projects/jquery-cookiebar/) - cookie bar
- [jQuery] - duh

And of course language-web-servlet itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Just compile the sources:

```sh
cd Folder
mvn clean install
```

And add the dependency to your Java application

    <dependency>
        <groupId>com.frojasg1</groupId>
        <artifactId>language-web-servlet</artifactId>
        <version>v1.0-SNAPSHOT</version>
    </dependency>


## License

Free software

But you have to comply with the licenses of dependencies.
If you want to use the flag icons, you will have to buy them at: [iconfinder]

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [jQuery]: <http://jquery.com>
   [iconfinder]: <https://www.iconfinder.com/>