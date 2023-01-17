import { getBooleanElementByTagName, getSingleElementByTagName } from './utils';

export enum Language {
  German = 'DE',
  English = 'EN',
  French = 'FR',
  Italian = 'IT',
}

export namespace Language {
  export function fromString(lang: string | null) {
    switch (lang) {
      case 'EN':
        return Language.English;
      case 'FR':
        return Language.French;
      case 'IT':
        return Language.Italian;
      default:
        return Language.German;
    }
  }
}

export enum TextSize {
  Small = 'S',
  Medium = 'M',
  Large = 'L',
}

export namespace TextSize {
  export function fromString(textSize: string | null) {
    switch (textSize) {
      case 'S':
        return TextSize.Small;
      case 'L':
        return TextSize.Large;
      default:
        return TextSize.Medium;
    }
  }
}

export class Situation {
  public valid: ValidityPeriod[] = [];
  public information: PassengerInformation;
  public affects: Affects;
  public planned: boolean;
  public priority: number;

  /**
   * @param xml - <PtSituationElement> xml element
   */
  constructor(xml: Element, language: Language, size: TextSize) {
    const validityPeriods = xml.getElementsByTagName('ValidityPeriod');

    for (const period of validityPeriods) {
      const validityPeriod = new ValidityPeriod(period);

      this.valid.push(validityPeriod);
    }

    const publishingActions = xml.getElementsByTagName('PublishingAction');
    const filteredPublishingActions: Element[] = [];

    for (const publishingAction of publishingActions) {
      const scopeType = getSingleElementByTagName(publishingAction, 'ScopeType');

      // filter out <ScopeType>vehicleJourney</ScopeType>
      if (scopeType.innerHTML !== 'stopPlace' && scopeType.innerHTML !== 'line') {
        continue;
      }

      filteredPublishingActions.push(publishingAction);
    }

    if (filteredPublishingActions.length !== 1) {
      throw new Error(`multiple PublishingAction with ScopeType 'stopPlace' or 'line' found in PtSituationElement`);
    }

    const publishingAction = publishingActions[0];

    this.affects = new Affects(publishingAction);

    const passengerInformation = getSingleElementByTagName(publishingAction, 'PassengerInformationAction');

    this.information = new PassengerInformation(passengerInformation, language, size);

    this.planned = getBooleanElementByTagName(xml, 'Planned', false);

    this.priority = parseInt(getSingleElementByTagName(xml, 'Priority').innerHTML);
  }

  public isValid(): boolean {
    const now = new Date();

    for (const period of this.valid) {
      const startsBeforeNow = now.getTime() > period.from.getTime();
      const endsAfterNow = now.getTime() < period.until.getTime();

      if (startsBeforeNow && endsAfterNow) {
        return true;
      }
    }

    return false;
  }

  public hasPerspective(perspective: string): boolean {
    return perspective == '' || this.information.perspectives.includes(perspective);
  }

  public hasOwner(ownerRefs: Array<string>): boolean {
    return ownerRefs.length === 0 || ownerRefs.includes(this.information.ownerRef);
  }
}

export class Affects {
  public lines: AffectedLine[] = [];
  public stopPlaces: AffectedStopPlace[] = [];

  /**
   * @param xml - <PublishingAction> xml element
   */
  constructor(xml: Element) {
    const affectedStopPlaces = xml.getElementsByTagName('AffectedStopPlace');

    for (const affectedStopPlace of affectedStopPlaces) {
      const stopPlace = new AffectedStopPlace(affectedStopPlace);

      this.stopPlaces.push(stopPlace);
    }

    const affectedLines = xml.getElementsByTagName('AffectedLine');

    for (const affectedLine of affectedLines) {
      const line = new AffectedLine(affectedLine);

      this.lines.push(line);
    }
  }
}

export class AffectedLine {
  public name: string;
  public ref: string;
  public operator: {
    name: string;
    ref: string;
  };

