---
title: "I upgraded my Intel Core i9-13900 to an i9-14900K"
slug: i-upgraded-my-i9-13900-to-an-i9-14900k
date: 2023-12-19T00:00:07.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-658058d5f6eea81967542fe0
tags:
  - hardware
excerpt: |-
  There was a good deal on a 14900K during Black Friday weekend, so I decided to buy one as a fairly low-cost upgrade from my non-K 13900.


  Did I get a good one?

  Asus motherboards give these CPUs a silicon prediction (SP) score, and these are often used as an easy way of determining whether a particular CPU is a good sample (or not).

  There are, in fact, three SP scores – an overall one, one for performance cores and one for efficient cores (often instead called efficiency cores, but this page o
---

There was a good deal on a 14900K during Black Friday weekend, so I decided to
buy one as a fairly low-cost upgrade from
[my non-K 13900](/2023/04/13/new-pc-build/).

## Did I get a good one?

Asus motherboards give these CPUs a silicon prediction (SP) score, and these are
often used as an easy way of determining whether a particular CPU is a good
sample (or not).

There are, in fact, three SP scores – an overall one, one for performance cores
and one for efficient cores (often instead called efficiency cores,
[but this page on Intel’s website calls them efficient cores](https://www.intel.co.uk/content/www/uk/en/gaming/resources/how-hybrid-design-works.html)).

My 14900K has an overall SP score of 100, a P-core SP score of 109 and an E-core
SP score of 82. From what I can gather online, these are average (or marginally
above average) scores. (For what it’s worth, the CPU has a batch code of
X335J559.)

## Some Geekbench results

Here’s how the old and new CPUs benchmark in Geekbench 6.2.2 with Asus Multicore
Enhancement (MCE) set to auto (with unlimited power limits):

| CPU                  | Single-core score | Multi-core score |
| -------------------- | ----------------: | ---------------: |
| i9-14900K (MCE auto) |              3317 |           21,981 |
| i9-13900 (MCE auto)  |              3105 |           20,851 |

There’s about a 6.8% improvement in single-core score and 4.8% in multi-core
score. Benchmarks were performed on Windows 10 with Hyper-V off and Corsair
Vengeance 2x16GB 6400MT/s C32 RAM, and the scores are an average of two runs.

For daily use, however, I set the long-term power limit (PL1) to 95W and the
short-term power limit (PL2) to 150W. Here’s how the CPUs scored with those
power limits:

| CPU                           | Single-core score | Multi-core score |
| ----------------------------- | ----------------: | ---------------: |
| i9-14900K (PL1=95W, PL2=150W) |              3290 |           20,515 |
| i9-13900 (PL1=95W, PL2=150W)  |              3087 |           20,155 |

With the reduced power limits, there was a 6.5% improvement in single-core score
but only a 1.8% improvement in multi-core score.

## Another difference I noticed

Intel CPUs have a parameter called IA AC load line. Lower values cause lower CPU
core voltages to be used. With my locked 13900, the IA AC load line was
automatically set to 0.8 milliohms by my Asus STRIX Z790-F motherboard. I
discovered that it wasn’t really possible to reduce the value of that setting
further: a feature called Intel Current Excursion Protection (CEP) kicks in,
preventing voltages outside a certain range from being used.

When lowering the IA AC load line setting on the non-K 13900 below around 0.7,
E-core performance started to suffer under load. As the setting was lowered
further, P-core performance then started worsening. This is because when CEP
kicks in, the CPU ends up using higher than normal voltages under load. (I
tested this with a fixed power limit of 125W.) The option to disable CEP also
doesn’t work on the 13900 – I assume that disabling CEP isn’t allowed on locked
CPUs.

On my 14900K, my motherboard automatically set IA AC load line to 0.55
milliohms, and also appears to have disabled CEP automatically. It’s probably
possible to reduce the IA AC load line further, but I haven’t tried yet...

## Was the upgrade worth it?

In terms of absolute performance, not really. But it was a useful learning
exercise, and I gained the benefits of having an unlocked CPU (including, in
theory, support for faster RAM), and the extra features of Raptor Lake Refresh
(namely ‘Intel Application Optimization’, which I’m yet to use). I certainly
wouldn’t have paid full price for an 14900K, but I’m happy enough at the price I
did pay.
