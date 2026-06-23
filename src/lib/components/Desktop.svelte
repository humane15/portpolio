<script lang="ts">
	import { onMount } from 'svelte';
	import type { AppId } from '$lib/data/profile';
	import TopBar from './TopBar.svelte';
	import Dock from './Dock.svelte';
	import Hero from './Hero.svelte';
	import MissionControl from './MissionControl.svelte';
	import AboutWindow from './AboutWindow.svelte';
	import ProjectsWindow from './ProjectsWindow.svelte';
	import BlogWindow from './BlogWindow.svelte';

	let { avatar = '' }: { avatar?: string } = $props();

	// ===== Window manager state =====
	let openApp = $state<null | AppId>(null);

	function open(id: AppId) {
		openApp = id;
	}
	function close() {
		openApp = null;
	}

	// ===== Brightness (filters the screen via CSS filter) =====
	let brightness = $state(100);
	const dim = $derived(0.55 + ((brightness - 45) / 55) * 0.45);

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// ===== Cursor follower (teal reticle) =====
	let ring = $state<HTMLDivElement | null>(null);
	let dot = $state<HTMLDivElement | null>(null);

	onMount(() => {
		const fine = window.matchMedia('(pointer: fine)').matches;
		if (!fine || !ring || !dot) return;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.documentElement.classList.add('has-follower');

		let tx = window.innerWidth / 2;
		let ty = window.innerHeight / 2;
		let rx = tx;
		let ry = ty;
		let raf = 0;

		const move = (e: MouseEvent) => {
			tx = e.clientX;
			ty = e.clientY;
			if (dot) dot.style.transform = `translate(${tx}px, ${ty}px)`;
			if (reduce && ring) ring.style.transform = `translate(${tx}px, ${ty}px)`;
		};

		const loop = () => {
			rx += (tx - rx) * 0.18;
			ry += (ty - ry) * 0.18;
			if (ring) ring.style.transform = `translate(${rx}px, ${ry}px)`;
			raf = requestAnimationFrame(loop);
		};

		const over = (e: MouseEvent) => {
			const interactive = (e.target as HTMLElement)?.closest(
				'a, button, input, [role="button"], [tabindex]'
			);
			ring?.classList.toggle('active', !!interactive);
		};

		window.addEventListener('mousemove', move, { passive: true });
		window.addEventListener('mouseover', over, { passive: true });
		if (!reduce) raf = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener('mousemove', move);
			window.removeEventListener('mouseover', over);
			cancelAnimationFrame(raf);
			document.documentElement.classList.remove('has-follower');
		};
	});
</script>

<div class="os" style="--screen-dim: {dim}">
	<!-- Ambient background -->
	<div class="ambient" aria-hidden="true">
		<span class="blob blob-a"></span>
		<span class="blob blob-b"></span>
		<span class="grid-lines"></span>
	</div>

	<div class="screen">
		<TopBar bind:brightness onActivities={scrollTop} />
		<Dock onOpenApp={open} onAppsGrid={scrollTop} />

		<main class="stage">
			<MissionControl />
			<Hero {avatar} onViewWork={() => open('projects')} />
		</main>
	</div>

	<!-- Window layer -->
	{#if openApp === 'about'}
		<AboutWindow onClose={close} />
	{:else if openApp === 'projects'}
		<ProjectsWindow onClose={close} />
	{:else if openApp === 'blog'}
		<BlogWindow onClose={close} />
	{/if}

	<!-- Cursor follower -->
	<div class="follower" aria-hidden="true">
		<div class="ring" bind:this={ring}></div>
		<div class="dot" bind:this={dot}></div>
	</div>
</div>

<style>
	.os {
		position: relative;
		min-height: 100vh;
	}
	.screen {
		position: relative;
		z-index: 1;
		filter: brightness(var(--screen-dim, 1));
		transition: filter 0.15s ease;
	}
	.stage {
		position: relative;
	}

	/* ===== Ambient ===== */
	.ambient {
		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}
	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(130px);
	}
	.blob-a {
		width: 560px;
		height: 560px;
		top: -160px;
		right: -120px;
		background: radial-gradient(circle, rgba(52, 211, 153, 0.18), transparent 70%);
		animation: drift 28s ease-in-out infinite;
	}
	.blob-b {
		width: 480px;
		height: 480px;
		bottom: -160px;
		left: -120px;
		background: radial-gradient(circle, rgba(56, 138, 255, 0.12), transparent 70%);
		animation: drift 34s ease-in-out infinite reverse;
	}
	.grid-lines {
		position: absolute;
		inset: 0;
		opacity: 0.5;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 46px 46px;
		mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 75%);
		-webkit-mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 75%);
	}
	@keyframes drift {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(40px, -30px) scale(1.1);
		}
	}

	/* ===== Cursor follower ===== */
	.follower {
		position: fixed;
		inset: 0;
		z-index: 999;
		pointer-events: none;
	}
	.ring,
	.dot {
		position: fixed;
		left: 0;
		top: 0;
		border-radius: 50%;
		will-change: transform;
	}
	.ring {
		width: 34px;
		height: 34px;
		margin: -17px 0 0 -17px;
		border: 1.5px solid rgba(52, 211, 153, 0.6);
		box-shadow:
			0 0 12px rgba(52, 211, 153, 0.35),
			inset 0 0 8px rgba(52, 211, 153, 0.15);
		transition:
			width 0.2s ease,
			height 0.2s ease,
			margin 0.2s ease,
			border-color 0.2s ease;
	}
	.ring:global(.active) {
		width: 48px;
		height: 48px;
		margin: -24px 0 0 -24px;
		border-color: var(--teal);
	}
	.dot {
		width: 6px;
		height: 6px;
		margin: -3px 0 0 -3px;
		background: var(--teal);
		box-shadow: var(--teal-glow);
	}

	@media (prefers-reduced-motion: reduce) {
		.blob {
			animation: none;
		}
	}
</style>

<svelte:head>
	<!-- Hide the follower entirely for touch / coarse pointers -->
	<style>
		@media (hover: none), (pointer: coarse) {
			.follower {
				display: none !important;
			}
		}
	</style>
</svelte:head>
