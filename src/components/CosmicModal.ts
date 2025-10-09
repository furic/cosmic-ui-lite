import { createSvgElements } from '../utils/gradients';
import { createCloseIcon } from '../utils/svg';
import type { CosmicModalOptions } from '../types';
import { CosmicButton } from './CosmicButton';

export class CosmicModal {
  private overlay: HTMLDivElement;
  private options: CosmicModalOptions;
  private handleEscape: (e: KeyboardEvent) => void;

  private constructor(options: CosmicModalOptions) {
    this.options = options;
    this.overlay = this.createOverlay();
    this.handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
  }

  /**
   * Creates a cosmic-themed modal with backdrop blur and slide-in animation using SVG shape
   */
  static create(options: CosmicModalOptions): CosmicModal {
    return new CosmicModal(options);
  }

  private createOverlay(): HTMLDivElement {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'cosmic-modal-overlay';

    // Create modal content wrapper
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'cosmic-modal-wrapper';

    // Use helper method to create SVG elements
    const { backgroundSvg, borderSvg } = createSvgElements('modalGradient', '#00d4ff', 'modal');

    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'cosmic-content';

    if (this.options.className) {
      modalContent.className += ` ${this.options.className}`;
    }

    // Create header
    const header = document.createElement('div');
    header.className = 'cosmic-header-bordered';

    const title = document.createElement('h2');
    title.className = 'cosmic-title-enhanced';
    title.textContent = this.options.title;
    header.appendChild(title);

    // Create close button if enabled
    if (this.options.showCloseButton !== false) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'cosmic-modal-close';
      const closeIcon = createCloseIcon();
      closeBtn.appendChild(closeIcon);
      closeBtn.addEventListener('click', () => {
        this.close();
      });
      modalContent.appendChild(closeBtn);
    }

    // Create body
    const body = document.createElement('div');
    body.className = 'cosmic-modal-body';

    if (typeof this.options.content === 'string') {
      body.innerHTML = this.options.content;
    } else if (this.options.content instanceof HTMLElement) {
      body.appendChild(this.options.content);
    } else {
      // Fallback for invalid content types
      body.innerHTML = String(this.options.content || 'No content provided');
    }

    // Create footer with buttons
    if (this.options.buttons && this.options.buttons.length > 0) {
      const footer = document.createElement('div');
      footer.className = 'cosmic-modal-footer';

      this.options.buttons.forEach((buttonOptions) => {
        const button = CosmicButton.create({
          ...buttonOptions,
          onClick: () => {
            if (buttonOptions.onClick) buttonOptions.onClick();
            // Auto-close modal unless it's a custom button that should keep modal open
            if (!buttonOptions.className?.includes('no-auto-close')) {
              this.close();
            }
          },
        });
        footer.appendChild(button);
      });

      modalContent.appendChild(header);
      modalContent.appendChild(body);
      modalContent.appendChild(footer);
    } else {
      console.warn("No buttons provided for modal, that may breaks the layout of modals");
      modalContent.appendChild(header);
      modalContent.appendChild(body);
    }

    // Prevent modal content clicks from closing the modal
    modalWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close modal when clicking overlay
    overlay.addEventListener('click', () => {
      this.close();
    });

    modalWrapper.appendChild(backgroundSvg);
    modalWrapper.appendChild(borderSvg);
    modalWrapper.appendChild(modalContent);
    overlay.appendChild(modalWrapper);
    return overlay;
  }

  /**
   * Shows the modal by adding it to the document body
   */
  show(): void {
    document.body.appendChild(this.overlay);
    document.addEventListener('keydown', this.handleEscape);
  }

  /**
   * Closes and removes the modal from the document
   */
  close(): void {
    this.overlay.style.animation = 'modalFadeIn 0.2s ease-out reverse';
    setTimeout(() => {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      document.removeEventListener('keydown', this.handleEscape);
      if (this.options.onClose) this.options.onClose();
    }, 200);
  }
}