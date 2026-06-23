<script lang="ts">
	import { onMount } from 'svelte';

	let {
		brightness = $bindable(100),
		onActivities
	}: { brightness?: number; onActivities?: () => void } = $props();

	let now = $state(new Date());

	const timeFmt = $derived(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
	const dateFmt = $derived(
		now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
	);

	onMount(() => {
		const id = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(id);
	});
</script>

<header class="topbar">
	<button class="pill activities" onclick={onActivities}>
		<span class="dot" aria-hidden="true"></span>
		Activities
	</button>

	<button class="pill clock" aria-label={`${dateFmt}, ${timeFmt}`}>
		<time>{dateFmt}</time>
		<span class="sep" aria-hidden="true">·</span>
		<time class="time">{timeFmt}</time>
	</button>

	<div class="tray pill">
		<label class="bright" title="Brightness">
			<svg viewBox="0 0 24 24" class="ico" aria-hidden="true">
				<circle cx="12" cy="12" r="4.3" fill="currentColor" />
				<g stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
					<line x1="12" y1="2.5" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="21.5" />
					<line x1="2.5" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="21.5" y2="12" />
					<line x1="5.2" y1="5.2" x2="6.9" y2="6.9" /><line x1="17.1" y1="17.1" x2="18.8" y2="18.8" />
					<line x1="18.8" y1="5.2" x2="17.1" y2="6.9" /><line x1="6.9" y1="17.1" x2="5.2" y2="18.8" />
				</g>
			</svg>
			<input type="range" min="45" max="100" bind:value={brightness} aria-label="Screen brightness" />
		</label>

		<span class="ico-wrap" title="Wi-Fi connected">
			<svg viewBox="0 0 24 24" class="ico" role="img" aria-label="Wi-Fi connected">
				<path d="M12 18.6a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1z" fill="currentColor" />
				<path d="M8.4 16.4a4.9 4.9 0 0 1 7.2 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				<path d="M5.5 13.1a9 9 0 0 1 13 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.9" />
				<path d="M2.5 9.7a13.4 13.4 0 0 1 19 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.65" />
			</svg>
		</span>

		<span class="ico-wrap battery" title="Battery 86%">
			<svg viewBox="0 0 28 24" class="ico" aria-hidden="true">
				<rect x="2" y="7.5" width="20" height="9" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.7" />
				<rect x="3.6" y="9.1" width="13" height="5.8" rx="1.1" fill="currentColor" />
				<rect x="23" y="10" width="2.4" height="4" rx="1.2" fill="currentColor" />
			</svg>
			<span class="pct">86%</span>
		</span>
	</div>
</header>

<style>
	.topbar {
		position: fixed;
		inset: 0 0 auto 0;
		height: 38px;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px;
		background: rgba(10, 14, 20, 0.7);
		backdrop-filter: blur(14px) saturate(140%);
		-webkit-backdrop-filter: blur(14px) saturate(140%);
		border-bottom: 1px solid var(--line);
		font-size: 12.5px;
		color: var(--ink);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		border: 1px solid transparent;
		font: inherit;
		color: var(--ink);
		background: transparent;
		padding: 4px 11px;
		border-radius: 9px;
		cursor: pointer;
		transition:
			background 0.16s ease,
			border-color 0.16s ease;
	}
	.pill:hover {
		background: var(--surface);
		border-color: var(--line);
	}

	.activities {
		font-weight: 600;
	}
	.activities .dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--teal);
		box-shadow: var(--teal-glow);
	}

	.clock {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-weight: 500;
	}
	.clock .sep {
		opacity: 0.4;
	}
	.clock .time {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.5px;
	}

	.tray {
		gap: 14px;
		cursor: default;
	}

	.ico {
		width: 16px;
		height: 16px;
		display: block;
		color: var(--ink);
	}
	.ico-wrap {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		color: var(--ink);
	}
	.battery .pct {
		font-size: 11px;
		opacity: 0.85;
		font-variant-numeric: tabular-nums;
	}

	.bright {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--ink);
	}
	.bright input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 70px;
		height: 4px;
		border-radius: 4px;
		background: linear-gradient(90deg, var(--teal), rgba(255, 255, 255, 0.12));
		outline: none;
		cursor: pointer;
	}
	.bright input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #fff;
		box-shadow: var(--teal-glow);
		cursor: pointer;
	}
	.bright input[type='range']::-moz-range-thumb {
		width: 13px;
		height: 13px;
		border: 0;
		border-radius: 50%;
		background: #fff;
		box-shadow: var(--teal-glow);
		cursor: pointer;
	}

	@media (max-width: 560px) {
		.clock {
			font-size: 11.5px;
		}
		.bright input[type='range'] {
			width: 46px;
		}
		.battery .pct {
			display: none;
		}
	}
</style>
