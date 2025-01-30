import React from 'react';

import Marquee from '@chaos-design/marquee';
import { InfoCard, UserCard } from '../common/card';
import { Flex, Space, Typography } from 'antd';

function marquee() {
  return (
    <div style={{
      overflow: 'hidden',
      width: '100%',
    }}>
      <Flex gap="middle" vertical>
        <Typography.Title level={2}>
          Left
        </Typography.Title>
        <Marquee
          pauseOnHover
          direction="left"
          onMount={(params) => {
          }}>
          {Array(Math.random() * 10 | 0 + 5).fill(1).map((_, i) => (
            <UserCard key={i} index={i} />
          ))}
        </Marquee>
      </Flex>
      <Flex gap="middle" vertical>
        <Typography.Title level={2}>
          Right
        </Typography.Title>
        <Marquee
          pauseOnHover
          direction="right"
          onMount={(params) => {
          }}>
          {Array(Math.random() * 10 | 0 + 5).fill(1).map((_, i) => (
            <InfoCard key={i} index={i} />
          ))}
        </Marquee>
      </Flex>
    </div >
  );
}

export default marquee;
