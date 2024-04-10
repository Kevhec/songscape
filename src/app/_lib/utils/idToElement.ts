import { generateUUID } from '@lib/utils/uuidgenerator';

interface Params {
  element: any
}

function idToElement({ element }: Params) {
  const elementWithId = {
    item: element,
    id: crypto.randomUUID ? crypto.randomUUID() : generateUUID(),
  };

  return elementWithId;
}

export default idToElement;
