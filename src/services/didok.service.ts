import type { DiDokRecord } from '@/models/didok';

export class DidokService {
  private static readonly DIDOK_URL = '/odp/en/dataset/didok';

  private static didokResource?: string = undefined;

  private static async getDiDokResource() {
    if (this.didokResource) return this.didokResource;
    const didokSite = await fetch(this.DIDOK_URL);
    const dom = new DOMParser().parseFromString(await didokSite.text(), 'text/html');
    const url = (dom.querySelector('a[title="Dienststellen_actualdate.csv"]') as HTMLLinkElement).href;
    return url.substring(url.lastIndexOf('/') + 1);
  }

  public static async loadFromQuery(sloids: string[]): Promise<Map<string, DiDokRecord>> {
    const resourceId = await this.getDiDokResource();

    const result = await fetch('/odp/en/api/3/action/datastore_search_sql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: `select "SLOID", "E_WGS84", "N_WGS84" from "${resourceId}" where "E_WGS84" is not null and "N_WGS84" is not null and "SLOID" in (${sloids
          .map((id) => `'${id}'`)
          .join(',')});`,
      }),
    });

    const json = await result.json();
    const records = new Map<string, DiDokRecord>();
    json.result.records.forEach((r: DiDokRecord) => records.set(r.SLOID, r));
    return records;
  }
}
