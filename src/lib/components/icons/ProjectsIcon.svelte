<script lang="ts">
	let { size = 22 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
	<path d="M3 7a2 2 0 0 1 2-2h4l2 2.2h6a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
		stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
	<path d="M3 10.5h18" stroke="currentColor" stroke-width="1.4" />
</svg>
