---
title: "I made a website for my photos"
slug: i-made-a-website-for-my-photos
date: 2023-10-01T23:00:45.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-6516dd4f186cc48a4af6cd90
tags:
  - photography
excerpt: |-
  Photography is a small hobby of mine, and I used to post some of my photos on photography websites like 500px. But, apart from blurry photos, on that site you get people liking your photos just because you liked theirs, and people following you just so that you follow them back: it’s basically like interacting with bots.


  Not getting much from that experience, I’ve wanted to build a dedicated site for my photos for a while. It means I can make sure photos are displayed in the way I want, use mo
---

Photography is a small hobby of mine, and I used to post some of my photos on
photography websites like 500px. But, apart from blurry photos, on that site you
get people liking your photos just because you liked theirs, and people
following you just so that you follow them back: it’s basically like interacting
with bots.

Not getting much from that experience, I’ve wanted to build a dedicated site for
my photos for a while. It means I can make sure photos are displayed in the way
I want, use modern image formats, and even go back and edit an old photo if I
feel the sudden urge to.

That site has now been built, and
[the first version of it’s at photos.reupen.uk](https://photos.reupen.uk). It
currently has 39 photos, including some better shots of the moon than I posted
on here. The photos were all taken with the mirrorless or DSLR camera I had at
the time (all Canon models).

## Technical details

The rest of this post is fairly technical, so stop reading here if that doesn’t
interest you.

### What I used to build the site

I used a [web framework called Astro](https://astro.build/) for the site. I’ve
used it before, and it’s nice and simple for static sites.

The
[\<picture> HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
is used for images. It allows multiple image sizes and formats to be provided,
letting the web browser pick the most appropriate (based on factors like what it
supports, the viewport size and the resolution of the screen). At the moment,
I’m providing images in the AVIF and WebP formats. AVIF is by far the better
format of the two for lossy images, but it’s still not supported in Microsoft
Edge. WebP therefore serves as a fallback for Edge (and people using old
versions of the other major browsers). (As an aside, I’m somewhat sceptical
about WebP for photos based on
[these results](https://giannirosato.com/blog/post/image-comparison/), so I may
decide to replace it with JPEG if it turns out there’s not much difference for
my target file sizes.)

The original images are generally in RAW format, and processed and edited with a
program like Adobe Lightroom. This meant that I needed an intermediate image
format to save those edited RAW images in. I decided to use lossless WebP files,
scaled down to fit within 3840x2160 (a common 4k resolution). Using a lossless
format avoids lossy to lossy transcodes (and the associated problems) when
converting the intermediate images into the various image sizes and formats used
on the site. Lossless images do mean larger source images though, so I used
[Git Large File Storage (LFS)](https://git-lfs.com/) to keep the intermediate
images under version control without the files themselves being in the Git
repository.

During the site build process, the popular
[Sharp library](https://sharp.pixelplumbing.com/) is used to convert the
lossless images into the lossy versions published on the site. (I’d like to get
the source images in JPEG XL at some point, but that depends on JPEG XL support
being enabled in Sharp out of the box.)

### There’s always a snag

As is inevitable when writing software for the web, I ran into some curious
problems along the way. One of those problems was a Chrome bug, where
[in a particular scenario it doesn’t reserve space for an image before it’s loaded, causing a layout shift](https://bugs.chromium.org/p/chromium/issues/detail?id=1185603).
I ended up changing the layout of the image pages to avoid that.

Another problem was that, by default,
[Sharp doesn’t embed ICC colour profiles in output images](https://sharp.pixelplumbing.com/api-output#withmetadata),
and, also by default,
[Firefox doesn’t colour manage untagged images](https://bugzilla.mozilla.org/show_bug.cgi?id=553599)
(images without an explicitly assigned colour profile). This wasn’t actually a
problem for AVIF, as it has
[another simpler way of signalling colour spaces](https://github.com/AOMediaCodec/libavif/wiki/CICP)
[which Firefox is able to use](https://bugzilla.mozilla.org/show_bug.cgi?id=1634741#c0).
However, the colours of the output WebP images looked noticeably wrong in
Firefox, and I didn’t want to risk someone visiting the site seeing that.

That problem was easy to solve – the
[previously linked `withMetadata` method](https://sharp.pixelplumbing.com/api-output#withmetadata)
will make Sharp embed ICC profiles in output images, in turn making Firefox
display the images as expected in its default configuration. (It’s also worth
noting that the draft CSS Color Module Level 4 specification
[requires untagged images to be treated as being in the sRGB colour space](https://www.w3.org/TR/css-color-4/#untagged).)

I also, however, noticed that the colour I had chosen for links was displaying
noticeably differently in Firefox and Chrome. I fixed that just for me by
[manually configuring my copy of Firefox to use full colour management](http://kb.mozillazine.org/Gfx.color_management.mode).
That brought colours in Firefox in line with Chrome and Edge (for text, untagged
images and everything else).
[There is an open bug about enabling full colour management in Firefox by default](https://bugzilla.mozilla.org/show_bug.cgi?id=455077)
(they tried once, and
[reverted it due to a bug with HTML canvas](https://bugzilla.mozilla.org/show_bug.cgi?id=1639574)).

The last snag worth mentioning is that I quickly hit GitHub’s current
[1 GiB-per-month download limit (archived page)](https://archive.ph/mgmfu) for
files stored using Git LFS. The free limit is
[being increased to 10 GiB](https://github.com/orgs/community/discussions/61362),
though, which will be more than enough for me when it happens (the changes were
delayed at the last minute, with a new date not yet announced). I also made some
changes to my GitHub Actions workflows and Dependabot configuration to minimise
downloads of files stored using Git LFS. (It’s also worth mentioning that I’m
not entirely in control of usage here, as if someone else pulls the LFS-managed
files, it’ll count against my limit. That even applies in a fork.)

### The code is public

There’s nothing secret about that site, so
[its source code is on GitHub](https://github.com/reupen/photos.reupen.uk).
