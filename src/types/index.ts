// Copy content from existing types.ts
export interface CosmicButtonOptions {
  text: string;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface CosmicModalOptions {
  title: string;
  content: string | HTMLElement;
  showCloseButton?: boolean;
  buttons: CosmicButtonOptions[];
  onClose?: () => void;
  className?: string;
}

export interface CosmicCardOptions {
  title?: string;
  content: string | HTMLElement;
  className?: string;
}

export interface CosmicInfoOptions {
  title?: string;
  titleColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'golden-red';
  content: string | HTMLElement;
  className?: string;
  onClose?: () => void;
}

export interface CosmicTagOptions {
  title?: string;
  content: string | HTMLElement;
  className?: string;
  flipped?: boolean;
}

export type TitleColorTheme = 'yellow' | 'green' | 'blue' | 'purple' | 'golden-red';
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger';

export interface ComponentEventHandlers {
  onClick?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface SVGPathDefinitions {
  MODAL_BACKGROUND: string;
  MODAL_BORDER: string;
  BUTTON_BACKGROUND: string;
  BUTTON_BORDER: string;
}

export interface SVGViewBoxes {
  MODAL: string;
  BUTTON: string;
}

export interface CSSClassNames {
  BUTTON_WRAPPER: 'cosmic-btn-wrapper';
  MODAL_WRAPPER: 'cosmic-modal-wrapper';
  CARD_WRAPPER: 'cosmic-card-wrapper';
  TAG_WRAPPER: 'cosmic-tag-wrapper';
  INFO_WRAPPER: 'cosmic-info-wrapper';
  
  COSMIC_BG: 'cosmic-bg';
  COSMIC_BORDER: 'cosmic-border';
  
  COSMIC_CONTENT: 'cosmic-content';
  COSMIC_HEADER: 'cosmic-header';
  COSMIC_HEADER_BORDERED: 'cosmic-header-bordered';
  COSMIC_TITLE: 'cosmic-title';
  COSMIC_TITLE_ENHANCED: 'cosmic-title-enhanced';
  
  MODAL_OVERLAY: 'cosmic-modal-overlay';
  INFO_OVERLAY: 'cosmic-info-overlay';
}

export interface AnimationConfig {
  duration?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  delay?: number;
  infinite?: boolean;
}

export interface ResponsiveBreakpoints {
  small: '430px';
  mobile: '480px';
  tablet: '580px';
  desktop: '900px';
}

export interface CosmicUIInterface {
  createButton(options: CosmicButtonOptions): HTMLElement;
  createModal(options: CosmicModalOptions): CosmicModalInstance;
  createCard(options: CosmicCardOptions): HTMLElement;
  createInfo(options: CosmicInfoOptions): HTMLElement;
  createTag(options: CosmicTagOptions): HTMLElement;

  showError(title: string, message: string): void;
  showConfirmation(title: string, message: string, onConfirm: () => void, onCancel?: () => void): void;
  showNotification(title: string, message: string): void;
}

export interface CosmicModalInstance {
  show(): void;
  close(): void;
}