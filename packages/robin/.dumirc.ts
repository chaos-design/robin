import os from 'node:os';
import { defineConfig } from 'dumi';

export default defineConfig({
  mako: ['Darwin', 'Linux'].includes(os.type()) ? {} : false,
  ssr: false,
  mfsu: false,
  publicPath: process.env.DEPLOY_SITE === 'local' ? '/' : '/robin/',
  base: process.env.DEPLOY_SITE === 'local' ? '/' : '/robin',
  favicons: ['https://rain120.github.io/study-notes/img/chao.png'],
  locales: [
    { id: 'zh-CN', name: '中文', suffix: '' },
    { id: 'en-US', name: 'English', suffix: '-en' },
  ],
  analytics: {
    ga_v2: 'G-H9EQQW9VG3',
  },
  metas: [
    { name: 'theme-color', content: '#1677ff' },
    { name: 'build-time', content: Date.now().toString() },
    // https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
    { name: 'build-hash', content: process.env.GITHUB_SHA ?? 'unknown' },
  ],
  resolve: {
    docDirs: ['docs'],
  },
  themeConfig: {
    name: 'Robin',
    title: '<b>Robin</b>',
    description: {
      'zh-CN': 'Robin Components',
      'en-US': 'Robin Components',
    },
    loading: {
      skeleton: ['/guide', '/config', '/components'],
    },
    rtl: false,
    announcementBar: {
      id: 'announcementBar',
      message: '🎉 欢迎使用 chaos-design',
      more: '查看更多',
      link: 'https://github.com/chaos-design/robin',
      description: 'Robin Components',
      backgroundColor: '#86f4bd',
      textColor: '#000000e0',
      showIcon: false,
      closable: true,
    },
    github: {
      url: 'https://github.com/chaos-design/robin',
      branch: 'main',
      docDir: 'packages/robin',
    },
    localesEnhance: [
      { id: 'zh-CN', switchPrefix: '中' },
      { id: 'en-US', switchPrefix: 'en' },
    ],
    nav: {
      'zh-CN': [
        { title: '指南', link: '/guide/introduce' },
        { title: '组件', link: '/components/introduce' },
      ],
      'en-US': [
        { title: 'Guide', link: '/guide/introduce-en' },
        { title: 'Components', link: '/components/introduce-en' },
      ],
    },
    actions: {
      'zh-CN': [
        {
          type: 'primary',
          text: '开始使用',
          link: '/guide/introduce',
        },
      ],
      'en-US': [
        {
          type: 'primary',
          text: 'Start',
          link: '/guide/introduce-en',
        },
      ],
    },
    features: {
      'zh-CN': [
        {
          emoji: '⚛',
          title: '原子化',
          details: '原子化接入, 按需接入, 快速集成',
        },
        {
          emoji: '⚛',
          title: 'React',
          details: 'React组件',
        },
        {
          emoji: '💻',
          title: '开箱即用',
          details:
            '接入简单，安装即使用，全面融入 Ant Design 风格，内置主题切换，紧凑模式等功能。',
        },
      ],
      'en-US': [
        {
          emoji: '⚛',
          title: 'Atom',
          details: '',
        },
        {
          emoji: '⚛',
          title: 'React',
          details: 'React Components',
        },
        {
          emoji: '💻',
          title: 'Simple Use',
          details:
            'Easy access, installation and use, fully integrated into Ant Design style, built-in theme switching, compact mode and other functions.',
        },
      ],
    },
    footerLinks: [
      {
        title: '相关资源',
        items: [
          {
            title: 'Github',
            description: 'Rain120',
            url: 'https://github.com/rain120',
            openExternal: true,
          },
        ],
      },
      {
        title: '帮助',
        items: [
          {
            icon: 'https://github-production-user-asset-6210df.s3.amazonaws.com/20694238/256181695-b05fa72a-4ab5-479d-bb74-3d723755de47.png',
            title: 'GitHub',
            url: 'https://github.com/chaos-design/robin',
            openExternal: true,
          },
          // {
          //   icon: 'https://github-production-user-asset-6210df.s3.amazonaws.com/20694238/256181704-d443821a-38a2-490a-9aba-4955ceb8d89b.png',
          //   title: '常见问题',
          //   url: '/robin/config/faq',
          // },
          {
            icon: 'https://github-production-user-asset-6210df.s3.amazonaws.com/20694238/256181680-3b031d0f-1c51-48d2-a676-b2f82aa23e09.png',
            title: '报告 Bug',
            url: 'https://github.com/chaos-design/robin/issues/new',
            openExternal: true,
          },
          {
            icon: 'https://github-production-user-asset-6210df.s3.amazonaws.com/20694238/256181701-b51d6a6f-3190-4525-80d0-43ac194437c9.png',
            title: 'issues',
            url: 'https://github.com/chaos-design/robin/issues',
            openExternal: true,
          },
        ],
      },
    ],
    moreLinks: [
      {
        text: 'Chaos Design',
        link: 'https://github.com/chaos-design',
      },
    ],
    footer:
      'Made with<span style="color: rgb(255, 255, 255);">❤</span>by <span>chaos-design | Copyright © 2025-present</span>',
  },
});
