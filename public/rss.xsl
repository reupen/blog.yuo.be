<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
  version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:yuo-be="http://blog.yuo.be/rss/2026"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>Web feed – <xsl:value-of select="/rss/channel/title"/></title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/rss.css" rel="stylesheet" />
      </head>
      <body>
        <div>
            <h1>
              <xsl:value-of select="/rss/channel/title" /> – Web feed
            </h1>
          <p>
            This is an RSS web feed of posts on this blog.
            Subscribe by copying this URL into a compatible RSS app or service:
          </p>
          <input aria-label="RSS feed URL">
            <xsl:attribute name="value">
              <xsl:value-of select="/rss/channel/yuo-be:canonicalUrl" />
            </xsl:attribute>
          </input>
          <p>
            Visit <a href="https://aboutfeeds.com">About Feeds</a> to find out more about web feeds.
          </p>

            <h2>About the site</h2>
            <p><xsl:value-of select="/rss/channel/description" /></p>
            <a>
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link" />
              </xsl:attribute>
              Visit website &#x2192;
            </a>
          <h2>Recent posts</h2>
          <xsl:for-each select="/rss/channel/item">
            <div>
              <h3>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </h3>
              <small>
                <time>
                  <xsl:attribute name="datetime"
                    ><xsl:value-of select="yuo-be:pubDateIso"
                  /></xsl:attribute>
                  <xsl:value-of select="yuo-be:pubDateFormatted" />
                </time>
              </small>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
