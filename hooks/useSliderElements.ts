import { useEffect, useState } from 'react';
import type { SliderElement } from '@/components/Slider';

interface Params {
  elements: React.ReactNode[]
}

function useSliderElements({ elements }: Params) {
  const [sliderElements, setSliderElements] = useState<SliderElement[] | null>(null);

  useEffect(() => {
    const newSliderElements: SliderElement[] = elements?.map((element) => ({
      item: element,
      id: crypto.randomUUID(),
    }));
    setSliderElements(newSliderElements);
  }, [elements]);

  return [sliderElements];
}

export default useSliderElements;
