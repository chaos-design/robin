import React from 'react';

import Marquee from '@chaos-design/marquee';
import { InfoCard } from '../common/card';


function marquee() {
  return (
    <>
      <div style={{ width: '100%' }}>
        <Marquee pauseOnHover direction="left">
          {Array(Math.random() * 10 | 0 + 5).fill(1).map((_, i) => (
            <InfoCard key={i} index={i} />
          ))}
        </Marquee>
      </div>
    </>
  );
}

export default marquee;
