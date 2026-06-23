<script lang="ts">
	import { profile } from '$lib/data/profile';
	import DownloadIcon from './icons/DownloadIcon.svelte';

	let { variant = 'primary' }: { variant?: 'primary' | 'ghost' } = $props();
</script>

<a
	class="dl {variant}"
	href={profile.cvUrl}
	download={profile.cvDownloadName}
	aria-label="Download CV (PDF)"
>
	<DownloadIcon size={17} />
	Download CV (PDF)
</a>

<style>
	.dl {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		padding: 11px 18px;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition:
			transform 0.16s ease,
			box-shadow 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.primary {
		color: #04130a;
		background: linear-gradient(135deg, var(--teal-2), var(--teal));
		border: 1px solid transparent;
		box-shadow: var(--teal-glow);
	}
	.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 26px rgba(52, 211, 153, 0.55);
	}

	.ghost {
		color: var(--teal);
		background: rgba(52, 211, 153, 0.08);
		border: 1px solid rgba(52, 211, 153, 0.35);
	}
	.ghost:hover {
		transform: translateY(-2px);
		background: rgba(52, 211, 153, 0.14);
		border-color: var(--teal);
	}

	.dl:active {
		transform: none;
	}
</style>
