<script lang="ts">
	let { size = 22 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
	<rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="1.7" />
	<circle cx="8.5" cy="10" r="2.1" stroke="currentColor" stroke-width="1.6" />
	<path d="M5.4 16.2c.5-1.7 1.8-2.5 3.1-2.5s2.6.8 3.1 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
	<line x1="14.5" y1="9" x2="18.5" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
	<line x1="14.5" y1="12" x2="18.5" y2="12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
	<line x1="14.5" y1="15" x2="17.5" y2="15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
</svg>
