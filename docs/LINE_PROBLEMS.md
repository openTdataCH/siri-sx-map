# Line information problems

Here we document all line information which are not available on OSM.

With the following query we try to get the line information from osm.\
With [Overpass Turbo](https://overpass-turbo.eu/) you can play around with some queries

``` bigquery
[out:json][timeout:3000];

relation["ref:siri-sx"="85:801:1401"];
>>;

//# when no ways are found with siri-sx ref, make query with operator;
if (count(ways) == 0) {
  relation
  	["type"="route"]
  	["ref"="101"]
  	["operator"~"PAG"];
}

way(r)[role=""][highway!="platform"][public_transport!="platform"];
out geom;
```

### OSM mapping not found for line

- operator: 32 (BLM), line 2461 
- operator: 32 (BLM), line R66 
- operator: 35 (BOB), line R61 
- operator: 35 (BOB), line R62 
- operator: 46 (FB), line S 18 
- operator: 53 (TPF|TPF Auto), line RE2 
- operator: 53 (TPF|TPF Auto), line RE3 
- operator: 61 (TMR), line R132 
- operator: 86 (ZB|Zentralbahn), line R 
- operator: 86 (ZB|Zentralbahn), line R70 
- operator: 124 (JB), line 65 
- operator: 140 (BOB|SPB), line 68 
- operator: 157 (WAB), line 63 
- operator: 157 (WAB), line 64 
- operator: 157 (WAB), line 63 
- operator: 183 (BLS-brs), line 59 
- operator: 183 (BLS-brs), line 60 
- operator: 183 (BLS-brs), line 61 
- operator: 183 (BLS-brs), line 62 
- operator: 183 (BLS-brs), line 63 
- operator: 183 (BLS-brs), line 64 
- operator: 183 (BLS-brs), line 65 
- operator: 183 (BLS-brs), line 66 
- operator: 183 (BLS-brs), line 67 
- operator: 183 (BLS-brs), line 68 
- operator: 183 (BLS-brs), line 69 
- operator: 183 (BLS-brs), line 70 
- operator: 183 (BLS-brs), line 71 
- operator: 183 (BLS-brs), line 72 
- operator: 183 (BLS-brs), line 79 
- operator: 183 (BLS-brs), line 80 
- operator: 192 (BLS-ths), line 7 
- operator: 192 (BLS-ths), line 8 
- operator: 192 (BLS-ths), line 9 
- operator: 192 (BLS-ths), line 10 
- operator: 192 (BLS-ths), line 13 
- operator: 192 (BLS-ths), line 14 
- operator: 192 (BLS-ths), line 15 
- operator: 192 (BLS-ths), line 16 
- operator: 192 (BLS-ths), line 21 
- operator: 192 (BLS-ths), line 22 
- operator: 192 (BLS-ths), line 109 
- operator: 192 (BLS-ths), line 110 
- operator: 192 (BLS-ths), line 119 
- operator: 192 (BLS-ths), line 120 
- operator: 192 (BLS-ths), line 125 
- operator: 192 (BLS-ths), line 126 
- operator: 200 (WAB), line 2444 
- operator: 490 (ZVV), line S 10 
- operator: 490 (ZVV), line S 12 
- operator: 490 (ZVV), line S 33 
- operator: 713 (TMR), line 201 
- operator: 713 (TMR), line 202 
- operator: 714 (^BS$), line 2 
- operator: 714 (^BS$), line 3 
- operator: 714 (^BS$), line 4 
- operator: 738 (TP2A), line 805 
- operator: 738 (TP2A), line 810 
- operator: 738 (TP2A), line 810 
- operator: 738 (TP2A), line 811 
- operator: 738 (TP2A), line 813 
- operator: 738 (TP2A), line 815 
- operator: 738 (TP2A), line 891 
- operator: 741 (TPN), line 801 
- operator: 741 (TPN), line 802 
- operator: 741 (TPN), line 803 
- operator: 741 (TPN), line 804 
- operator: 766 (Chur Bus), line 5 
- operator: 766 (Chur Bus), line N32 
- operator: 766 (Chur Bus), line N33 
- operator: 793 (BOGG), line 519 
- operator: 793 (BOGG), line 9 
- operator: 834 (TPF|TPF Auto), line 125 
- operator: 834 (TPF|TPF Auto), line 13 
- operator: 834 (TPF|TPF Auto), line 482 
- operator: 834 (TPF|TPF Auto), line 492 
- operator: 834 (TPF|TPF Auto), line 520 
- operator: 834 (TPF|TPF Auto), line 530 
- operator: 834 (TPF|TPF Auto), line 548 
- operator: 834 (TPF|TPF Auto), line 551 
- operator: 834 (TPF|TPF Auto), line 552 
- operator: 834 (TPF|TPF Auto), line 554 
- operator: 834 (TPF|TPF Auto), line 555 
- operator: 834 (TPF|TPF Auto), line M22 
- operator: 834 (TPF|TPF Auto), line N1 
- operator: 834 (TPF|TPF Auto), line N11 
- operator: 834 (TPF|TPF Auto), line N12 
- operator: 834 (TPF|TPF Auto), line N13 
- operator: 834 (TPF|TPF Auto), line N14 
- operator: 834 (TPF|TPF Auto), line N15 
- operator: 834 (TPF|TPF Auto), line N16 
- operator: 834 (TPF|TPF Auto), line N17 
- operator: 834 (TPF|TPF Auto), line N2 
- operator: 834 (TPF|TPF Auto), line N21 
- operator: 834 (TPF|TPF Auto), line N22 
- operator: 834 (TPF|TPF Auto), line N23 
- operator: 834 (TPF|TPF Auto), line N24 
- operator: 834 (TPF|TPF Auto), line N25 
- operator: 834 (TPF|TPF Auto), line N3 
- operator: 834 (TPF|TPF Auto), line N5 
- operator: 835 (TMR), line 210 
- operator: 835 (TMR), line 225 
- operator: 835 (TMR), line 243 
- operator: 835 (TMR), line 273 
- operator: 838 (VZO), line N89 
- operator: 849 (VBZ), line Bus 46 
- operator: 853 (TSD-asdt), line 365 
- operator: 856 (AS), line 736 
- operator: 871 (BLAG|Busland AG), line 287 
- operator: 871 (BLAG|Busland AG), line M14 
- operator: 871 (BLAG|Busland AG), line M20 
- operator: 876 (VMCV), line 201 
- operator: 876 (VMCV), line 217 
- operator: 816 (AAGU), line 493 
- operator: 3101 (GTBE), line TBE 
- operator: 3137 (LKM), line LKM 
- operator: 3138 (LMW), line LMW 
- operator: 3849 (VBZ), line Trm 7 
- operator: 3849 (VBZ), line Trm 9 


### No operator available

- operator: 143
- operator: 251
- operator: 298
- operator: 602
- operator: 815
- operator: 819
- operator: 3135
- operator: 3183
- operator: 7000
- operator: 7005
- operator: 7067

### Didok not found

- ch:1:sloid:3449
- ch:1:sloid:10011
- 176