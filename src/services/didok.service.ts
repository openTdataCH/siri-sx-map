import type { DiDokRecord } from '@/models/didok';
import * as zip from '@zip.js/zip.js';

export class DidokService {
  private static readonly DIDOK_URL = '/odp/de/dataset/service-points-actual-date';

  private static records = new Map<string, DiDokRecord>();

  private static didokResourceLink?: string = undefined;

  public static async load() {
    if (this.records.size === 0) {
      await this.loadFromZip();
    }
    return this.records;
  }

  private static async fetchDidokLink(): Promise<string> {
    if (this.didokResourceLink) return this.didokResourceLink;
    const html = await fetch(this.DIDOK_URL);
    const doc = new DOMParser().parseFromString(await html.text(), 'text/html');
    const link = (doc.querySelector('.resource-item a[download]') as HTMLLinkElement).href;
    this.didokResourceLink = link.replace('https://opentransportdata.swiss', '/odp');
    return this.didokResourceLink;
  }

  private static async loadFromZip() {
    const link = await this.fetchDidokLink();
    const reader = new zip.ZipReader(new zip.HttpReader(link, { preventHeadRequest: true }), { useWebWorkers: true });
    const entries = await reader.getEntries();

    if (entries.length && entries[0]) {
      const csv = entries[0];
      const csvText = await csv.getData?.(new zip.TextWriter(), {});

      this.records = this.parseCSV(csvText as string);
    }
    await reader.close();
  }

  private static parseCSV(csv: string): Map<string, DiDokRecord> {
    const result = new Map<string, DiDokRecord>();
    let sloidIndex = 0;
    let wgs84NorthIndex = 0;
    let wgs84EastIndex = 0;
    csv.split('\n').forEach((line, i) => {
      const cells = line.split(';');
      if (i === 0) {
        [sloidIndex, wgs84NorthIndex, wgs84EastIndex] = this.findHeaderIndex(cells);
      } else {
        const n = cells[wgs84NorthIndex];
        const e = cells[wgs84EastIndex];
        const sloid = cells[sloidIndex];
        if (e && n) {
          result.set(sloid, { SLOID: sloid, N_WGS84: n, E_WGS84: e });
        }
      }
    });
    return result;
  }

  private static findHeaderIndex(headers: string[]): [number, number, number] {
    return [
      headers.findIndex((e) => e === 'sloid'),
      headers.findIndex((e) => e === 'wgs84North'),
      headers.findIndex((e) => e === 'wgs84East')
    ];
  }
}
