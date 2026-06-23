<script lang="ts">
	import { profile, type AppId } from '$lib/data/profile';
	import AboutIcon from './icons/AboutIcon.svelte';
	import ProjectsIcon from './icons/ProjectsIcon.svelte';
	import BlogIcon from './icons/BlogIcon.svelte';
	import AppsGridIcon from './icons/AppsGridIcon.svelte';
	import SpotifyIcon from './icons/SpotifyIcon.svelte';
	import GitHubIcon from './icons/GitHubIcon.svelte';
	import LinkedInIcon from './icons/LinkedInIcon.svelte';
	import InstagramIcon from './icons/InstagramIcon.svelte';

	let {
		onOpenApp,
		onAppsGrid
	}: { onOpenApp: (id: AppId) => void; onAppsGrid: () => void } = $props();

	const appIcons = { about: AboutIcon, projects: ProjectsIcon, blog: BlogIcon };
	const linkIcons = {
		spotify: SpotifyIcon,
		github: GitHubIcon,
		linkedin: LinkedInIcon,
		instagram: InstagramIcon
	};
</script>

<nav class="dock" aria-label="Application dock">
	<ul>
		<!-- A. apps that open in-site windows -->
		{#each profile.dockApps as app (app.id)}
			{@const Icon = appIcons[app.icon]}
			<li>
				<button class="item app" onclick={() => onOpenApp(app.id)} aria-label={`Open ${app.name}`}>
					<span class="glyph"><Icon /></span>
					<span class="label">{app.name}</span>
				</button>
			</li>
		{/each}

		<li class="divider" aria-hidden="true"></li>

		<!-- B. external links -->
		{#each profile.dockLinks as link (link.name)}
			{@const Icon = linkIcons[link.icon]}
			<li>
				<a class="item" href={link.url} target="_blank" rel="noreferrer" aria-label={link.name}>
					<span class="glyph"><Icon /></span>
					<span class="label">{link.name}</span>
				</a>
			</li>
		{/each}

		<li class="divider" aria-hidden="true"></li>

		<li>
			<button class="item app" onclick={onAppsGrid} aria-label="Show dashboard">
				<span class="glyph"><AppsGridIcon /></span>
				<span class="label">Apps</span>
			</button>
		</li>
	</ul>
</nav>

<style>
	.dock {
		position: fixed;
		left: 14px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 150;
	}
	.dock ul {
		list-style: none;
		margin: 0;
		padding: 12px 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		border-radius: 20px;
		background: rgba(17, 22, 31, 0.82);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-pop);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.divider {
		width: 60%;
		height: 1px;
		margin: 3px 0;
		background: linear-gradient(90deg, transparent, var(--line-strong), transparent);
	}

	.item {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 1px solid var(--line);
		border-radius: 14px;
		cursor: pointer;
		color: var(--ink);
		background: var(--surface-2);
		text-decoration: none;
		transition:
			transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
			border-color 0.18s ease,
			box-shadow 0.18s ease;
	}
	.glyph {
		display: inline-flex;
		color: var(--muted);
		transition: color 0.18s ease;
	}
	/* app (monochrome) icons tint teal on hover; brand icons keep their colours */
	.app .glyph {
		color: var(--muted);
	}

	.item:hover,
	.item:focus-visible {
		transform: translateX(4px);
		border-color: rgba(52, 211, 153, 0.5);
		box-shadow: 0 0 16px rgba(52, 211, 153, 0.28);
	}
	.app:hover .glyph,
	.app:focus-visible .glyph {
		color: var(--teal);
	}
	.item:active {
		transform: scale(0.95);
	}

	/* Tooltip-style label (per reference: name beside the icon) */
	.label {
		position: absolute;
		left: calc(100% + 12px);
		top: 50%;
		transform: translateY(-50%) translateX(-4px);
		white-space: nowrap;
		padding: 5px 10px;
		font-family: var(--font-mono);
		font-size: 11.5px;
		color: var(--ink);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 8px;
		box-shadow: var(--shadow-card);
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.15s ease,
			transform 0.15s ease;
	}
	.item:hover .label,
	.item:focus-visible .label {
		opacity: 1;
		transform: translateY(-50%) translateX(0);
	}

	/* ===== Mobile: horizontal dock at the bottom ===== */
	@media (max-width: 820px) {
		.dock {
			left: 50%;
			top: auto;
			bottom: 12px;
			transform: translateX(-50%);
			max-width: calc(100vw - 20px);
		}
		.dock ul {
			flex-direction: row;
			padding: 9px 11px;
			overflow-x: auto;
		}
		.divider {
			width: 1px;
			height: 30px;
			margin: 0 2px;
			background: linear-gradient(180deg, transparent, var(--line-strong), transparent);
		}
		.item:hover,
		.item:focus-visible {
			transform: translateY(-5px);
		}
		.label {
			left: 50%;
			top: auto;
			bottom: calc(100% + 10px);
			transform: translateX(-50%) translateY(4px);
		}
		.item:hover .label,
		.item:focus-visible .label {
			transform: translateX(-50%) translateY(0);
		}
	}
</style>
