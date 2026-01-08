import { PricingConfig, ProjectType, ProjectStyle, ProjectFinish, ProjectState } from '../../types';

export const PRICING: PricingConfig = {
  basePrice: 900, // €/m²
  coefficients: {
    type: {
      [ProjectType.MAISON]: 1.0,
      [ProjectType.BUREAU]: 1.1,
      [ProjectType.IMMEUBLE]: 1.2,
      [ProjectType.RENOVATION]: 0.8,
    },
    style: {
      [ProjectStyle.MODERNE]: 1.0,
      [ProjectStyle.MINIMALISTE]: 1.05,
      [ProjectStyle.INDUSTRIEL]: 1.1,
      [ProjectStyle.CONTEMPORAIN]: 1.15,
    },
    finish: {
      [ProjectFinish.STANDARD]: 1.0,
      [ProjectFinish.PREMIUM]: 1.2,
      [ProjectFinish.LUXE]: 1.4,
    },
  },
};

export const calculatePrice = (state: ProjectState): number => {
  const { type, style, finish, surface } = state;
  
  const typeCoeff = PRICING.coefficients.type[type];
  const styleCoeff = PRICING.coefficients.style[style];
  const finishCoeff = PRICING.coefficients.finish[finish];
  
  // Math.round to avoid floating point ugliness, though we format it later
  return Math.round(surface * PRICING.basePrice * typeCoeff * styleCoeff * finishCoeff);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
};