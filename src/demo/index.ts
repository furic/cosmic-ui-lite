// cosmicDemo.ts - Demo functions for testing Cosmic UI components

import { CosmicUI } from '../index';

/**
 * Creates a demo UI to showcase cosmic components
 * Call this function to test the cosmic UI elements
 */
export function createCosmicDemo(): void {
	// Create demo container
	const demoContainer = document.createElement('div');
	demoContainer.style.position = 'fixed';
	demoContainer.style.top = '20px';
	demoContainer.style.left = '20px';
	demoContainer.style.zIndex = '1000';
	demoContainer.style.display = 'flex';
	demoContainer.style.flexDirection = 'column';
	demoContainer.style.gap = '10px';
	demoContainer.style.maxWidth = '200px';

	// Demo buttons
	const btnCard = CosmicUI.createButton({
		text: 'Show Card Demo',
		variant: 'secondary',
		onClick: () => showCardDemo(),
	});

	const btnDemo = CosmicUI.createButton({
		text: 'Show Modal Demo',
		variant: 'primary',
		onClick: () => showModalDemo(),
	});

	const btnError = CosmicUI.createButton({
		text: 'Show Error Demo',
		variant: 'danger',
		onClick: () => showErrorDemo(),
	});

	const btnConfirm = CosmicUI.createButton({
		text: 'Show Confirm Demo',
		onClick: () => showConfirmDemo(),
	});

	const btnInfo = CosmicUI.createButton({
		text: 'Show Info Demo',
		variant: 'primary',
		onClick: () => showInfoDemo(),
	});

	const btnTag = CosmicUI.createButton({
		text: 'Show Tag Demo',
		variant: 'secondary',
		onClick: () => showTagDemo(),
	});

	const btnRemoveDemo = CosmicUI.createButton({
		text: 'Remove Demo',
		variant: 'secondary',
		onClick: () => {
			if (demoContainer.parentNode) {
				demoContainer.parentNode.removeChild(demoContainer);
			}
		},
	});

	demoContainer.appendChild(btnCard);
	demoContainer.appendChild(btnDemo);
	demoContainer.appendChild(btnError);
	demoContainer.appendChild(btnConfirm);
	demoContainer.appendChild(btnInfo);
	demoContainer.appendChild(btnTag);
	demoContainer.appendChild(btnRemoveDemo);

	document.body.appendChild(demoContainer);
}

function showCardDemo(): void {
	const cardContent = document.createElement('div');
	cardContent.innerHTML = `
    <p>Cosmic cards with borders:</p>
    <ul>
      <li>Wrapper + Inner approach</li>
      <li>Should show borders on ALL sides</li>
      <li>Including left and right borders</li>
      <li>Angled corners with proper borders</li>
    </ul>
  `;

	const card = CosmicUI.createCard({
		title: 'Border Test Card',
		content: cardContent,
		className: 'demo-card',
	});

	card.style.position = 'fixed';
	card.style.top = '50%';
	card.style.left = '50%';
	card.style.transform = 'translate(-50%, -50%)';
	card.style.zIndex = '9999';
	card.style.maxWidth = '400px';

	const closeBtn = CosmicUI.createButton({
		text: 'Close Card',
		variant: 'secondary',
		onClick: () => {
			if (card.parentNode) {
				card.parentNode.removeChild(card);
			}
		},
	});

	// Add button to the card content area
	const cardElement = card.querySelector('.cosmic-card') || card;
	cardElement.appendChild(closeBtn);
	closeBtn.style.top = '80px';
	document.body.appendChild(card);
}

function showModalDemo(): void {
	const modalContent = document.createElement('div');
	modalContent.innerHTML = `
    <p>This is a <strong>cosmic-themed modal</strong> with:</p>
    <ul>
      <li>Angled corners (clip-path)</li>
      <li>Animated gradient borders</li>
      <li>Backdrop blur effect</li>
      <li>Smooth slide-in animation</li>
    </ul>
  `;

	const modal = CosmicUI.createModal({
		title: 'Cosmic Modal Demo',
		content: modalContent,
		buttons: [
			{
				text: 'Secondary Action',
				variant: 'secondary',
			},
			{
				text: 'Primary Action',
				variant: 'primary',
			},
		],
	});

	modal.show();
}

