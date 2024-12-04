---
title:
  'Nokia N85 WiFi - "No gateway reply" with Thomson routers (also E71, N79,
  5800, ...)'
slug: nokia-n85-wi-fi-no-gateway-reply-with-thomson-routers-also-e71-n79-5800
date: 2008-11-25T22:42:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-323
excerpt: |-
  If you have one of the recent Nokia phones (N85, E71, N79, 5800, ...) and a
  recent Thomson / SpeedTouch / BT Home Hub router you may face the "No gateway
  reply" problem when using the WLAN. By trial and error, I found that this can be
  resolved by disabling WMM on the router via CLI. So it seems all of the phone's
  traffic is being QOSd away. Whose side the problem is on I don't know; they are
  both WiFi certified for WMM of course. An N95 (which doesn't have WMM support)
  is unaffected either way.
---

If you have one of the recent Nokia phones (N85, E71, N79, 5800, ...) and a
recent Thomson / SpeedTouch / BT Home Hub router you may face the "No gateway
reply" problem when using the WLAN. By trial and error, I found that this can be
resolved by disabling WMM on the router via CLI. So it seems all of the phone's
traffic is being QOSd away. Whose side the problem is on I don't know; they are
both WiFi certified for WMM of course. An N95 (which doesn't have WMM support)
is unaffected either way. Just thought I'd save someone who may come across this
via Google the hours of pain I went through..

## Update

Someone actually did find this apparently judging by the comments. To access the
CLI you normally use Telnet. Open a command prompt and type "Telnet
192.168.1.254" (if you changed the default IP... you probably don't need these
instructions.) (Note: On Windows Vista you have to install Telnet client first,
under Programs and Features in Control Panel). Enter your username and password.
(For unbranded routers the default username is Administrator, case sensitive,
with a blank password. Things may be different if your router is ISP branded.)
Finally run these commands:

```
:wireless qos config mode=disabled
:saveall
```
