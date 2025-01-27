import React from 'react';

import Marquee from '@chaos-design/marquee';
import { InfoCard, UserCard } from '../common/card';

function marquee() {
  return (
    <div style={{
      height: 500,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }}>
      <Marquee
        pauseOnHover
        __debug
        direction="up"
        onMount={(params) => {
        }}>
        {Array(Math.random() * 10 | 0 + 5).fill(1).map((_, i) => (
          <UserCard
            key={i}
            index={i}
            style={{
            }}
          />
        ))}
      </Marquee>
      <Marquee
        pauseOnHover
        direction="down"
        onMount={(params) => {
        }}>
        {Array(Math.random() * 10 | 0 + 5).fill(1).map((_, i) => (
          <InfoCard key={i} index={i} />
        ))}
      </Marquee>
    </div>
  );
}

export default marquee;
