import { TFunction } from 'i18next';

export const getPlansData = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    plan: t('Free'),
    price: 0,
    period: t('month'),
    description: t('The essential to provide your best work for clients.'),
    features: [t('10 Projects'), t('Up to 10 subscribers'), t('Advanced analytics')],
    buttonLabel: t('Current Plan'),
    buttonStyle: 'default',
    active: true,
  },
  {
    id: 2,
    plan: t('Basic'),
    price: 20,
    period: t('month'),
    description: t('Ideal for growing needs who want more features.'),
    features: [
      t('100 Projects'),
      t('Up to 50 subscribers'),
      t('Advanced analytics'),
      t('24-hour support'),
    ],
    buttonLabel: t('Upgrade'),
    buttonStyle: 'highlighted',
    active: false,
  },
  {
    id: 3,
    plan: t('Advanced'),
    price: 50,
    period: t('month'),
    description: t('Designed for power users and maximum functionality.'),
    features: [
      t('200 Projects'),
      t('Up to 50 subscribers'),
      t('Advanced analytics'),
      t('24-hour support'),
      t('Marketing Advisor'),
    ],
    buttonLabel: t('Upgrade'),
    buttonStyle: 'default',
    active: false,
  },
];
