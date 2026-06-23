<script lang="ts">
	import { profile } from '$lib/data/profile';
	import Window from './Window.svelte';
	import DownloadCV from './DownloadCV.svelte';

	let { onClose }: { onClose: () => void } = $props();
</script>

<Window title="About" subtitle="~/whoami" {onClose}>
	<div class="about">
		<div class="head">
			<div>
				<h3 class="name">{profile.name}, {profile.credentials}</h3>
				<p class="role">{profile.tagline}</p>
				<ul class="contact">
					<li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
					<li><a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a></li>
					<li>
						<a href={`https://${profile.website}`} target="_blank" rel="noreferrer">
							{profile.website}
						</a>
					</li>
				</ul>
			</div>
			<div class="dl-slot"><DownloadCV variant="ghost" /></div>
		</div>

		<p class="summary">{profile.summary}</p>

		<section class="block">
			<h4 class="block-title"><span class="prompt">$</span> skills</h4>
			<div class="skill-grid">
				{#each profile.skillGroups as g (g.group)}
					<div class="skill-group">
						<span class="group-name">{g.group}</span>
						<ul>
							{#each g.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<section class="block">
			<h4 class="block-title"><span class="prompt">$</span> achievements</h4>
			<ul class="achievements">
				{#each profile.achievements as a (a)}
					<li>{a}</li>
				{/each}
			</ul>
		</section>

		<div class="footer-dl"><DownloadCV /></div>
	</div>
</Window>

<style>
	.head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 18px;
		flex-wrap: wrap;
	}
	.name {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(20px, 3vw, 26px);
		font-weight: 700;
		color: var(--ink);
	}
	.role {
		margin: 6px 0 10px;
		font-family: var(--font-mono);
		font-size: 12.5px;
		color: var(--teal);
	}
	.contact {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px 16px;
		font-family: var(--font-mono);
		font-size: 12.5px;
	}
	.contact a {
		color: var(--muted);
		text-decoration: none;
	}
	.contact a:hover {
		color: var(--teal);
	}

	.summary {
		margin: 18px 0 4px;
		font-size: 14px;
		line-height: 1.7;
		color: var(--muted);
	}

	.block {
		margin-top: 22px;
	}
	.block-title {
		margin: 0 0 12px;
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 500;
		color: var(--ink);
		letter-spacing: 0.5px;
	}
	.prompt {
		color: var(--teal);
		margin-right: 6px;
	}

	.skill-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		gap: 12px;
	}
	.skill-group {
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 12px 14px;
		background: var(--surface-2);
	}
	.group-name {
		display: block;
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--teal);
		margin-bottom: 8px;
	}
	.skill-group ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.skill-group li {
		font-size: 13px;
		color: var(--ink);
	}

	.achievements {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 9px;
	}
	.achievements li {
		position: relative;
		padding-left: 22px;
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--ink);
	}
	.achievements li::before {
		content: '▹';
		position: absolute;
		left: 2px;
		color: var(--teal);
	}

	.footer-dl {
		margin-top: 26px;
		padding-top: 18px;
		border-top: 1px solid var(--line);
	}
</style>
