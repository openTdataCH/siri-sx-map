import type { DiDokRecord } from './didok';
import type { Situation } from './situation';

export class Marker {
  public sloId: string;
  public situations: Situation[] = [];
  public coordinates: [string, string];

  constructor(record: DiDokRecord) {
    this.sloId = record.SLOID;
    this.coordinates = [record.N_WGS84, record.E_WGS84];
  }

  public getIcon(): string {
    const situation = this.situations[0];
    switch (true) {
      case situation.priority === 4:
        return 'map-marker-orange.svg';
      case !situation.planned:
        return 'map-marker-red.svg';
      default:
        return 'map-marker-blue.svg';
    }
  }
}
