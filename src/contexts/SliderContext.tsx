'use client';

import { SliderElement } from '@/components/Slider';
import React, {
  useState, createContext, useMemo, useContext,
} from 'react';

interface Props {
  children: React.ReactNode
}

interface ContextType {
  sliderElements: SliderElement[]
  setSliderElements: React.Dispatch<React.SetStateAction<SliderElement[]>>
  currentSlide: Number,
  onSlideChange: (swiper: any) => void,
}

const SliderContext = createContext<ContextType | null>(null);

export function useSlider(sliderElements: SliderElement[]) {
  const context = useContext(SliderContext);
  context?.setSliderElements(sliderElements);
}

export default function SliderProvider({ children }: Props) {
  const [sliderElements, setSliderElements] = useState<SliderElement[]>([]);
  const [currentSlide, setCurrentSlide] = useState<Number>(0);

  const onSlideChange = (swiper: any) => {
    const newCurrentSlide = swiper?.details?.activeIndex || 0;
    setCurrentSlide(newCurrentSlide);
  };

  const contextValue = useMemo(() => ({
    sliderElements,
    setSliderElements,
    currentSlide,
    onSlideChange,
  }), [sliderElements, currentSlide]);

  return (
    <SliderContext.Provider value={contextValue}>
      {children}
    </SliderContext.Provider>
  );
}
