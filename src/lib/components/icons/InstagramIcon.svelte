<script lang="ts">
	let { size = 22 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
	<defs>
		<linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
			<stop offset="0" stop-color="#feda75" />
			<stop offset="0.4" stop-color="#fa7e1e" />
			<stop offset="0.7" stop-color="#d62976" />
			<stop offset="1" stop-color="#962fbf" />
		</linearGradient>
	</defs>
	<rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="url(#ig-grad)" />
	<circle cx="12" cy="12" r="4" fill="none" stroke="#fff" stroke-width="1.7" />
	<circle cx="17" cy="7" r="1.2" fill="#fff" />
</svg>
