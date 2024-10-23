import {siteConfig} from "~/config/site";

export const navigationItems: { title: string, href: string }[] = [
    {
        title: 'Features',
        href: '#features',
    },
    {
        title: 'Pricing',
        href: '#pricing',
    },
    {
        title: 'Testimonials',
        href: '#testimonials',
    },
    {
        title: 'FAQ',
        href: '#faq',
    }
]

export const footerSections: { title: string, items: { title: string, href: string }[] }[] = [
    {
        title: 'Socials',
        items: [
            {
                title: 'X',
                href: '#',
            },
            {
                title: 'Instagram',
                href: '#',
            },
            {
                title: 'TikTok',
                href: '#',
            }
        ]
    },
    {
        title: 'Product',
        items: [
            {
                title: 'Pricing',
                href: '#pricing',
            },
            {
                title: 'Privacy Policy',
                href: '#privacy-policy',
            },
            {
                title: 'Terms of Service',
                href: '#terms-of-service',
            },
        ]
    },
    {
        title: 'Other Links',
        items: [
            {
                title: 'FAQ',
                href: '#faq',
            },
            {
                title: 'Blog',
                href: '#',
            },
            {
                title: 'Support',
                href: siteConfig.supportEmail,
            },
        ]
    }
]

export type NavigationItems = typeof navigationItems
export type FooterSections = typeof footerSections