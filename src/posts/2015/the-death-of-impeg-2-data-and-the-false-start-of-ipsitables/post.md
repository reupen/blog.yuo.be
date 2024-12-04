---
title: "The death of IMpeg2Data and the false start of IPSITables"
slug: the-death-of-impeg-2-data-and-the-false-start-of-ipsitables
date: 2015-12-30T19:10:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-281
excerpt: |-
  In the Windows Vista-era, I wrote a DVB-T program. Apart from letting you view
  TV, it read and parsed DVB-SI. With the removal of Media Centre in Windows 10, I
  recently tried to get it working again but quickly hit a fairly major snag.

  I was using the IMpeg2Data
  [https://msdn.microsoft.com/en-us/library/windows/desktop/dd694392%28v=vs.85%29.aspx]
  interface to retrieve DVB-SI. In particular, the IMpeg2Data::GetTable
  [https://msdn.microsoft.com/en-us/library/windows/desktop/dd694395%28v=vs.85%29
---

In the Windows Vista-era, I wrote a DVB-T program. Apart from letting you view
TV, it read and parsed DVB-SI. With the removal of Media Centre in Windows 10, I
recently tried to get it working again but quickly hit a fairly major snag.

I was using the
[IMpeg2Data](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694392%28v=vs.85%29.aspx)
interface to retrieve DVB-SI. In particular, the
[IMpeg2Data::GetTable](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694395%28v=vs.85%29.aspx)
and
[IMpeg2Data::GetStreamOfSections](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694394%28v=vs.85%29.aspx)
methods.

However, you'll note that Microsoft state:

> _\[IMpeg2Data is no longer available for use as of Windows 7. Instead, use the
> [IPSITables interface](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694840%28v=vs.85%29.aspx)
> to get program specific information (PSI) tables from an MPEG-2 transport
> stream.]_

Fine, the API has been replaced, it should be straightforward to use the new
one. Except, it is very poorly documented, and the documentation that is there
does not make sense.

Let's have a look at the documentation for the parameters of the only method
that the new interface has,
[IPSITables::GetTable](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694841%28v=vs.85%29.aspx):

> **dwTSID \[in]**
>
> Transport stream identifier (TSID) for the table that is retrieved (bytes
> 0 - 15) and the original network ID (ONID) for an Event Information Table
> (EIT) that is retrieved (bytes 16 - 31).
>
> **dwTIDPID \[in]**
>
> Table identifier (TID) or the program ID (PID) that identifies the transport
> stream packet.
>
> **dwHashedVer \[in]**
>
> Hash value that identifies the table contents.
>
> **dwPara4 \[in]**
>
> PID for a Program Mapping Table or the service ID (SID) for an EIT. Otherwise,
> not used.
>
> **ppIUnknown \[out]**
>
> Pointer to the
> [IUnknown](https://msdn.microsoft.com/en-us/library/windows/desktop/ee125031%28v=vs.85%29.aspx)
> interface for the table object that is retrieved. The caller is responsible
> for freeing the memory.

How many things are wrong with it?

- Can a DWORD store 32 bytes now?
- Is a PID is a program ID now rather than a packet identifier?
- What the hell the hash value (or hashed version as suggested by the name of
  the parameter) – the word hash comes up in neither ISO/IEC 13818-1 nor ETSI EN
  300 468. CRC32 does – but how on earth would you know the checksum of the
  table you are trying to retrieve?
- When do you put the TID in dwTID_PID and when do you put the PID? If you put
  the PID there, where do you put the TID?
- What do you put in bits 16 – 31 of dwTSID when it's not an EIT?
- What do you do if you don't know the TSID?
- And even if you manage to work all that out, you get a pointer to an IUnknown
  interface, _with no information on what interfaces it actually implements!_

As for
[IMpeg2Data::GetStreamOfSections](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694394%28v=vs.85%29.aspx),
there doesn't appear to even be a replacement.

The old
[IMpeg2Data](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694392%28v=vs.85%29.aspx)
method was
[reasonably well-documented](https://msdn.microsoft.com/en-us/library/windows/desktop/dd693084%28v=vs.85%29.aspx)
and more importantly the method parameters actually made sense.

I wondered what Microsoft actually meant by _IMpeg2Data is no longer available
for use as of Windows 7_. I noticed that the filter and interface are still
present. Alas, my experience of what they mean is that
[IMpeg2Data::GetTable](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694395%28v=vs.85%29.aspx)
times out and returns EVENT_E_INTERNALERROR, while
[IMpeg2Data::GetStreamOfSections](https://msdn.microsoft.com/en-us/library/windows/desktop/dd694394%28v=vs.85%29.aspx)
returns S_OK but no data ever arrives. It is bizarre as it suggests the method
implementations are still in place.

In any case, I'm pretty sure my TV app will never work again. Never mind...
