import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import type { Situation } from './situation';

export class Line {
  public ref: string;
  public situations: Situation[] = [];
  public geoJson: FeatureCollection<Geometry, GeoJsonProperties>;

  constructor(ref: string, geoJson: FeatureCollection<Geometry, GeoJsonProperties>) {
    this.ref = ref;
    this.geoJson = geoJson;
  }

  public getColor(): string {
    const situation = this.situations[0];
    switch (true) {
      case situation.priority === 4:
        return '#FFA500';
      case !situation.planned:
        return '#EB0000';
      default:
        return '#2E86C1';
    }
  }
}
