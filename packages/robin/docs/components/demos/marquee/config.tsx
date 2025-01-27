import React, { useState, useRef } from 'react';

import Marquee, { MarqueeProps, } from '@chaos-design/marquee';
import { InfoCard, UserCard } from '../common/card';
import { Button, ColorPicker, Flex, InputNumber, Radio, Space, Switch, Typography } from 'antd';

function marquee() {
  const [marquee, setMarquee] = useState<MarqueeProps>({
    play: true,
    autoFill: false,
    pauseOnHover: false,
    pauseOnClick: false,
    direction: 'left',
    speed: 30,
    delay: 0,
    loop: 0,
    gradient: false,
    gradientColor: '#fff',
    gradientWidth: 200,
  });

  const changeValue = (v: Record<string, any> = {}) => {
    setMarquee(m => ({
      ...m,
      ...v,
    }));
  }

  return (
    <>
      <Flex vertical gap="middle">
        <Space size={'middle'}>
          <Button
            type="primary"
            onClick={() => {
              changeValue({
                play: !marquee.play,
              });
            }}>
            {marquee.play ? '暂停' : '播放'}
          </Button>
          <Flex gap="middle" align='center'>
            <Typography.Text>pauseOnHover</Typography.Text>
            <Switch
              checked={marquee?.pauseOnHover}
              onChange={(checked) => {
                changeValue({
                  pauseOnHover: checked,
                });
              }}
            />
          </Flex>
          <Flex gap="middle" align='center'>
            <Typography.Text>pauseOnClick</Typography.Text>
            <Switch
              checked={marquee?.pauseOnClick}
              onChange={(checked) => {
                changeValue({
                  pauseOnClick: checked,
                });
              }} />
          </Flex>
          <Flex gap="middle" align='center'>
            <Typography.Text>autoFill</Typography.Text>
            <Switch
              checked={marquee?.autoFill}
              onChange={(checked) => {
                changeValue({
                  autoFill: checked,
                });
              }} />
          </Flex>
          <Flex gap="middle" align='center'>
            <Typography.Text>滚动方向</Typography.Text>
            <Radio.Group defaultValue="left"
              onChange={(e) => {
                changeValue({
                  direction: e.target.value,
                });
              }}>
              <Radio.Button value="left">Left</Radio.Button>
              <Radio.Button value="right">Right</Radio.Button>
            </Radio.Group>
          </Flex>
        </Space>
        <Space size={'middle'}>
          <Flex gap="middle" align='center'>
            <InputNumber
              value={marquee.speed}
              addonBefore="滚动速度"
              addonAfter="px/s"
              min={0}
              step={1}
              style={{ width: 200 }}
              onChange={value => {
                changeValue({
                  speed: value,
                })
              }} />
          </Flex>
          <Flex gap="middle" align='center'>
            <InputNumber
              value={marquee.delay}
              addonBefore="滚动延迟"
              addonAfter="s"
              min={0}
              step={1}
              style={{ width: 200 }}
              onChange={value => {
                changeValue({
                  delay: value,
                })
              }} />
          </Flex>
          <Flex gap="middle" align='center'>
            <InputNumber
              value={marquee.loop}
              addonBefore="滚动循环(0为无限循环)"
              addonAfter="s"
              min={0}
              step={1}
              style={{ width: 300 }}
              onChange={value => {
                changeValue({
                  loop: value,
                })
              }} />
          </Flex>
        </Space>
        <Space size={'middle'}>
          <Flex gap="middle" align='center'>
            <Typography.Text>是否开启渐变</Typography.Text>
            <Switch
              checked={marquee?.gradient}
              onChange={(checked) => {
                changeValue({
                  gradient: checked,
                });
              }}
            />
          </Flex>
          <Flex gap="middle" align='center'>
            <InputNumber
              value={marquee.gradientWidth}
              addonBefore="渐变宽度"
              min={0}
              step={1}
              style={{ width: 200 }}
              onChange={value => {
                changeValue({
                  gradientWidth: value,
                })
              }} />
          </Flex>
          <Flex gap="middle" align='center'>
            <Typography.Text>渐变颜色</Typography.Text>
            <ColorPicker
              value={marquee.gradientColor}
              onChange={color => {
                changeValue({
                  gradientColor: color.toHexString(),
                })
              }}
            />
          </Flex>
        </Space>
      </Flex>
      <div style={{ width: '100%' }}>
        <Marquee {...marquee}>
          {Array(6).fill(1).map((_, i) => (
            <UserCard key={i} index={i} />
          ))}
        </Marquee>
      </div>
    </>
  );
}

export default marquee;
