import { siteConfig } from '~/config/site';

export const navigationItems: { title: string; href: string }[] = [
  {
    title: 'Features',
    href: '/#features',
  },
  {
    title: 'Pricing',
    href: '/#pricing',
  },
  {
    title: 'Testimonials',
    href: '/#testimonials',
  },
  {
    title: 'FAQ',
    href: '/#faq',
  },
];

export const footerSections: {
  title: string;
  items: { title: string; href: string }[];
}[] = [
  {
    title: 'Socials',
    items: [
      {
        title: 'X',
        href: 'https://x.com/pauljasperdev',
      },
      {
        title: 'Instagram',
        href: 'https://instagram.com',
      },
      {
        title: 'TikTok',
        href: 'https://tiktok.com',
      },
    ],
  },
  {
    title: 'Product',
    items: [
      {
        title: 'Pricing',
        href: '/#pricing',
      },
      {
        title: 'Privacy Policy',
        href: '/#privacy-policy',
      },
      {
        title: 'Terms of Service',
        href: '/#terms-of-service',
      },
    ],
  },
  {
    title: 'Other Links',
    items: [
      {
        title: 'FAQ',
        href: '/#faq',
      },
      {
        title: 'Blog',
        href: 'https://pauljasper.beehiiv.com/',
      },
      {
        title: 'Support',
        href: `mailto:${siteConfig.supportEmail}`,
      },
    ],
  },
];

export type NavigationItems = typeof navigationItems;
export type FooterSections = typeof footerSections;
