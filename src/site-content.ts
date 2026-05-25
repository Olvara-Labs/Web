import { LockKeyhole, Radar, ShieldCheck, Sparkles, Vault } from 'lucide-react';

export const HOME_BADGES = [
  'Enterprise security',
  'Confidential by default',
  'Coming soon',
] as const;

export const HOME_METRICS = [
  { value: '01', label: 'flagship product' },
  { value: '02', label: 'confidential programs' },
  { value: '2026', label: 'public launch phase' },
] as const;

export const HOME_FEATURES = [
  {
    title: 'Secure credential control',
    description: 'Tighter control over credentials, secrets, and access workflows.',
    icon: Vault,
  },
  {
    title: 'Quiet operational posture',
    description: 'Cleaner surfaces, less noise, and deliberate disclosure.',
    icon: ShieldCheck,
  },
  {
    title: 'Exposure intelligence',
    description: 'Additional security programs are in active development.',
    icon: Radar,
  },
] as const;

export const HOME_OPERATING_MODEL = [
  {
    title: 'Minimal surface',
    description: 'A simpler landing page with the essentials only.',
  },
  {
    title: 'Clear direction',
    description: 'One visible flagship product with a tighter supporting message.',
  },
  {
    title: 'Private pipeline',
    description: 'Other programs stay confidential until they are ready.',
  },
] as const;

export const PRODUCT_CARDS = [
  {
    title: 'Secure Vault Manager',
    status: 'Flagship Focus',
    description:
      'A secure vault and credential-management platform built for modern teams.',
    accent: 'from-[#1d7c49] to-[#6bc68e]',
    icon: LockKeyhole,
  },
  {
    title: 'Confidential Program // Sanitization',
    status: 'Coming Soon',
    description:
      'A confidential security program currently in development.',
    accent: 'from-[#105233] to-[#46a66b]',
    icon: Sparkles,
  },
  {
    title: 'Confidential Program // Exposure Mapping',
    status: 'Coming Soon',
    description:
      'Another confidential product track, to be revealed later.',
    accent: 'from-[#173528] to-[#1d7c49]',
    icon: Radar,
  },
] as const;

export const ABOUT_PILLARS = [
  {
    title: 'Focused',
    description:
      'We build focused security products with a cleaner public surface.',
  },
  {
    title: 'Deliberate',
    description:
      'What is public is intentional. What is not ready stays private.',
  },
  {
    title: 'Practical',
    description:
      'The goal is clarity, not noise.',
  },
] as const;

export const ABOUT_HIGHLIGHTS = [
  'Secure Vault Manager leads the public lineup',
  'Two additional programs remain confidential',
  'Built for a cleaner, calmer brand presentation',
] as const;
