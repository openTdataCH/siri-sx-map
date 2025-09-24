import { Language, Situation, TextSize } from '@/models/situation';

export class SiriService {
  // private static readonly ODP_URL = '/odp-siri/siri-sx';
  private static readonly ODP_URL = 'https://tools.odpch.ch/siri-sx-data/siri_sx-latest-prod.xml';
  private static readonly PARSER = new DOMParser();

  public static async getSituations(
    language: Language,
    textSize: TextSize,
    ownerRefs: Array<string>,
    perspective: string,
    onlyActive: boolean
  ): Promise<Situation[]> {
    const url = this.ODP_URL + '?rand=' + Date.now().toString();

    const response = await fetch(url, {
      method: 'GET',
    });

    const xml = await response.text();

    const parsedXml = this.PARSER.parseFromString(xml, 'text/xml');

    const ptSituationElements = parsedXml.documentElement.getElementsByTagName('PtSituationElement');

    const result: Situation[] = [];

    for (const ptSituationElement of ptSituationElements) {
      try {
        const situation = new Situation(ptSituationElement, language, textSize);

        if (!situation.hasOwner(ownerRefs)) {
          continue;
        }

        if (!situation.hasPerspective(perspective)) {
          continue;
        }

        if (onlyActive && !situation.isValid()) {
          continue;
        }

        result.push(situation);
      } catch (error) {
        console.error('failed to load Situation', ptSituationElement, error);
      }
    }

    return result;
  }
}
