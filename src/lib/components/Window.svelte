<script lang="ts">
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let {
		title,
		subtitle = '',
		onClose,
		children
	}: {
		title: string;
		subtitle?: string;
		onClose: () => void;
		children: Snippet;
	} = $props();

	let panel = $state<HTMLElement | null>(null);
	let prevFocus: HTMLElement | null = null;

	const reduce =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const dur = reduce ? 0 : 200;

	const titleId = `win-${Math.random().toString(36).slice(2, 8)}`;

	function focusables(): HTMLElement[] {
		if (!panel) return [];
		return Array.from(
			panel.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		).filter((el) => el.offsetParent !== null);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
			return;
		}
		if (e.key === 'Tab') {
			const items = focusables();
			if (items.length === 0) return;
			const first = items[0];
			const last = items[items.length - 1];
			const active = document.activeElement as HTMLElement;
			if (e.shiftKey && active === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && active === last) {
				e.preventDefault();
				first.focus();
			}
		}
	}

	onMount(() => {
		prevFocus = document.activeElement as HTMLElement;
		document.body.style.overflow = 'hidden';
		// focus the first focusable (the close button) on open
		queueMicrotask(() => focusables()[0]?.focus());
	});

	onDestroy(() => {
		document.body.style.overflow = '';
		prevFocus?.focus?.();
	});
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Backdrop (real button so it is keyboard/AT friendly; click closes) -->
<button
	class="backdrop"
	transition:fade={{ duration: dur }}
	onclick={onClose}
	aria-label="Close window"
></button>

<!-- Dialog (layer is click-through; only the window catches pointer events) -->
<div class="layer">
	<div
		class="window mc-card"
		bind:this={panel}
		role="dialog"
		aria-modal="true"
		aria-labelledby={titleId}
		transition:scale={{ duration: dur, start: 0.94, opacity: 0 }}
	>
		<header class="titlebar">
			<span class="traffic" aria-hidden="true">
				<i class="r"></i><i class="y"></i><i class="g"></i>
			</span>
			<div class="title-text">
				<h2 id={titleId}>{title}</h2>
				{#if subtitle}<p>{subtitle}</p>{/if}
			</div>
			<button class="close" onclick={onClose} aria-label="Close window">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" />
				</svg>
			</button>
		</header>

		<div class="body">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 300;
		border: 0;
		padding: 0;
		cursor: default;
		background: rgba(3, 6, 10, 0.62);
		backdrop-filter: blur(7px);
		-webkit-backdrop-filter: blur(7px);
	}
	.layer {
		position: fixed;
		inset: 0;
		z-index: 301;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 64px 18px 24px;
		pointer-events: none; /* clicks pass through to the backdrop button */
	}
	.window {
		width: min(760px, 100%);
		max-height: min(82vh, 760px);
		display: flex;
		flex-direction: column;
		box-shadow: var(--shadow-pop);
		overflow: hidden;
		pointer-events: auto;
	}

	.titlebar {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px 14px;
		border-bottom: 1px solid var(--line);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent);
	}
	.traffic {
		display: inline-flex;
		gap: 7px;
	}
	.traffic i {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		display: block;
	}
	.traffic .r {
		background: #ff5f57;
	}
	.traffic .y {
		background: #febc2e;
	}
	.traffic .g {
		background: #28c840;
	}
	.title-text {
		flex: 1;
		min-width: 0;
	}
	.title-text h2 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: 600;
		color: var(--ink);
	}
	.title-text p {
		margin: 1px 0 0;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--muted);
	}
	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 1px solid var(--line);
		border-radius: 9px;
		background: var(--surface-2);
		color: var(--muted);
		cursor: pointer;
		transition:
			color 0.16s ease,
			border-color 0.16s ease;
	}
	.close svg {
		width: 16px;
		height: 16px;
	}
	.close:hover {
		color: var(--danger);
		border-color: rgba(248, 113, 113, 0.5);
	}

	.body {
		padding: clamp(18px, 3vw, 28px);
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	@media (max-width: 640px) {
		.layer {
			padding: 56px 10px 90px;
		}
		.window {
			max-height: 86vh;
		}
	}
</style>
