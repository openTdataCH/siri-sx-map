import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import OsmToGeoJSON from 'osmtogeojson';
import { OperatorService } from './operator.service';

export class OsmService {
  private static readonly OSM_OVERPASS_URL = 'https://overpass.osm.ch/api/interpreter';

  public static async getLine(ref: string, name: string): Promise<FeatureCollection<Geometry, GeoJsonProperties>> {
    const operator = OperatorService.getName(ref);

    const query = `[out:json][timeout:3000];
    relation["ref:siri-sx"="${ref}"];
    >>;

    // when no ways are found with siri-sx ref, make query with operator;
    if (count(ways) == 0) {
      relation
        ["type"="route"]
        ["ref"="${name}"]
        ["operator"~"${operator}"];
    }

    way(r)[role=""][highway!="platform"][public_transport!="platform"];
    out geom;`;
    const result = await this.executeQuery(query);
    
    return OsmToGeoJSON(await result.json());
  }

  private static async executeQuery(query: string) {
    const url = new URL(this.OSM_OVERPASS_URL);

    return await fetch(url, {
      method: 'POST',
      body: query,
      headers: {
        Accept: 'application/json',
      },
    });
  }
}
