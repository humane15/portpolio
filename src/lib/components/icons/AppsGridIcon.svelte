<script lang="ts">
	let { size = 22 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
	<circle cx="6" cy="6" r="1.8" /><circle cx="12" cy="6" r="1.8" /><circle cx="18" cy="6" r="1.8" />
	<circle cx="6" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="18" cy="12" r="1.8" />
	<circle cx="6" cy="18" r="1.8" /><circle cx="12" cy="18" r="1.8" /><circle cx="18" cy="18" r="1.8" />
</svg>