function showErrorDemo(): void {
	CosmicUI.showError(
		'Orbital Strike Failed',
		'Unable to establish laser connection to target coordinates. Please check your alien weapon systems and try again.'
	);
}

function showConfirmDemo(): void {
	CosmicUI.showConfirmation(
		'Initiate Planet Destruction',
		'Are you sure you want to commence total planetary annihilation? This action cannot be undone.',
		() => {
			CosmicUI.showNotification(
				'Confirmed',
				'Planet destruction sequence initiated. Earth has 5 minutes remaining.'
			);
		},
		() => {
			CosmicUI.showNotification(
				'Cancelled',
				'Planetary destruction cancelled. Earth survives... for now.'
			);
		}
	);
}

function showInfoDemo(): void {
	const infoContent = document.createElement('div');
	infoContent.innerHTML = `
		<p>This is a <strong>cosmic info popup</strong> demonstrating:</p>
		<ul>
			<li>Info-specific gradient styling</li>
			<li>Optional title with color themes</li>
			<li>No close button (click overlay to close)</li>
		</ul>
		<p><em>Click anywhere outside this popup to close it.</em></p>
	`;

	const info = CosmicUI.createInfo({
		title: 'Alien Intelligence Briefing',
		titleColor: 'golden-red',
		content: infoContent,
		onClose: () => {
			console.log('Info popup closed');
		},
	});

	document.body.appendChild(info);
}

function showTagDemo(): void {
	// Create multiple tags to demonstrate different configurations
	const tagPositions = [
		{ top: '20%', left: '20%', flipped: false },
		{ top: '30%', left: '60%', flipped: true },
		{ top: '60%', left: '30%', flipped: false },
	];

	tagPositions.forEach((pos, index) => {
		const tagContent = document.createElement('div');
		tagContent.innerHTML = `
			<div style="padding: 10px;">
				<h4>Target ${index + 1}</h4>
				<p><strong>Status:</strong> ACQUIRED</p>
				<p><strong>Population:</strong> ${(Math.random() * 10000000).toFixed(0)}</p>
				<p><strong>Threat Level:</strong> ${index === 0 ? 'HIGH' : index === 1 ? 'MEDIUM' : 'LOW'}</p>
			</div>
		`;

		const tag = CosmicUI.createTag({
			title: `TARGET ACQUIRED`,
			content: tagContent,
			flipped: pos.flipped,
			className: `demo-tag-${index}`,
		});

		// Position the tag
		tag.style.position = 'fixed';
		tag.style.top = pos.top;
		tag.style.left = pos.left;
		tag.style.zIndex = '9998';
		tag.style.maxWidth = '300px';
		tag.style.cursor = 'pointer';

		// Add click to remove functionality
		tag.addEventListener('click', () => {
			tag.style.animation = 'fadeOut 0.3s ease-out forwards';
			setTimeout(() => {
				if (tag.parentNode) {
					tag.parentNode.removeChild(tag);
				}
			}, 300);
		});

		// Auto-remove after 8 seconds
		setTimeout(() => {
			if (tag.parentNode) {
				tag.style.animation = 'fadeOut 0.5s ease-out forwards';
				setTimeout(() => {
					if (tag.parentNode) {
						tag.parentNode.removeChild(tag);
					}
				}, 500);
			}
		}, 8000);

		document.body.appendChild(tag);
	});

	// Show instruction info
	setTimeout(() => {
		const instructionInfo = CosmicUI.createInfo({
			title: 'Tag Demo Instructions',
			titleColor: 'blue',
			content: '<p>Three target acquisition tags have been deployed.<br><br><strong>• Click any tag to dismiss it</strong><br><strong>• Tags will auto-dismiss after 8 seconds</strong><br><strong>• Notice the flipped/normal orientations</strong></p>',
		});
		document.body.appendChild(instructionInfo);
	}, 500);
}
