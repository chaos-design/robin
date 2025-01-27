import React, { useRef, useState, useEffect } from 'react';

import Marquee, { MarqueeInstance, MultipleMarquee } from '@chaos-design/marquee';
import { TextList } from '../common/card';
import { Flex, Typography } from 'antd';


function marquee() {
  const marquee = useRef<MarqueeInstance[]>([]);

  const play = () => {
    if (marquee.current?.length) {
      marquee.current?.forEach((m) => {
        m?.handlePlay();
      });
    }
  };
  const pause = () => {
    if (marquee.current?.length) {
      marquee.current?.forEach((m) => {
        m?.handlePause();
      });
    }
  };

  useEffect(() => {
    play();

    return () => {
      pause();
    };
  }, []);

  return (
    <>
      <div style={{ width: '100%' }}>
        <Flex vertical gap={16}>
          <Typography.Title level={5}>
            自定义处理多个 Marquee 实例
          </Typography.Title>

          <div
            onMouseEnter={() => {
              pause();
            }}
            onMouseLeave={() => {
              play();
            }}>
            {Array(2).fill(1).map((_, i) => (
              <Marquee
                key={i}
                pauseOnHover
                onMount={m => {
                  marquee.current[i] = m;
                }}
                direction="left">
                {Array(Math.random() * 10 | 0 + 5).fill(1).map((_, i) => (
                  <TextList key={i} />
                ))}
              </Marquee>
            ))}
          </div>
        </Flex>
        <br />
        <Flex vertical gap={16}>
          <Typography.Title level={5}>
            使用组件处理多个 Marquee 实例
          </Typography.Title>

          <MultipleMarquee
            size={2}
            marquee={{
            }}>
            {Array(Math.random() * 20 | 0 + 5).fill(1).map((_, i) => (
              <TextList key={i} />
            ))}
          </MultipleMarquee>
        </Flex>
      </div>
    </>
  );
}

export default marquee;
