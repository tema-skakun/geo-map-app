import { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'logoPrimary': 'url(\'@/assets/logo-ru-primary.png\')',
        'mobileNavbar': 'url(\'@/assets/mobile-menubar-bg.png\')',
      },
      screens: {
        'mb': '360px',
        'tb': '744px',
        'lp': '1280px',
        'ds': '1920px',
      },
      colors: {
        'secondary': '#305eff',
        'bgSecondary': '#f8f8f8',
        'btnBg': '#f9f6ff',
        'violet': '#eceef6',
        'checkbox': '#2196F3',
        // 'text': '#292d32',
        text: {
          light: 'rgba(0,0,0,0.6)',
          DEFAULT: 'rgba(0,0,0,0.87)',
          medium: '#3e4349',
          gray: '#676D73',
        },
        'textLight': 'rgba(41,45,50,0.3)',
        'danger': '#f18d8d',
        'online': '#0ebc93',
      },
      content: {
        showoff: 'url(\'@/assets/show-off.png\')',
        mask: 'url(\'@/assets/mask.png\')',
        search: 'url(\'@/assets/search.svg\')',
        settings: 'url(\'@/assets/settings.svg\')',
        mobileNavbar: 'url(\'@/assets/mobile-menubar-bg.png\')',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      width: {
        sidebarBig: '240px',  //  w-sidebarBig
        sidebarSmall: '80px',
      },
      inset: {
        sidebarBigGap: '248px', //  left-sidebarBigGap / inset-sidebarBigGap
        sidebarSmallGap: '88px',
        sidebarZeroGap: '4px',
        topbarGap: '76px',
        topbarZeroGap: '4px',
      },
      height: {
        topbar: '68px',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.h-calc-topbar-gap': {
          height: 'calc(100% - 80px)',
        },
      })
    },
  ],
} satisfies Config;

export default withMT(config);
