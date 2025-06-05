import React from 'react'

import { CreditCard } from '@medusajs/icons'
import { StoreCollection, StoreProductCategory } from '@medusajs/types'
import {
  BancontactIcon,
  BlikIcon,
  IdealIcon,
  PayPalIcon,
  Przelewy24Icon,
  StripeIcon,
} from '@modules/common/icons'

// Product filters
export const FILTER_KEYS = {
  ORDER_BY_KEY: 'sort_by',
  PRICE_KEY: 'price',
  MATERIAL_KEY: 'material',
  TYPE_KEY: 'type',
  COLLECTION_KEY: 'collection',
}

export const PRODUCT_LIST_PATHNAMES = {
  CATEGORY: '/categories',
  COLLECTION: '/collections',
  EXPLORE: '/shop',
  SEARCH: '/results',
} as const

export const blogSortOptions = [
  {
    value: 'desc',
    label: 'Newest',
  },
  {
    value: 'asc',
    label: 'Oldest',
  },
]

export const storeSortOptions = [
  {
    value: 'relevance',
    label: 'Relevance',
  },
  {
    value: 'created_at',
    label: 'New in',
  },
  {
    value: 'price_asc',
    label: 'Price: Low-High',
  },
  {
    value: 'price_desc',
    label: 'Price: High-Low',
  },
]

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: 'Credit card',
    icon: <StripeIcon />,
  },
  'pp_stripe-blik_stripe': {
    title: 'BLIK',
    icon: <BlikIcon size={26} />,
  },
  'pp_stripe-przelewy24_stripe': {
    title: 'Przelewy24',
    icon: <Przelewy24Icon size={34} />,
  },
  'pp_stripe-ideal_stripe': {
    title: 'iDeal',
    icon: <IdealIcon />,
  },
  'pp_stripe-bancontact_stripe': {
    title: 'Bancontact',
    icon: <BancontactIcon />,
  },
  pp_paypal_paypal: {
    title: 'PayPal',
    icon: <PayPalIcon />,
  },
  pp_system_default: {
    title: 'Manual Payment',
    icon: <CreditCard />,
  },
  // Add more payment providers here
}

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith('pp_stripe_')
}
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith('pp_paypal')
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith('pp_system_default')
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  'krw',
  'jpy',
  'vnd',
  'clp',
  'pyg',
  'xaf',
  'xof',
  'bif',
  'djf',
  'gnf',
  'kmf',
  'mga',
  'rwf',
  'xpf',
  'htg',
  'vuv',
  'xag',
  'xdr',
  'xau',
]

export const passwordRequirements = [
  'At least 8 characters',
  'One lowercase letter',
  'One uppercase letter',
  'One number or symbol',
]

export const createNavigation = (
  productCategories: StoreProductCategory[],
  collections?: StoreCollection[]
) => [
  {
    name: 'Shop',
    handle: '/shop',
    category_children: productCategories
      .filter((category) => !category.parent_category)
      .map((category) => ({
        name: category.name,
        type: 'parent_category',
        handle: `/categories/${category.handle}`,
        category_children: category.category_children.map((subCategory) => ({
          name: subCategory.name,
          handle: `/categories/${subCategory.handle}`,
          icon: null,
          category_children: null,
        })),
      })),
  },
  {
    name: 'Colecciones',
    handle: '/shop',
    category_children: !collections
      ? null
      : collections.map((collection) => ({
          name: collection.title,
          type: 'collection',
          handle: `/collections/${collection.handle}`,
          handle_id: collection.handle,
          category_children: null,
        })),
  },
  {
    name: 'Sobre nosotros',
    handle: '/about-us',
    category_children: null,
  },
]

export const createFooterNavigation = (
  productCategories: StoreProductCategory[]
) => {
  return {
    navigation: [
      {
        header: 'Categorías',
        links: [
          ...productCategories
            .filter((category) => !category.parent_category)
            .slice(0, 5)
            .map((category) => ({
              title: category.name,
              href: `/categories/${category.handle}`,
            })),
        ],
      },
      {
        header: 'Pedidos',
        links: [
          {
            title: 'Pedidos y entrega',
            href: '/terms-and-conditions',
          },
          {
            title: 'Devoluciones y reembolsos',
            href: '/terms-and-conditions',
          },
          {
            title: 'Pago y precios',
            href: '/terms-and-conditions',
          },
        ],
      },
      {
        header: 'Sobre nosotros',
        links: [
          {
            title: 'Sobre nosotros',
            href: '/about-us',
          },
          {
            title: 'Blog',
            href: '/blog',
          },
          {
            title: 'Careers',
            href: '#',
          },
        ],
      },
      {
        header: '¿Necesitas ayuda?',
        links: [
          {
            title: 'FAQs',
            href: '/faq',
          },
          {
            title: 'Centro de soporte',
            href: '#',
          },
          {
            title: 'Contáctanos',
            href: '#',
          },
        ],
      },
    ],
    contact: {
      header: "¡Manténganse en contacto!",
      text: 'Manténgase al día con las últimas lanzamientos de productos y noticias. Obténganos más información sobre nuestras marcas y obténganos códigos de promoción especiales.',
    },
    other: [
      {
        title: 'Política de privacidad',
        href: '/privacy-policy',
      },
      {
        title: 'Términos y condiciones',
        href: '/terms-and-conditions',
      },
    ],
  }
}

export const checkoutFooterNavigation = [
  {
    title: 'Política de privacidad',
    href: '/privacy-policy',
  },
  {
    title: 'Términos y condiciones',
    href: '/terms-and-conditions',
  },
]

export const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
)
