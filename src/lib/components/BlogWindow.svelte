<script lang="ts">
	import Window from './Window.svelte';

	let { onClose }: { onClose: () => void } = $props();
</script>

<Window title="Blog" subtitle="~/blog" {onClose}>
	<div class="soon">
		<div class="badge">
			<span class="pulse" aria-hidden="true"></span>
			STATUS: WRITING IN PROGRESS
		</div>
		<h3>Coming soon.</h3>
		<p>
			Catatan teknis tentang cloud, DevOps, dan AI/ML sedang disiapkan — deep-dive deployment VPS,
			tuning model computer vision, dan eksperimen keamanan.
		</p>
		<pre class="log" aria-hidden="true">$ git commit -m "draft: first post"
[blog 1a2c9f] draft: first post
 1 file changed, 0 insertions(+)
$ status: <span class="amber">pending review…</span></pre>
	</div>
</Window>

<style>
	.soon {
		text-align: center;
		padding: 14px 6px 6px;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 1px;
		color: var(--amber);
		padding: 5px 12px;
		border-radius: 20px;
		border: 1px solid rgba(251, 191, 36, 0.35);
		background: rgba(251, 191, 36, 0.07);
	}
	.pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--amber);
		box-shadow: 0 0 8px var(--amber);
		animation: blink 1.4s ease-in-out infinite;
	}
	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}
	h3 {
		margin: 18px 0 10px;
		font-family: var(--font-display);
		font-size: clamp(24px, 4vw, 34px);
		font-weight: 700;
		color: var(--ink);
	}
	p {
		max-width: 46ch;
		margin: 0 auto 22px;
		font-size: 14px;
		line-height: 1.7;
		color: var(--muted);
	}
	.log {
		text-align: left;
		display: inline-block;
		margin: 0 auto;
		padding: 14px 18px;
		border-radius: 10px;
		background: var(--bg-2, #0d1117);
		border: 1px solid var(--line);
		font-family: var(--font-mono);
		font-size: 12px;
		line-height: 1.7;
		color: var(--muted);
		white-space: pre-wrap;
	}
	.amber {
		color: var(--amber);
	}
</style>
