<script lang="ts">
	let { size = 22 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
	<rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#0a66c2" />
	<path d="M7.2 9.4v7.4M7.2 6.9v.02M10.6 16.8V9.4m0 2.2c.4-1 1.4-1.9 2.9-1.9 2 0 2.8 1.3 2.8 3.4v3.7"
		stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
</svg>
