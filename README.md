# SIRI SX Situation Map / Visualisierung der Störungsmeldungen auf einer Karte

As part of the Project 1 module in the Bern University of Applied Sciences (BFH), this repo develops the project visualization of disruption messages on a map.

## Description

The SBB starts to publish disruption messages as SIRI SX messages [(XML)](https://www.vdv.de/736-2-sds.pdfx). These messages can be requested and visualized.\
The [interface](https://transportdatamanagement.ch/content/uploads/2020/11/Architektur_Ereignisdatenaustausch.pdf) is still under construction.
A first visualization gives hints how and if it can be worked with.\
The project would be a first step in this direction and would include the following:

- Development of a webapp, which requests the disruption messages via a request and can evaluate the response.
- The disruption are displayed in a table and can be sorted and filtered.
- The disruption are displayed on a displayed on a map and can be filtered.

## Technologies

<div>
    <a href="https://www.typescriptlang.org/"><img title="Typescript" src="https://raw.githubusercontent.com/microsoft/TypeScript-Website/f407e1ae19e5e990d9901ac8064a32a8cc60edf0/packages/typescriptlang-org/static/branding/ts-logo-512.svg" height="100" /></a>
    <a href="https://vuejs.org/"><img title="Vue" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" height="100" /></a>
    <a href="https://vitejs.dev/"><img title="Vite" src="https://vitejs.dev/logo-with-shadow.png" height="110" /></a>
    <a href="https://leafletjs.com/"><img title="Leaflet" src="https://raw.githubusercontent.com/Leaflet/Leaflet/main/src/images/logo.svg" height="90" /></a>
    <a href="https://www.openstreetmap.org/"><img title="OpenStreetMap (osm)" src="https://wiki.openstreetmap.org/w/images/7/79/Public-images-osm_logo.svg" height="100" /></a>
</div>

## More Inforamtion

- [Documentation](docs/DOCS.md)
- [Roles](docs/ROLES.md)
- [Line problems](docs/LINE_PROBLEMS.md)

## Supervisors

- Michael Luggen
- Roger Kneubühl, roger.kneubuehl@sbb.ch
- Griesser Martin, martin.griesser@sbb.ch

## Authors

- [Blättler Christian](https://github.com/cblaettl)
- [Bürgi Tobias](https://github.com/Tandoraz)
- [Hunziker Nathanaël](https://github.com/experiencedGAWSER)

