import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
  CSSProperties,
  FC,
  forwardRef,
  Children,
  MutableRefObject,
  RefAttributes,
} from 'react';

import './index.scss';

export enum MarqueeStatus {
  INITIAL = 'initial',
  RUNNING = 'running',
  PAUSED = 'paused',
}

export interface MarqueeInstance {
  containerWidth?: number;
  marqueeWidth?: number;
  marqueeStatus?: MarqueeStatus;

  containerRef?: React.MutableRefObject<HTMLDivElement>;
  marqueeRef?: React.RefObject<HTMLDivElement>;

  handlePause: () => void;
  handlePlay: () => void;
}

export interface MarqueeProps extends RefAttributes<HTMLDivElement> {
  style?: CSSProperties;
  className?: string;
  itemClassName?: string;
  autoFill?: boolean;
  play?: boolean;
  pauseOnHover?: boolean;
  pauseOnClick?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  delay?: number;
  loop?: number;
  gradient?: boolean;
  gradientColor?: string;
  gradientWidth?: number | string;
  children?: ReactNode;

  onFinish?: () => void;
  onIterationComplete?: () => void;
  onMount?: (props: MarqueeInstance) => void;

  __debug?: boolean;
}

export const Marquee: FC<MarqueeProps> = forwardRef(function Marquee(props, ref) {
  const {
    __debug = false,
    style = {},
    className = '',
    itemClassName = '',
    autoFill = false,
    play = true,
    pauseOnHover = false,
    pauseOnClick = false,
    direction = 'left',
    speed = 30,
    delay = 0,
    loop = 0,
    gradient = false,
    gradientColor = 'white',
    gradientWidth = 200,
    onFinish,
    onIterationComplete,
    onMount,
    children,
  } = props || {};

  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [marqueeStatus, setMarqueeStatus] = useState(MarqueeStatus.INITIAL);
  const [isMounted, setIsMounted] = useState(false);
  const [marqueeDynamicStyle, setMarqueeDynamicStyle] = useState({});

  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = (ref as MutableRefObject<HTMLDivElement>) || rootRef;
  const marqueeRef = useRef<HTMLDivElement>(null);

  const calculateWidth = useCallback(() => {
    if (marqueeRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const marqueeRect = marqueeRef.current.getBoundingClientRect();
      let containerWidth = containerRect.width;
      let marqueeWidth = marqueeRect.width;

      if (direction === 'up' || direction === 'down') {
        containerWidth = containerRect.height;
        marqueeWidth = marqueeRect.height;
      }

      if (autoFill && containerWidth && marqueeWidth) {
        setMultiplier(
          marqueeWidth < containerWidth
            ? Math.ceil(containerWidth / marqueeWidth)
            : 1
        );
      } else {
        setMultiplier(1);
      }

      setContainerWidth(containerWidth);
      setMarqueeWidth(marqueeWidth);
    }
  }, [autoFill, containerRef, direction]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    calculateWidth();
    if (marqueeRef.current && containerRef.current) {
      const resizeObserver = new ResizeObserver(() => calculateWidth());
      resizeObserver.observe(containerRef.current);
      resizeObserver.observe(marqueeRef.current);

      return () => {
        if (!resizeObserver) {
          return;
        }
        resizeObserver.disconnect();
      };
    }
  }, [calculateWidth, containerRef, isMounted]);

  useEffect(() => {
    calculateWidth();
  }, [calculateWidth, children]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof onMount === 'function') {
      onMount({
        handlePause: handleMarqueePause,
        handlePlay: handleMarqueeRunning,
        containerWidth,
        marqueeWidth,
        containerRef,
        marqueeRef,
        marqueeStatus,
      });
    }
  }, [containerWidth, marqueeWidth]);

  useEffect(() => {
    if (marqueeWidth < containerWidth) {
      handleMarqueePause();
    }
  }, [marqueeWidth, containerWidth]);

  useEffect(() => {
    if (play) {
      setMarqueeStatus(MarqueeStatus.RUNNING);
    }

    return () => {
      setMarqueeStatus(MarqueeStatus.INITIAL);
    }
  }, [play]);

  __debug && console.log('calculateWidth', {
    marqueeWidth,
    containerWidth,
    containerRef: containerRef.current,
    marqueeRef: marqueeRef.current
  })
  const duration = useMemo(() => {
    if (autoFill) {
      return (marqueeWidth * multiplier) / speed;
    } else {
      return marqueeWidth < containerWidth
        ? containerWidth / speed
        : marqueeWidth / speed;
    }
  }, [autoFill, containerWidth, marqueeWidth, multiplier, speed]);

  const containerStyle = useMemo(
    () => {
      return {
        ...style,
        ['--pause-on-hover' as string]:
          !play || pauseOnHover ? 'paused' : 'running',
        ['--pause-on-click' as string]:
          !play || (pauseOnHover && !pauseOnClick) || pauseOnClick
            ? 'paused'
            : 'running',
        ['--width' as string]:
          direction === 'up' || direction === 'down' ? '100vh' : '100%',
        ['--transform' as string]:
          direction === 'up'
            ? 'rotate(-90deg)'
            : direction === 'down'
              ? 'rotate(90deg)'
              : 'none',
      }
    },
    [style, play, pauseOnHover, pauseOnClick, direction]
  );

  const gradientStyle = useMemo(
    () => ({
      ['--gradient-color' as string]: gradientColor,
      ['--gradient-width' as string]:
        typeof gradientWidth === 'number'
          ? `${gradientWidth}px`
          : gradientWidth,
    }),
    [gradientColor, gradientWidth]
  );

  const marqueeStyle = useMemo(
    () => ({
      ['--play' as string]: play ? 'running' : 'paused',
      ['--direction' as string]: direction === 'left' ? 'normal' : 'reverse',
      ['--duration' as string]: `${duration}s`,
      ['--delay' as string]: `${delay}s`,
      ['--iteration-count' as string]: !!loop ? `${loop}` : 'infinite',
      ['--min-width' as string]: autoFill ? `auto` : '100%',
    }),
    [play, direction, duration, delay, loop, autoFill]
  );

  const childStyle = useMemo(
    () => ({
      ['--transform' as string]:
        direction === 'up'
          ? 'rotate(90deg)'
          : direction === 'down'
            ? 'rotate(-90deg)'
            : 'none',
    }),
    [direction]
  );

  const multiplyChildren = useCallback(
    (multiplier: number) => {
      return [
        ...Array(
          Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 0
        ),
      ].map((_, i) => (
        <Fragment key={i}>
          {Children.map(children, (child) => {
            return (
              <div style={childStyle} className={`cdm-child ${itemClassName || ''}`}>
                {child}
              </div>
            );
          })}
        </Fragment>
      ));
    },
    [childStyle, children]
  );

  const handleMarqueePause = useCallback(() => {
    setMarqueeStatus(MarqueeStatus.PAUSED);
    setMarqueeDynamicStyle({
      ['--play' as string]: 'paused',
    })
  }, []);

  const handleMarqueeRunning = useCallback(() => {
    setMarqueeStatus(MarqueeStatus.RUNNING);
    setMarqueeDynamicStyle({
      ['--play' as string]: 'running',
    })
  }, []);

  return !isMounted ? null : (
    <div
      ref={containerRef}
      style={containerStyle}
      className={'cdm-marquee-container ' + className}
    >
      {gradient && <div style={gradientStyle} className="cdm-overlay" />}
      <div
        className="cdm-marquee"
        style={{
          ...marqueeStyle,
          ...marqueeDynamicStyle,
        }}
        onAnimationIteration={onIterationComplete}
        onAnimationEnd={onFinish}
      >
        <div className="cdm-initial-child-container" ref={marqueeRef}>
          {Children.map(children, (child) => {
            return (
              <div style={childStyle} className={`cdm-child ${itemClassName || ''}`}>
                {child}
              </div>
            );
          })}
        </div>
        {multiplyChildren(multiplier - 1)}
      </div>
      <div
        className="cdm-marquee cdm-marquee-fill"
        style={{
          ...marqueeStyle,
          ...marqueeDynamicStyle,
        }}>
        {multiplyChildren(multiplier)}
      </div>
    </div>
  );
});
