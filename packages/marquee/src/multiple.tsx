import React, { useRef, useEffect, forwardRef, Children, ReactNode, RefAttributes, useImperativeHandle } from 'react';

import { Marquee, MarqueeInstance, MarqueeProps, } from './marquee';

export interface MultipleMarqueeProps extends RefAttributes<{
  play: () => void;
  pause: () => void;
}> {
  marquee?: MarqueeProps;
  children?: ReactNode;
  size?: number;
}

const chunk = (arr: ReactNode[], size: number) => {
  const result = [];
  const chunkSize = Math.ceil(arr.length / size);

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
};

const MultipleMarquee: React.FC<MultipleMarqueeProps> = forwardRef(function MultipleMarquee({ marquee, children, size = 2 }, ref) {
  const marqueeInstance = useRef<MarqueeInstance[]>([]);

  const play = () => {
    if (marqueeInstance.current?.length) {
      marqueeInstance.current?.forEach((m) => {
        m?.handlePlay();
      });
    }
  };
  const pause = () => {
    if (marqueeInstance.current?.length) {
      marqueeInstance.current?.forEach((m) => {
        m?.handlePause();
      });
    }
  };

  useImperativeHandle(ref, () => ({
    play,
    pause,
  }), [])

  useEffect(() => {
    play();

    return () => {
      pause();
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        pause();
      }}
      onMouseLeave={() => {
        play();
      }}>
      {chunk(Children.toArray(children), size).map((child, i) => (
        <Marquee
          key={i}
          pauseOnHover
          autoFill
          onMount={m => {
            marqueeInstance.current[i] = m;
          }}
          direction="left"
          {...marquee}
        >
          {child}
        </Marquee>
      ))}
    </div>
  );
});

export { MultipleMarquee };
