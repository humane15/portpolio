<script lang="ts">
	import { profile } from '$lib/data/profile';
	import Window from './Window.svelte';

	let { onClose }: { onClose: () => void } = $props();
</script>

<Window title="Projects" subtitle="~/projects" {onClose}>
	<div class="list">
		{#each profile.projects as p (p.title)}
			<article class="proj">
				<header>
					<h3>{p.title}</h3>
					{#if p.period}<span class="period">{p.period}</span>{/if}
				</header>
				<p class="desc">{p.description}</p>
				<ul class="tags">
					{#each p.tags as t (t)}
						<li>{t}</li>
					{/each}
				</ul>
				{#if p.links?.length}
					<div class="links">
						{#each p.links as l (l.url)}
							<a href={l.url} target="_blank" rel="noreferrer">
								{l.label}
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none" />
								</svg>
							</a>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</div>
</Window>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.proj {
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 16px 18px;
		background: var(--surface-2);
		transition: border-color 0.2s ease;
	}
	.proj:hover {
		border-color: rgba(52, 211, 153, 0.4);
	}
	.proj header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
		flex-wrap: wrap;
	}
	.proj h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 16.5px;
		font-weight: 600;
		color: var(--ink);
	}
	.period {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--teal);
		white-space: nowrap;
	}
	.desc {
		margin: 9px 0 12px;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--muted);
	}
	.tags {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.tags li {
		font-family: var(--font-mono);
		font-size: 11px;
		padding: 4px 9px;
		border-radius: 7px;
		color: var(--ink);
		background: var(--surface-3);
		border: 1px solid var(--line);
	}
	.links {
		margin-top: 14px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.links a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		color: var(--teal);
		padding: 7px 12px;
		border-radius: 9px;
		border: 1px solid rgba(52, 211, 153, 0.35);
		background: rgba(52, 211, 153, 0.07);
		transition: background 0.18s ease;
	}
	.links a:hover {
		background: rgba(52, 211, 153, 0.15);
	}
	.links svg {
		width: 14px;
		height: 14px;
	}
</style>
