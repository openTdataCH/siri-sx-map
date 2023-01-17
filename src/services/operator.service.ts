export class OperatorService {
  private static operators: Map<number, string> = new Map([
    [11, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // Schweizerische Bundesbahnen SBB
    [22, 'AB'], // Appenzeller Bahnen (ab)
    [23, 'TPC|Transports publics du Chablais'], // Transports Publics du Chablais
    [29, 'MBC|MBC Auto'], // Transports de la région Morges-Bière-Cossonay TODO not sure (SAPJV)
    [31, 'AVA|AVA-wsb|AVA-szr'], // Aargau Verkehr AG
    [32, 'BLM'], // Lauterbrunnen-Mürren
    [33, 'BLS'], // BLS AG (bls)
    [35, 'BOB'], // Berner Oberland-Bahnen
    [37, 'BLT'], // Baselland Transport
    [38, 'ASM|ASM Auto'], // Aare Seeland mobil (bti)
    [42, 'MVR'], // Montreux-Vevey-Riviera (cev)
    [43, 'CJ|CJ Auto'], // Chemins de fer du Jura
    [44, 'TN|TransN'], // Transports Publics Neuchâtelois SA (cmn)
    [46, 'FB'], // Forchbahn
    [47, 'FLP|Ferrovie Luganesi'], // Lugano-Ponte Tresa
    [48, 'MGB'], // Matterhorn Gotthard Bahn (fo)
    [49, 'FART'], // Ferrovie Autolinee Regionali Ticinesi
    [51, 'AB'], // Appenzeller Bahnen (fw)
    [53, 'TPF|TPF Auto'], // Transports publics fribourgeois
    [55, 'Chemin de fer Lausanne-Échallens-Bercher'], // Lausanne-Echallens-Bercher
    [56, 'ASM|ASM Auto'], // Aare Seeland mobil (rvo)
    [61, 'TMR'], // Transports de Martigny et Régions (mc)
    [64, 'MOB'], // Montreux-Oberland Bernois
    [65, 'THURBO'], // THURBO
    [66, 'NStCM'], // Nyon-St-Cergue-Morez
    [69, 'TRAVYS|Travys'], // Transports Vallée de Joux-Yverdon-Ste-Croix (pbr)
    [72, 'RhB'], // Rhätische Bahn
    [73, 'TN|TransN'], // Transports Publics Neuchâtelois SA (rvt)
    [74, 'RegionAlps'], // Regionalps
    [78, 'SZU'], // Sihltal-Zürich-Uetliberg-Bahn
    [81, 'ASM|ASM Auto'], // Aare Seeland mobil (snb)
    [82, 'SOB'], // Schweizerische Südostbahn (sob)
    [86, 'ZB|Zentralbahn'], // Zentralbahn
    [88, 'RBS'], // Regionalverkehr Bern-Solothurn
    [93, 'MGB'], // Matterhorn Gotthard Bahn (bvz)
    [94, 'BLT-wb'], // Waldenburgerbahn
    [96, 'AVA|AVA-wsb|AVA-szr'], // Aargau Verkehr AG
    [97, 'TRAVYS|Travys'], // Transports Vallée de Joux-Yverdon-Ste-Croix
    [101, '^VB$'], // Verkehrsbetriebe Biel
    [103, '^VB$'], // Verkehrsbetriebe Biel
    [104, 'BRB'], // Brienz Rothorn Bahn AG
    [105, 'BRSB'], // Braunwald-Standseilbahn
    [107, 'BB'], // Bürgenstock Bahn AG
    [109, 'DKB'], // Davos Klosters Bergbahnen (dpb)
    [111, 'SDS|SDS-dsb'], // Sportbahnen Davos
    [112, 'StSS'], // Standseilbahn Schwyz-Stoos AG
    [113, 'TBBU'], // Toggenburg Bergbahnen Unterwasser
    [114, 'Bergbahnen Engelberg - Trübsee - Titlis AG'], // Engelberg-Trübsee-Titlis
    [116, 'FMB'], // Società Funicolare Cassarate-Monte Brè
    [117, 'FPR'], // Funicolare Ritom SA
    [118, 'AMP'], // Aufzug Matte-Plattform (Bern)
    [119, 'DMB|Marzili-Stadt Bern AG'], // Drahtseilbahn Marzili-Stadt Bern AG
    [120, 'GbB'], // Giessbachbahn
    [121, 'GGB'], // Gornergratbahn
    [122, 'GB'], // Gurtenbahn
    [123, 'HB'], // Harderbahn
    [124, 'JB'], // Jungfraubahn
    [125, 'MVR'], // Montreux-Vevey-Riviera (las)
    [128, 'ASM|ASM Auto'], // Aare Seeland mobil (ltb)
    [129, 'Ferrovia Monte Generoso SA'], // Ferrovia Monte Generoso
    [131, 'MVR'], // Montreux-Vevey-Riviera (mtgn)
    [133, 'BEST-mmb|ESMM-mmb'], // Celeriner Bergbahnen - Punt Muragl-Muottas Muragl
    [134, 'MS'], // Lugano-Monte San Salvatore
    [135, 'NB'], // Niesenbahn
    [136, 'PILATUS-BAHNEN AG'], // Pilatusbahnen
    [137, 'Rigi Bahnen AG'], // Rigi Bahnen AG
    [138, 'BOS/RTB|BOS/rtb'], // Bus Ostschweiz (Rheintal)
    [140, 'BOB|SPB'], // Berner Oberland-Bahnen
    [141, 'LSMS-sbm'], // Schilthornbahn (sbm)
    [142, 'SMC'], // Sierre-Montana-Crans
    [143, ''], // Funiculaire Saint-Imier-Mont-Soleil SA TODO has no operator what do we do (node / 481068494)
    [145, 'SthB'], // Stanserhornbahn
    [146, 'STI'], // STI Bus AG
    [147, 'ESMM-smbb|BEST-smbb'], // Bergbahnen Engadin St. Moritz AG
    [149, 'NHB'], // Niederhornbahn AG
    [153, 'TN|TransN'], // Transports Publics Neuchâtelois SA (tn)
    [154, 'TSB'], // Treib-Seelisberg-Bahn
    [155, 'MVR'], // Montreux-Vevey-Riviera (vcp)
    [156, 'TRN|TRN Auto'], // Service d'automobiles TRN (vr)
    [157, 'WAB'], // Wengernalpbahn
    [158, 'ZVB'], // Zugerbergbahn
    [159, 'DIH'], // Interlaken-Heimwehfluh
    [160, 'Dampfbahn Furka-Bergstrecke AG'], // Dampfbahn Furka-Bergstrecke
    [163, 'FLMS'], // Società della Funicolare Locarno-Madonna del Sasso SA
    [164, 'DBZ'], // Dolderbahn Betriebs AG
    [165, 'PBZ'], // Poly-Bahn Zürich
    [166, 'FUN'], // Funiculaire Neuchâtel-Université - Neuchâtel-Gare
    [179, 'AeS'], // Ägerisee Schifffahrt AG
    [180, 'SGG'], // Schifffahrts-Genossenschaft Greifensee
    [181, 'SGH'], // Hallwilersee
    [182, 'BSG'], // Bielersee / todo osm has no relations and operator
    [183, 'BLS-brs'], // BLS Schifffahrt AG (brs)
    [184, 'CGN'], // CGN SA
    [185, 'SGV'], // Vierwaldstättersee
    [186, 'SGZ'], // Schifffahrtsgesellschaft für den Zugersee AG / todo no relation
    [188, 'SNL'], // Lago di Lugano
    [189, 'LNM'], // Lacs de Neuchâtel et Morat
    [190, 'SNL'], // Società Navigazione del Lago di Lugano SA
    [191, 'BPG'], // Basler Personenschifffahrt AG
    [192, 'BLS-ths'], // BLS Schifffahrt AG (ths)
    [193, 'URh'], // Schweiz. Schifffahrtsgesellschaft Untersee und Rhein AG
    [194, 'ZSG'], // Zürichsee-Schifffahrtsgesellschaft AG (ZSG)
    [195, 'SBS'], // Schweizerische Bodensee-Schifffahrt AG
    [196, 'FHM'], // Zürichsee-Fähre Horgen-Meilen AG
    [197, 'SW'], // Schiffsbetrieb Walensee todo no relations
    [198, 'NLB'], // Navigation Lac des Brenets todo no relations
    [199, 'SMGN'], // Société des Mouettes Genevoises Navigation
    [200, 'WAB'], // Wengernalpbahn Grindelwald Grund - Eigergletscher
    [201, 'BGF'], // Grindelwald-First
    [202, 'SWAG'], // Seilbahn Weissenstein AG
    [203, 'EB'], // Brunni-Bahnen Engelberg AG
    [204, 'LAF'], // Adliswil-Felsenegg
    [205, 'Bergbahnen Beckenried-Emmetten AG'], // Bergbahnen Beckenried-Emmetten
    [207, 'DKB'], // Davos Klosters Bergbahnen (bbbj)
    [208, 'DKB'], // Davos Klosters Bergbahnen (lkp)
    [210, 'FML'], // Funivia Monte Lema SA
    [211, 'LRU'], // Raron-Unterbäch
    [212, 'CBV'], // Chalais-Briey-Vercorin TODO no data
    [213, 'LSS'], // Schwägalp-Säntis
    [214, 'LUFAG'], // Luftseilbahn Unterterzen-Flumserberg AG todo no data
    [215, 'LWE'], // Wasserauen-Ebenalp
    [216, 'LWM'], // Wengen-Männlichen
    [217, 'TCP'], // Portes du Soleil Suisse SA todo no data
    [218, 'DIALA'], // Bergbahnen Engadin St. Moritz todo no data
    [219, 'ABB'], // Arosa Bergbahnen
    [220, 'TUG'], // Touristische Unternehmung Grächen AG todo no data
    [222, 'SMF'], // Sportbahnen Melchsee-Frutt (lsm)
    [223, 'PSFS|PSSA'], // Pendicularas Scuol SA todo no data
    [224, 'SBP'], // Sportbahnen Pischa
    [225, 'BDGAG'], // Bergbahnen Destination Gstaad AG todo no operator
    [226, 'LORB'], // Luftseilbahn Obergschwend-Rigi-Burggeist AG
    [227, 'TRI'], // Riddes-Isérables
    [228, 'LKS'], // Luftseilbahn Kandersteg-Sunnbüel (Gemmi) AG
    [229, 'LLG'], // Leukerbad-Gemmipass
    [230, 'SB'], // Savognin-Bergbahnen AG
    [232, 'LRF'], // Rhäzüns-Feldis/Veulden
    [233, 'TLML'], // Télé-Leysin-Col des Mosses - La Lécherette SA todo no data
    [234, 'LSF|STBAG'], // Saastal Bergbahnen AG todo no data
    [235, 'SRR'], // Seilbahn Rickenbach-Rotenfluh/Rotenfluebahn Mythenregion todo no data
    [236, 'BCD'], // Chur-Dreibündenstein todo no data
    [237, 'LRW'], // Reigoldswil-Wasserfallen todo no data
    [238, 'ESMM|BEST'], // Celeriner Bergbahnen - Celerina-Saluver todo no data
    [239, 'NHB'], // Niederhornbahn AG
    [240, 'SHAG'], // Sattel-Hochstuckli AG
    [244, 'LGJ'], // Gampel-Jeizinen todo has no operator
    [245, 'CMA'], // Remontées Mécaniques Crans-Montana-Aminona todo has no data
    [247, 'DIALA-lcl'], // Curtinatsch-Piz Lagalb
    [249, 'LSC'], // Surlej-Silvaplana-Corvatsch
    [250, 'LDN'], // Dallenwil-Niederrickenbach
    [251, ''], // Andermatt-Sedrun Sport AG todo no data
    [252, 'LHB'], // Lenzerheide Bergbahnen todo no operator
    [253, 'HKDS'], // Hoher Kasten Drehrestaurant und Seilbahn AG
    [254, 'LDW'], // Dallenwil-Wirzweli
    [255, 'LJK'], // Jakobsbad-Kronberg
    [256, 'LSMS'], // Stechelberg-Mürren-Schilthorn (lsms)
    [257, 'BBWAG'], // Bergbahnen Wildhaus AG todo no data
    [258, 'FLC'], // Funiculaire St-Luc-Chandolin todo no data
    [261, 'G3AG'], // Gstaad 3000 AG
    [262, 'ABAG|BAB'], // Aletsch Bahnen AG todo Has none
    [263, 'LFüB'], // Fürgangen-Bellwald todo osm has no data
    [264, 'LESt'], // Erlenbach-Stockhorn
    [265, 'BBF'], // Bergbahnen Flumserberg AG todo has no data
    [267, 'SPL'], // Pontresina-Alp Languard
    [270, 'LSH'], // Luftseilbahn Schattdorf-Haldi
    [272, 'LGP'], // Grindelwald-Pfingstegg
    [273, 'LMM'], // Marbach-Marbachegg todo has no data
    [274, 'LBB'], // Blatten-Belalp todo has no data
    [275, 'BFL'], // Weisse Arena Bergbahnen AG
    [276, 'LRR'], // Rosswald Bahnen AG todo no data
    [277, 'TDCA'], // Téléphérique Dorénaz-Champex d'Alesse/Commune de Dorénaz todo osm has no data
    [279, 'FART-klvr|Cent-klvr'], // Verdasio-Rasa
    [280, 'LSG'], // Stalden-Gspon todo no data
    [281, 'LKüS'], // Küssnacht am Rigi-Seebodenalp
    [282, 'BEAG'], // Bergbahnen Engstligenalp AG todo no relation
    [283, 'BSAG'], // Bergbahnen Sörenberg AG
    [286, 'CIT'], // Cardada Impianti Turistici
    [287, 'PIZAG'], // Pizolbahnen AG todo has no data
    [288, 'BBF-pbf'], // Bergbahnen Flumserberg AG todo has no data
    [290, 'LTUO'], // Turtmann-Unterems-Oberems
    [291, 'LSG'], // Staldenried¿Gspon
    [293, 'BGR'], // Glaris-Rinerhorn todo has no data
    [294, 'RMA'], // Remontées Méc. du Wildhorn Anzère
    [296, 'FBS'], // Brusino-Arsizio-Serpiano
    [297, 'LLAT'], // Torrent-Bahnen Leukerbad-Albinen AG
    [298, ''], // Lenk Bergbahnen todo no relation
    [299, 'ZBAG'], // Zermatt Bergbahnen AG todo no relation
    [301, 'SSA'], // Schutt Atzmännig todo no data
    [303, 'BHY'], // Bergbahnen Hoch-Ybrig AG
    [305, 'TMSA'], // TéléMarécottes todo no data
    [306, 'LABB'], // Lauchernalp Bergbahnen AG
    [307, 'BMH|Bergbahnen Meiringen-Hasliberg AG'], // Bergbahnen Meiringen-Hasliberg
    [309, 'KMB'], // Klosters-Madrisa Bergbahn todo no relation
    [310, 'LKE'], // Luftseilbahn Kalpetran-Embd
    [311, 'Téléverbier'], // Téléverbier
    [312, 'GGM'], // Gondelbahn Grindelwald-Männlichen AG
    [313, 'LKR'], // Luftseilbahn Kräbel-Rigi Scheidegg AG
    [314, 'TVCM'], // Télécabine Vercorin-Crêt-du-Midi todo no data
    [315, 'BHAG'], // Bergbahnen Hohsaas AG todo no data
    [316, 'VBSA'], // Valbianca SA Airolo
    [319, 'StoB'], // Stoosbahnen AG
    [323, 'GKO'], // Gondelbahn Kandersteg-Oeschinensee todo no relation
    [329, 'BBD'], // Bergbahnen Disentis
    [332, 'LRE'], // Raron-Eischoll TODO (Has no operator)
    [334, 'BHY'], // Bergbahnen Hoch-Ybrig AG
    [336, 'SBAD'], // Sportbahnen Bergün
    [337, 'RMGZ'], // Remontées Mécaniques Grimentz-Zinal SA todo no relation
    [342, 'PAGT'], // Pradaschier AG Top todo no data
    [343, 'BSAG'], // Bergbahnen Sörenberg AG - fikt todo no relation
    [344, 'MBC|MBC Auto'], // Transports de la Région Morges-Bière-Cossonay
    [346, 'Luftseilbahn Kandersteg-Allmenalp AG'], // Luftseilbahn Kandersteg-Allmenalp
    [347, 'SRI'], // Seilbahn Ried Illgau
    [348, 'ITRT'], // Impianti turistici Rivera-Monte Tamaro todo no data
    [349, 'LTBAG'], // LTB Lungern-Turren-Bahn AG
    [360, 'SBS'], // Bodensee-Schiffsbetriebe GmbH
    [371, 'MBC'], // Société coopérative du Chemin de fer - Musée Blonay-Chamby
    [490, 'ZVV'], // Zürcher Verkehrsverbund
    [602, ''], // Bergbahnen Adelboden AG todo no relation
    [605, 'AVG|GWB|Grindelwald Bus AG'], // Grindelwald Bus AG
    [609, 'BPB|BPB-bpb'], // Comune di Personico
    [611, 'Alpbus'], // Alpbus Fournier
    [617, 'ALTRA'], // Alpintrans GmbH
    [700, 'ABG'], // Alsa Bustours Gex S.A.S
    [708, 'E-Bus Zermatt'], // Elektrobus Zermatt
    [709, 'MSG'], // Mühleggbahn AG
    [710, 'WETA|WETA (Bürgerbus)'], // Bürgerbus Walperswil-Epsach-Täuffelen-Aarberg
    [711, 'BüBu'], // Bürgerbus Hellsau-Höchstetten-Willadingen-Koppigen
    [713, 'TMR'], // Bus urbain de Martigny
    [714, '^BS$'], // Bus Sierrois
    [716, 'Engadinbus|Chrisma S.A.|Chrisma SA'], // Ortsbus St. Moritz
    [723, 'AVA|AVA-wsb|AVA-szr'], // Aargau Verkehr AG
    [727, 'VSK'], // Verkehrsbetriebe Kreuzlingen
    [731, 'AVJ'], // Autotransports de la Vallée de Joux todo osm has no data
    [736, 'AMSA'], // Autolinea Mendrisiense SA
    [737, 'SNL Auto'], // Servizio d'automobili
    [738, 'TP2A'], // Transports Publics de la Région Nyonnaise
    [740, 'Verkehrsbetriebe Davos'], // Verkehrsbetrieb der Landschaft Davos
    [741, 'TPN'], // Bus Nyon-Prangins
    [744, 'AB Auto'], // Automobildienst Appenzeller Bahnen
    [755, 'ABF'], // Autobusbetrieb Freienbach
    [764, 'MBC|MBC Auto'], // Automobiles MBC
    [766, 'Chur Bus'], // Bus und Service AG (Chur)
    [772, 'BRER'], // Busbetrieb Rapperswil-Eschenbach-Rüti ZH
    [773, 'VBG'], // Verkehrsbetriebe Glattal
    [777, 'BWS'], // Busbetrieb Wollerau-Samstagern
    [792, 'TN|TransN'], // Transports Publics Neuchâtelois SA (tc)
    [793, 'BOGG'], // Busbetrieb Olten-Gösgen-Gäu
    [796, 'TRN|TRN Auto'], // Service d'automobiles TRN (rvt Auto)
    [797, 'SBF'], // Stadtbus Frauenfeld
    [799, 'VBH'], // Verkehrsbetriebe Herisau
    [801, 'PostAuto|PostAuto AG|PAG|PAZ|PAG Ostschweiz|PAG Ticino|Car Postal'], // PostAuto AG
    [805, 'LIEmobil|Verkehrsbetrieb LIECHTENSTEINmobil'], // Verkehrsbetrieb LIECHTENSTEINmobil
    [807, 'SZU Auto'], // Automobildienst SZU
    [810, 'BLWE'], // Busbetrieb Lichtensteig-Wattwil-Ebnat-Kappel
    [811, 'AAGL'], // Autobus AG Liestal
    [812, 'AAGR'], // Auto AG Rothenburg
    [813, 'AFA'], // Autoverkehr Frutigen-Adelboden
    [814, 'RegionAlps'], // RegionAlps Bus
    [815, ''], // Bus und Service AG (Engadin)
    [816, 'AAGU'], // Auto AG Uri
    [817, 'FART Auto'], // Autolinee FART
    [818, 'TPC|Transports publics du Chablais'], // Transports Publics du Chablais (Bus)
    [819, ''], // Automobil Rottal AG
    [820, 'VBL|TVLU|Verkehrsbetriebe Luzern AG (VBL)|Verkehrsbetriebe Luzern'], // Verkehrsbetriebe Luzern AG
    [823, 'BVB'], // Basler Verkehrsbetriebe
    [826, 'BOS/wimo'], // Bus Ostschweiz (Wil)
    [827, 'Bernmobil'], // Städtische Verkehrsbetriebe Bern
    [151, 'TL'], // Transports Publics de la Région Lausannoise sa
    [351, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB GmbH (Grenzverkehr)
    [832, 'AWA'], // Autobetrieb Weesen-Amden
    [833, 'CJ|CJ Auto'], // Automobiles CJ
    [834, 'TPF|TPF Auto'], // Service d'automobiles TPF
    [835, 'TMR'], // Service d'automobiles TMR
    [836, 'VBSH'], // Verkehrsbetriebe Schaffhausen
    [838, 'VZO'], // Verkehrsbetriebe Zürichsee und Oberland
    [839, 'ZVB'], // Zugerland Verkehrsbetriebe
    [840, 'BBA'], // Busbetrieb Aarau
    [841, 'AAGS'], // Auto AG Schwyz
    [843, 'AOT'], // Autokurse Oberthurgau
    [846, 'VBSH'], // Verkehrsbetriebe Schaffhausen
    [849, 'VBZ'], // Verkehrsbetriebe Zürich
    [850, 'RBS Auto'], // Autobusbetrieb RBS
    [851, 'MGB'], // Automobildienst Matterhorn Gotthard Bahn (fo auto)
    [853, 'TSD-asdt'], // Theytaz Excursions Sion todo
    [855, 'LLB|Leukerbad Busbetriebe'], // Auto Leuk-Leukerbad
    [856, 'AS'], // Autobetrieb Sernftal
    [858, '^ARL$'], // Autolinee Regionali Luganesi
    [859, 'AVG|GWB|Grindelwald Bus AG'], // Grindelwald Bus AG
    [862, 'ABl'], // Autolinee Bleniesi
    [870, 'ASM|ASM Auto'], // Automobildienste Aare Seeland mobil
    [871, 'BLAG|Busland AG'], // Busland AG
    [873, 'RBL'], // Regionalbus Lenzburg
    [876, 'VMCV'], // Transports publics Vevey-Montreux-Chillon-Villeneuve
    [879, 'BLT|BLT-wb'], // Auto BLT
    [881, 'TPG'], // Transports Publics Genevois
    [882, 'SBW'], // Stadtbus Winterthur
    [883, 'BSU'], // Busbetrieb Solothurn und Umgebung
    [885, 'VBSG'], // Verkehrsbetriebe der Stadt St.Gallen
    [886, 'RVBW'], // Regionale Verkehrsbetriebe Baden-Wettingen
    [888, 'ASGS'], // Autotransports Sion-Grône-Sierre todo has no operator
    [889, '^VB$'], // Verkehrsbetriebe Biel
    [894, 'BGU'], // Busbetrieb Grenchen und Umgebung
    [895, 'TRAVYS|Travys'], // Transports Vallée de Joux-Yverdon-Ste-Croix
    [896, 'REGO'], // Regiobus Gossau SG
    [899, 'AVA|AVA-wsb|AVA-szr'], // Aargau Verkehr AG
    [908, 'DVZO'], // Dampfbahn-Verein Zürcher Oberland
    [955, 'TPL'], // Trasporti Pubblici Luganesi SA
    [959, 'HEUB'], // Heuberge AG
    [3001, 'TBA'], // Tschentenbahnen Adelboden
    [3002, 'Aletsch Arena'], // Aletsch-Express Riederalp-Bettmeralp
    [3003, 'TBR'], // Télésiège Buttes-La Robella todo no data
    [3004, 'TPF|TPF Auto'], // Transports publics fribourgeois
    [3005, 'KBS'], // Kaisereggbahnen Schwarzsee AG todo no data
    [3009, 'TTM|TTM-tmv'], // Centre Touristique Moléson
    [3012, 'LGGI'], // Luftseilbahngenossenschaft Gitschenen
    [3013, 'TVGD'], // Télé-Villars-Gryon todo no data
    [3020, 'TTG'], // Télé-Torgon SA
    [3024, 'TLFC'], // TéléLaFouly-ChampexLac SA todo no data
    [3026, 'LHB-ssps'], // Val Sporz-Piz Scalottas todo no data
    [3028, 'NVRM'], // Remontées mécaniques SA todo no data
    [3031, 'TTY'], // Télé-Thyon SA todo no data
    [3032, 'TSD-asdt'], // Theytaz Excursions Sion
    [3033, 'TLLM'], // Télésiège Lana-La Meina
    [3036, 'LBER'], // Luftseilbahngenossenschaft Brügg-Eierschwand-Ruogig
    [3040, 'TOJ'], // Télésiège Ovronnaz-Jorasse todo no data
    [3042, 'SFT'], // Sesselbahn Fatschel - Triemel todo no data
    [3050, 'SBU'], // Sportbahnen Unterbäch AG
    [3051, 'BEST|ESMM'], // Sesselbahn St. Moritz Suvretta-Randolins todo no relation
    [3052, 'SVG'], // Sesselbahn Visperterminen-Giw todo no data
    [3054, 'SGES'], // Seilbahngenossenschaft Embd-Schalb
    [3063, 'SBR'], // Sportbahnen Bellwald Goms AG
    [3070, 'SKRa'], // Sesselbahn Kiental-Ramslauenen todo no relation
    [3072, 'Luftseilbahn Elsigenalp AG'], // Luftseilbahn Elsigbach-Elsigenalp
    [3073, 'BA SB|BA-SB'], // Bergbahnen Adelboden AG todo has no operator
    [3085, 'GLIS'], // Genossenschaft Luftseilbahn Sulwald
    [3087, 'RFB'], // Reichenbachfall-Bahn
    [3090, 'KSB'], // Kriens-Sonnenberg-Bahn todo no data
    [3091, 'SMF'], // Sportbahnen Melchsee-Frutt (ldb)
    [3092, 'LEF'], // Luftseilbahn Engelberg-Fürenalp
    [3093, 'LFCh'], // Luftseilbahn Fell-Chrüzhütte
    [3094, 'LFB'], // Luftseilbahn Fellboden-Bannalpsee
    [3099, 'LNE'], // Luftseilbahn Niederbauen
    [3101, 'GTBE'], // Genossenschaft Tschinglenbahn Elm
    [3102, 'StoB'], // Stoosbahnen AG
    [3105, 'HLAG'], // Holzegg Liegenschaften AG
    [3106, 'BHY'], // Bergbahnen Hoch-Ybrig AG
    [3108, 'Luftseilbahn Attinghausen–Brüsti AG'], // Luftseilbahn Attinghausen-Brüsti AG
    [3109, 'LFE'], // Luftseilbahn Flüelen-Eggbergen
    [3110, 'BKAG'], // Biel-Kinzig AG
    [3112, 'SBGG'], // Seilbahngenossenschaft Golzern
    [3115, 'LGIA'], // Luftseilbahngenossenschaft Arnisee
    [3119, 'GR-fab'], // Cantone di Grigioni
    [3120, 'GR-fsl'], // Funivia Selma-Landarenca
    [3121, 'KWS'], // Kraftwerk Sanetsch AG
    [3123, 'FSCR'], // Funiva San Carlo-Robiei
    [3128, 'SKR'], // Sesselbahn Krümmenschwil-Rietbach todo no relation
    [3129, 'SWG'], // Sesselbahn Wildhaus-Gamplüt
    [3130, 'SBA'], // Sportbahnen Amden
    [3133, 'BBMAG'], // Bergbahnen Malbun AG todo no relation
    [3135, ''], // Sportbahnen Kerenzerberg GmbH todo no relation
    [3137, 'LKM'], // Luftseilbahn Kies-Mettmen todo no relation
    [3138, 'LMW'], // Luftseilbahn Matt-Weissenberg
    [3139, 'SBE'], // Sportbahnen Elm
    [3140, 'AMG'], // Aelplibahn Malans Genossenschaft
    [3142, 'SFE'], // Gemeinde Fanas
    [3146, 'BO'], // Bergbahnen Obersaxen AG
    [3148, 'BPM-svcs'], // Bergbahnen Piz Mundaun AG
    [3151, 'SVGa'], // Sesselbahn Vals-Gadenstatt
    [3152, 'BPM-svh'], // Bergbahnen Piz Mundaun AG
    [3158, 'SFM'], // Sesselbahn Feldis-Mutta todo no relation
    [3161, 'S&R Samnau'], // Bergbahnen Samnaun AG
    [3162, 'EBS'], // ebs Energie AG
    [3165, 'LIV'], // Luftseilbahn Illgau - Vorder Oberberg todo no relation
    [3181, 'NLJ'], // Navigation Lac de Joux
    [3182, 'STGR'], // Solarfährbetrieb Thomas Geiger Reichenau
    [3183, ''], // Schiffahrtsunternehmung Silsersee todo osm has no relation
    [3185, 'EMAG'], // Ernst Mändli AG Nohl todo no data
    [3186, 'SZR-ET'], // Schiff Eglisau-Tössegg
    [3188, 'LAA'], // Luftseilbahn Amsteg-Arni
    [3190, 'FBG'], // Fähre Beckenried-Gersau todo no data
    [3191, 'WG-wg'], // Wasserngrat 2000 AG todo no data
    [3194, 'FWS'], // Franz Weiss Sarnen (Sarnersee)
    [3195, 'GSB'], // Politische Gemeinde Steckborn
    [3222, 'SMF'], // Sportbahnen Melchsee-Frutt (lsm)
    [3257, 'LPF'], // La Punt Ferien
    [3258, 'TCSA'], // TéléCharmey SA
    [3271, 'TN|TransN'], // Association neuchâteloise des Amis du Tramway ANAT
    [3849, 'VBZ'], // Verkehrsbetriebe Zürich INFO+
    [3955, 'TPL'], // Trasporti Pubblici Luganesi SA
    [7000, ''], // Interimsfahrplan / Horaire interimaire / Orario ad interim TODO Extrabus 1
    [7005, ''], // Riffelalp Resort AG Zermatt TODO has no operator what do we do (way / 229155251)
    [7006, 'ASA'], // Anrufsammeltaxi Arbon todo no data
    [7008, 'RRB'], // Ruftaxi Rorschacherberg todo no data
    [7011, 'ASTB'], // Anrufsammeltaxi Bischofszell todo no data
    [7012, 'ASTA'], // Anrufsammeltaxi Amriswil todo no data
    [7017, 'BBO'], // Gemeinde St. Gallenkappel
    [7025, 'BKG'], // Busbetrieb Kandersteg - Gasterntal
    [7027, 'WSU'], // Walker's Söhne Urnerboden todo no data
    [7030, 'SSM'], // Skilift Schilt AG 8753 Mollis todo no data
    [7031, 'AVB'], // Aroser Verkehrsbetriebe
    [7038, 'LEE'], // Autobusbetrieb LEE
    [7045, 'GHU'], // Bürgerbus Gondiswil-Huttwil-Ufhusen todo osm has no data
    [7046, 'OUW'], // Bürgerbus Kleindietwil-Oeschenbach-Walterswil todo no data
    [7047, 'SUTU'], // Sumvitg Turissem
    [7049, 'FRG'], // Förderverein Region Gantrisch todo no data
    [7050, 'ZB Bus Fpl'], // ZB Bus Fahrplanbedürfnisse todo no data
    [7052, 'GSUR'], // Gemeinde Surses – Cumegn Surses
    [7055, 'FCA'], // Funicar AG
    [7058, 'EAB'], // Engelberger Auto-Betriebe
    [7061, 'OSF'], // Ortsbus Saas-Fee
    [7067, ''], // Busbetrieb Oberems-Gruben todo no data
    [7069, 'AUT'], // Andermatt-Urserntal Tourismus GmbH
    [7070, 'TWS'], // Taxi todo no data
    [7078, 'BGB'], // Busbetrieb Gemeinde Bergün
    [7079, 'PRH'], // PRO REGIO HUTTWIL Verkehrsverein todo no data
    [7080, 'BALA'], // Bus alpin Lombachalp
    [7081, 'VNB'], // Verein Naturpark Beverin
    [7085, 'Gemeinde Silvaplana'], // Ortsbus der Gemeinde Silvaplana / Gemeinde Silvaplana
    [7087, 'RSZ'], // Bürgerbus Rüderswil
    [7088, 'THP'], // Trägerverein Historische Postautolinie
    [7090, 'ACO'], // Autoservizi Comazzi S.R.L. TODO has no data
    [7092, 'APRO'], // Prontobus
    [7200, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 1
    [7201, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 2
    [7202, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 3
    [7203, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 4
    [7204, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 5
    [7205, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 6
    [7206, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 7
    [7207, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 8
    [7208, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 9
    [7209, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 10
    [7210, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 11
    [7213, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 14
    [7217, 'BLS'], // BLS Ersatzverkehr LOS 1
    [9014, 'VDBB'], // Verein Dampfbahn Bern
    [9999, 'DIVINFO'], // Diverse INFO
    [13600, 'PB Fpl'], // Kriens-Fräkmüntegg
    [13700, 'RB'], // Weggis-Rigi Kaltbad
    [327000, 'Trenord'], // TreNord
    [800693, 'DB'], // DB Regio AG Baden-Württemberg
    [807000, 'DB'], // NeTS Planung DB
    [817000, 'ÖBB-Personenverkehr AG'], // NeTS Planung ÖBB
    [7211, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 12
    [7212, 'SBB|SBB CFF FFS|Schweizerische Bundesbahnen'], // SBB Ersatzverkehr LOS 13
    [7215, 'ZB|Zentralbahn'], // ZB Ersatzverkehr LOS 2
    [7216, 'ZB|Zentralbahn'], // ZB Ersatzverkehr LOS 3
    [7218, 'SOB'], // SOB Ersatzverkehr LOS 1
    [7220, 'SOB'], // SOB Ersatzverkehr LOS 3
    [7221, 'THURBO'], // THURBO Ersatzverkehr LOS 1
    [7223, 'TPF|TPF Auto'], // TPF Ersatzverkehr LOS 1
    [9020, 'TRAVYS|Travys'], // Transports Vallée de Joux-Yverdon-Ste-Croix (oc/bus)
    [15300, 'TN|TransN'] // Transports Publics Neuchâtelois SA
  ]);

  public static getName(lineRef: string): string {
    const parts = lineRef.split(':');

    if (parts.length != 3) {
      throw new Error(`failed to parse lineRef: ${lineRef}`);
    }

    const id = Number.parseInt(parts[1])

    if (isNaN(id)) {
      throw new Error(`failed to parse lineRef: ${lineRef}`);
    }

    let operator = this.operators.get(id);

    if (operator == undefined) {
      throw new Error(`failed to find operator name for id: ${id}`);
    }

    if (operator === '') {
      throw new Error(`tried to call line information for operator ${id} which osm has no data for`)
    }

    return operator;
  }
}
