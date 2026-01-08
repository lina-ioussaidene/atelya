export enum ProjectType {
  MAISON = 'Maison individuelle',
  BUREAU = 'Bureau',
  IMMEUBLE = 'Immeuble',
  RENOVATION = 'Rénovation',
}

export enum ProjectStyle {
  MODERNE = 'Moderne',
  MINIMALISTE = 'Minimaliste',
  INDUSTRIEL = 'Industriel',
  CONTEMPORAIN = 'Contemporain',
}

export enum ProjectFinish {
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
  LUXE = 'Luxe',
}

export interface ProjectState {
  type: ProjectType;
  style: ProjectStyle;
  finish: ProjectFinish;
  surface: number;
}

export interface PricingConfig {
  basePrice: number;
  coefficients: {
    type: Record<ProjectType, number>;
    style: Record<ProjectStyle, number>;
    finish: Record<ProjectFinish, number>;
  };
}