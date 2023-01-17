import type {Language, TextSize} from "@/models/situation";

export const getSingleElementByTagName = (xml: Element, tagName: string): Element => {
  const elements = xml.getElementsByTagName(tagName)

  if (elements.length !== 1) {
    console.debug({ xml, tagName, elements });
    throw new Error(`expected exactly one ${tagName} in xml element, but got ${elements.length} elements.`);
  }

  const element = elements.item(0);

  if (!element) {
    throw new Error(`expected exactly one ${tagName} in xml element`);
  }

  return element
}

export const getBooleanElementByTagName = (xml: Element, tagName: string, defaultBool: boolean): boolean => {
  const elements = xml.getElementsByTagName(tagName)

  if (elements.length > 1) {
    console.debug({ xml, tagName, elements });
    throw new Error(`expected boolean element ${tagName} in xml element, but got ${elements.length} elements.`);
  }

  if (elements.length == 0) {
    return defaultBool;
  }
  const element = elements.item(0);
  return element!.innerHTML == 'true';
}

export interface FilterModel {
  lang: Language;
  textSize: TextSize;
  ownerRef: Array<string>;
  perspective: string;
  zoom: number;
  center: [number, number];
  active: boolean;
}