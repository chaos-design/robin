import React, { useState } from 'react';

import Marquee, { MarqueeInstance, } from '@chaos-design/marquee';
import { InfoCard, UserCard } from '../common/card';
import { Typography } from 'antd';

function App() {
  const [marquee, setMarquee] = useState<MarqueeInstance[]>();

  return (
    <>
      <div style={{ width: '100%' }}>
        <Typography.Title level={5}>内容过少，不触发跑马灯</Typography.Title>
        <Marquee pauseOnHover>
          {Array(1).fill(1).map((_, i) => (
            <UserCard key={i} index={i} />
          ))}
        </Marquee>
        <br />
        <br />
        <Typography.Title level={5}>关闭滚动(play=false)</Typography.Title>
        <Marquee
          pauseOnHover
          play={false}
          onMount={(params) => {
            setMarquee(params);
          }}>
          {Array(Math.random() * 10 | 0 + 5).fill(1).map((_, i) => (
            <UserCard key={i} index={i} />
          ))}
        </Marquee>
      </div>
    </>
  );
}

export default App;
