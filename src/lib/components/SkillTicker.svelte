<script lang="ts">
	let { skills }: { skills: string[] } = $props();

	// Duplicate so the marquee loops seamlessly.
	const loop = $derived([...skills, ...skills]);
</script>

<div class="ticker" aria-label="Skills">
	<div class="track">
		{#each loop as skill, i (i)}
			<span class="chip">{skill}</span>
			<span class="dot" aria-hidden="true">/</span>
		{/each}
	</div>
	<span class="fade fade-l" aria-hidden="true"></span>
	<span class="fade fade-r" aria-hidden="true"></span>
</div>

<style>
	.ticker {
		position: relative;
		overflow: hidden;
		border-radius: 12px;
		padding: 11px 0;
		background: var(--surface-2);
		border: 1px solid var(--line);
	}
	.track {
		display: flex;
		align-items: center;
		gap: 14px;
		width: max-content;
		padding-left: 14px;
		animation: marquee 38s linear infinite;
	}
	.ticker:hover .track {
		animation-play-state: paused;
	}

	.chip {
		font-family: var(--font-mono);
		font-size: 12.5px;
		font-weight: 500;
		color: var(--ink);
		white-space: nowrap;
	}
	.dot {
		font-family: var(--font-mono);
		color: var(--teal);
		opacity: 0.7;
	}

	.fade {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 52px;
		pointer-events: none;
		z-index: 2;
	}
	.fade-l {
		left: 0;
		background: linear-gradient(90deg, var(--surface-2), transparent);
	}
	.fade-r {
		right: 0;
		background: linear-gradient(270deg, var(--surface-2), transparent);
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
			flex-wrap: wrap;
			width: 100%;
			white-space: normal;
			padding: 0 14px;
		}
	}
</style>