  /**
   * @param xml - <AffectedLine> xml element
   */
  constructor(xml: Element) {
    const publishedLineName = getSingleElementByTagName(xml, 'PublishedLineName');

    this.name = publishedLineName.innerHTML;

    const lineRef = getSingleElementByTagName(xml, 'LineRef');

    this.ref = lineRef.innerHTML;

    let operatorName = 'unknown';
    let operatorRef = '';

    try {
      operatorName = getSingleElementByTagName(xml, 'OperatorName').innerHTML;
    } catch (error) {}

    try {
      operatorRef = getSingleElementByTagName(xml, 'OperatorRef').innerHTML;
    } catch (error) {}

    this.operator = {
      name: operatorName,
      ref: operatorRef,
    };
  }
}

export class AffectedStopPlace {
  public sloId: string;
  public name: string;

  /**
   * @param xml - <AffectedStopPlace> xml element
   */
  constructor(xml: Element) {
    const placeName = getSingleElementByTagName(xml, 'PlaceName');

    this.name = placeName.innerHTML;

    const stopPlaceRef = getSingleElementByTagName(xml, 'StopPlaceRef');

    this.sloId = stopPlaceRef.innerHTML;
  }
}

export class PassengerInformation {
  public summary: string;
  public reason: string;
  public description: string;
  public recommendation: string;
  public duration: string;
  public consequence: string;
  public infoLink: string;
  public ownerRef: string;
  public perspectives: string[];

  /**
   * @param xml - <PassengerInformationAction> xml element
   */
  constructor(xml: Element, language: Language, size: TextSize) {
    const textualContent = this.getTextualContent(xml, size);

    this.summary = this.getText(textualContent, 'SummaryText', language);
    this.reason = this.getText(textualContent, 'ReasonText', language);
    this.description = this.getText(textualContent, 'DescriptionText', language);
    this.recommendation = this.getText(textualContent, 'RecommendationText', language);
    this.duration = this.getText(textualContent, 'DurationText', language);
    this.consequence = this.getText(textualContent, 'ConsequenceText', language);
    this.infoLink = this.getText(textualContent, 'Label', language);
    this.ownerRef = getSingleElementByTagName(xml, 'OwnerRef').innerHTML.split(':').pop() || '';
    this.perspectives = Array.from(xml.getElementsByTagName('Perspective')).map((value) => value.innerHTML);
  }

  private getTextualContent(xml: Element, size: TextSize): Element {
    const contentSizes = xml.getElementsByTagName('TextualContentSize');

    for (const contentSize of contentSizes) {
      if (contentSize.innerHTML !== size) {
        continue;
      }

      const parent = contentSize.parentElement;

      if (!parent) {
        throw new Error(`invalid TextualContent for PassengerInformationAction ${xml}`);
      }

      return parent;
    }

    const fallback = contentSizes.item(0);

    if (fallback) {
      return fallback;
    }

    throw new Error(`TextualContentSize ${size} not found in PassengerInformationAction ${xml}`);
  }

  private getText(xml: Element, tagName: string, language: Language): string {
    const textElements = xml.getElementsByTagName(tagName);

    for (const textElement of textElements) {
      if (textElement.getAttribute('xml:lang') !== language) {
        continue;
      }

      return textElement.innerHTML;
    }

    const fallback = textElements.item(0);

    if (fallback) {
      return fallback.innerHTML;
    }

    console.debug(`${tagName} with language ${language} not found in TextualContent ${xml}`);

    return '';
  }
}

export class ValidityPeriod {
  public from: Date;
  public until: Date;

  /**
   * @param xml - <ValidityPeriod> xml element
   */
  constructor(xml: Element) {
    const fromCollection = xml.getElementsByTagName('StartTime');
    const untilCollection = xml.getElementsByTagName('EndTime');

    if (fromCollection.length !== 1 || untilCollection.length !== 1) {
      throw new Error(`invalid ValidityPeriod for xml element ${xml}`);
    }

    const from = fromCollection.item(0)?.innerHTML;
    const until = untilCollection.item(0)?.innerHTML;

    if (!from || !until) {
      throw new Error(`invalid ValidityPeriod for xml element ${xml}`);
    }

    this.from = new Date(from);
    this.until = new Date(until);
  }
}
