// Main entry point for Cosmic UI package

// Import styles
import './styles/cosmic-ui.css';

// Import components
import { CosmicButton } from './components/CosmicButton';
import { CosmicModal } from './components/CosmicModal';
import { CosmicCard } from './components/CosmicCard';
import { CosmicInfo } from './components/CosmicInfo';
import { CosmicTag } from './components/CosmicTag';

// Export all types
export * from './types';

// Main CosmicUI class with static methods for backward compatibility
export class CosmicUI {
  // Component creation methods
  static createButton = CosmicButton.create;
  static createModal = CosmicModal.create;
  static createCard = CosmicCard.create;
  static createInfo = CosmicInfo.create;
  static createTag = CosmicTag.create;

  /**
   * Utility method to create a confirmation modal
   */
  static showConfirmation(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): void {
    const modal = CosmicUI.createModal({
      title: title,
      content: message,
      buttons: [
        {
          text: 'Cancel',
          variant: 'secondary',
          onClick: onCancel || (() => {}),
        },
        {
          text: 'Confirm',
          variant: 'danger',
          onClick: onConfirm,
        },
      ],
    });

    modal.show();
  }

  /**
   * Utility method to create an notification modal
   */
  static showNotification(title: string, message: string, onClose?: () => void): void {
    const modal = CosmicUI.createModal({
      title: title,
      content: message,
      onClose: onClose,
      buttons: [
        {
          text: 'OK',
          onClick: onClose || (() => {})
        }
      ]
    });

    modal.show();
  }

  /**
   * Utility method to create an error modal
   */
  static showError(title: string, message: string, onClose?: () => void): void {
    const modal = CosmicUI.createModal({
      title: title,
      content: message,
      buttons: [
        {
          text: 'OK',
          variant: 'danger',
          onClick: onClose || (() => {}),
        },
      ],
      onClose: onClose,
    });

    modal.show();
  }
}

// Export individual components
export { CosmicButton, CosmicModal, CosmicCard, CosmicInfo, CosmicTag };

// Default export
export default CosmicUI;