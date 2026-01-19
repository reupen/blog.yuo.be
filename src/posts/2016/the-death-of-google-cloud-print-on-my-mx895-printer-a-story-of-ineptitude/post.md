---
title:
  "The death of Google Cloud Print on my MX895 printer: a story of ineptitude"
slug: the-death-of-google-cloud-print-on-my-mx895-printer-a-story-of-ineptitude
date: 2016-01-17T21:51:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-277
excerpt: |-
  I bought a Canon PIXMA MX895 all-in-one printer in May 2012. In fact, I was one
  of the first owners of the printer in the UK, having pre-ordered it the previous
  month. The printer was on sale from then until around April 2013.

  One of the features the printer had was Google Cloud Print. The printer didn't
  support it out of the box – it needed a firmware update to add support for it
  (although it was available on day one). And, since then, I used the Cloud Print
  feature sporadically.

  Fast-forward
---

I bought a Canon PIXMA MX895 all-in-one printer in May 2012. In fact, I was one
of the first owners of the printer in the UK, having pre-ordered it the previous
month. The printer was on sale from then until around April 2013.

One of the features the printer had was Google Cloud Print. The printer didn't
support it out of the box – it needed a firmware update to add support for it
(although it was available on day one). And, since then, I used the Cloud Print
feature sporadically.

Fast-forward to late last year. I tried to use Google Cloud Print, but all I got
was useless error messages from the printer about it not being able to connect
to the server. Suspecting something was up, I set about Googling and can came
across
[this discussion](https://productforums.google.com/forum/#!topic/chromebook-central/aJLUT42t4g4).
As it transpired. Google
[deprecated the authentication API](https://developers.google.com/identity/protocols/AuthForInstalledApps)
the device was using in April 2012, before there was even any stock of the
printer in the UK. And, while Canon have released firmware updates for more
recent models, for some models Canon will not release updated firmware,
[stating in a support article dated 1 September 2015](http://www.canon-europe.com/support/consumer_products/products/fax__multifunctionals/inkjet/pixma_mx_series/pixma_mx895.aspx?type=faq&search=1&gsa_support_product=PIXMA%20MX895&q=cloud&searchurl=/support/consumer_products/content/faq/?itemid=tcm:13-1293425):

> Google has recently announced future planned changes to the server
> authentication method of their Google Cloud Print™ (GCP) service. An impact of
> these changes will be that specific Canon printers will no longer be able to
> support Google Cloud Print™ (GCP) because the printer firmware cannot
> accommodate these planned changes.

_Recently_ is certainly a stretch. I suspect what they mean is that Google
_recently followed through_ on something announced over three years ago. For
models other than my one, the timeline is even worse. The MG5450, for example,
was announced in September 2012 and on sale until around September 2013.

Needless to say, I wasn't exactly impressed on learning all of this. To top it
all of, as of writing,
[Google UK are still listing the MX895 as a Cloud Print printer](http://www.google.co.uk/cloudprint/learn/printers.html#info-canon)[^1].

[^1]: No idea if that link will redirect outside of the UK.
