import React from 'react';

import { Card, Avatar } from 'antd';


export const UserCard = ({ index = 0, style = {} }: { index?: number; style?: React.CSSProperties; }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: 8, ...style }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Card.Meta title={`${index}: Europe Street beat`} description="www.instagram.com" />
    </Card>
  );
}

export const InfoCard = ({ index = 0, style = {} }: { index?: number; style?: React.CSSProperties; }) => {
  return (
    <Card
      style={{ width: 300, margin: 8, ...style }}
      hoverable
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Card.Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title={`${index}: Card title`}
        description="This is the description"
      />
    </Card>
  );
}

const textList = [
  '楚天千里清秋，水随天去秋无际。',
  '遥岑远目，献愁供恨，玉簪螺髻。',
  '落日楼头，断鸿声里，江南游子。把吴钩看了，栏杆拍遍，无人会，登临意。',
  '休说鲈鱼堪脍，尽西风，季鹰归未？',
  '求田问舍，怕应羞见，刘郎才气。可惜流年，忧愁风雨，树犹如此！',
  '倩何人唤取，红巾翠袖，揾英雄泪！',
  '寂寞深闺，柔肠一寸愁千缕。',
  '惜春春去。几点催花雨。',
  '倚遍阑干，只是无情绪。',
  '人何处。连天衰草，望断归来路。',
  '梦入江南烟水路，行尽江南，不与离人遇。',
  '睡里消魂无说处，觉来惆怅消魂误。',
  '欲尽此情书尺素，浮雁沉鱼，终了无凭据。',
  '却倚缓弦歌别绪，断肠移破秦筝柱。',
  '碧桃天上栽和露，不是凡花数。',
  '乱山深处水萦回，可惜一枝如画为谁开？',
  '轻寒细雨情何限！不道春难管。',
  '为君沉醉又何妨，只怕酒醒时候断人肠。',
];

export const TextList = () => {
  return (
    <div
      style={{
        margin: 8,
        padding: 10,
        fontSize: 16,
        borderRadius: 4,
        backgroundColor: '#f8f9fe'
      }}>
      {textList[Math.random() * textList.length | 0]}
    </div>
  );
}