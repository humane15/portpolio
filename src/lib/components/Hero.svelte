<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/profile';
	import SkillTicker from './SkillTicker.svelte';
	import DownloadCV from './DownloadCV.svelte';

	let {
		avatar = '',
		onViewWork
	}: { avatar?: string; onViewWork?: () => void } = $props();

	// ===== Typewriter (loops roles, respects reduced motion) =====
	let typed = $state('');
	let caretOn = $state(true);

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			typed = profile.roles[0];
			return;
		}

		const caret = setInterval(() => (caretOn = !caretOn), 520);
		const timers: ReturnType<typeof setTimeout>[] = [];
		let roleIdx = 0;
		let char = 0;
		let deleting = false;

		const step = () => {
			const text = profile.roles[roleIdx];
			typed = text.slice(0, char);
			let delay: number;
			if (!deleting) {
				char++;
				delay = 40 + Math.random() * 36;
				if (char > text.length) {
					deleting = true;
					delay = 1800;
				}
			} else {
				char--;
				delay = 22;
				if (char === 0) {
					deleting = false;
					roleIdx = (roleIdx + 1) % profile.roles.length;
					delay = 420;
				}
			}
			timers.push(setTimeout(step, delay));
		};
		timers.push(setTimeout(step, 600));

		return () => {
			clearInterval(caret);
			timers.forEach(clearTimeout);
		};
	});

	const initials = $derived(
		profile.name
			.split(' ')
			.filter(Boolean)
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase()
	);
</script>

<section class="hero">
	<article class="card mc-card">
		<div class="grid">
			<div class="identity">
				<p class="eyebrow"><span class="caret-dot" aria-hidden="true"></span> WELCOME TO ARHAMY OS</p>

				<h1 class="name">
					{#each profile.displayName as line, i (line)}
						<span class="line"
							>{line}{#if i === profile.displayName.length - 1}<span class="cred">, {profile.credentials}</span>{/if}</span
						>
					{/each}
				</h1>

				<p class="role" aria-live="polite">
					<span class="prompt" aria-hidden="true">&gt;</span>
					<span class="role-text">{typed}</span><span class="caret" class:on={caretOn} aria-hidden="true">▌</span>
				</p>

				<p class="desc">{profile.summary}</p>

				<p class="location">
					<svg viewBox="0 0 24 24" class="pin" aria-hidden="true">
						<path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="1.7" />
						<circle cx="12" cy="10" r="2.5" fill="currentColor" />
					</svg>
					{profile.location}
				</p>

				<div class="cta">
					<button class="btn btn-primary" onclick={onViewWork}>
						<svg viewBox="0 0 24 24" class="bi" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" /></svg>
						View My Work
					</button>
					<a class="btn" href={`mailto:${profile.email}`}>
						<svg viewBox="0 0 24 24" class="bi" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
						Get In Touch
					</a>
					<DownloadCV variant="ghost" />
				</div>
			</div>

			<aside class="side">
				<div class="frame">
					<div class="inner">
						{#if avatar}
							<img src={avatar} alt="Foto Muhammad Ulul Arhamy" />
						{:else}
							<span class="fallback">{initials}</span>
						{/if}
					</div>
					<span class="scan" aria-hidden="true"></span>
					<span class="chip">
						<span class="chip-dot" aria-hidden="true"></span>
						Open to work
					</span>
				</div>
			</aside>
		</div>

		<div class="ticker-slot">
			<SkillTicker skills={profile.skills} />
		</div>
	</article>
</section>

<style>
	.hero {
		position: relative;
		z-index: 5;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 70px 22px 40px;
		padding-left: max(22px, 92px);
	}

	.card {
		position: relative;
		width: min(880px, 100%);
		padding: clamp(24px, 4vw, 48px);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent),
			rgba(17, 22, 31, 0.86);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: var(--shadow-pop);
	}

	.grid {
		display: grid;
		grid-template-columns: 1.5fr 0.85fr;
		gap: clamp(24px, 4vw, 48px);
		align-items: center;
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin: 0 0 18px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 2.5px;
		color: var(--teal);
	}
	.caret-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--teal);
		box-shadow: var(--teal-glow);
	}

	.name {
		margin: 0 0 18px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(32px, 6vw, 62px);
		line-height: 0.98;
		letter-spacing: -1.5px;
		color: var(--ink);
	}
	.name .line {
		display: block;
	}
	.cred {
		color: var(--teal);
		font-size: 0.4em;
		font-weight: 600;
		letter-spacing: 0;
		vertical-align: super;
	}

	.role {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin: 0 0 18px;
		min-height: 1.6em;
		font-family: var(--font-mono);
		font-size: clamp(12px, 1.5vw, 15px);
		font-weight: 500;
		color: var(--ink);
	}
	.prompt {
		color: var(--teal);
	}
	.caret {
		color: var(--teal);
		opacity: 0;
	}
	.caret.on {
		opacity: 1;
	}

	.desc {
		margin: 0 0 16px;
		max-width: 54ch;
		font-size: clamp(13px, 1.5vw, 14.5px);
		line-height: 1.65;
		color: var(--muted);
	}

	.location {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		margin: 0 0 26px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
	}
	.pin {
		width: 15px;
		height: 15px;
		color: var(--teal);
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		padding: 11px 18px;
		border: 1px solid var(--line);
		border-radius: 12px;
		font: inherit;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		color: var(--ink);
		background: var(--surface-2);
		transition:
			transform 0.16s ease,
			border-color 0.18s ease,
			background 0.18s ease;
	}
	.btn:hover {
		transform: translateY(-2px);
		border-color: var(--line-strong);
		background: var(--surface-3);
	}
	.btn:active {
		transform: none;
	}
	.bi {
		width: 17px;
		height: 17px;
	}
	.btn-primary {
		color: #04130a;
		border-color: transparent;
		background: linear-gradient(135deg, var(--teal-2), var(--teal));
		box-shadow: var(--teal-glow);
	}
	.btn-primary:hover {
		box-shadow: 0 0 28px rgba(52, 211, 153, 0.5);
		background: linear-gradient(135deg, var(--teal-2), var(--teal));
	}

	/* ===== Avatar ===== */
	.side {
		display: flex;
		justify-content: center;
	}
	.frame {
		position: relative;
		width: clamp(160px, 20vw, 210px);
		aspect-ratio: 1;
		border-radius: 18px;
		padding: 8px;
		background: var(--surface-2);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-card);
		overflow: hidden;
	}
	.inner {
		width: 100%;
		height: 100%;
		border-radius: 12px;
		overflow: hidden;
		background: var(--bg-2, #0d1117);
	}
	.inner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-family: var(--font-display);
		font-size: clamp(44px, 7vw, 64px);
		font-weight: 700;
		color: var(--teal);
	}
	.scan {
		position: absolute;
		left: 8px;
		right: 8px;
		top: 8px;
		height: 28%;
		background: linear-gradient(180deg, rgba(52, 211, 153, 0.18), transparent);
		mix-blend-mode: screen;
		animation: scan 4.5s ease-in-out infinite;
		pointer-events: none;
	}
	@keyframes scan {
		0%,
		100% {
			transform: translateY(0);
			opacity: 0.6;
		}
		50% {
			transform: translateY(240%);
			opacity: 0.9;
		}
	}
	.chip {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		display: inline-flex;
		align-items: center;
		gap: 7px;
		white-space: nowrap;
		padding: 6px 13px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		color: var(--ink);
		background: rgba(10, 14, 20, 0.85);
		border: 1px solid var(--line);
		border-radius: 20px;
		backdrop-filter: blur(4px);
	}
	.chip-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--teal);
		box-shadow: var(--teal-glow);
	}

	.ticker-slot {
		margin-top: clamp(24px, 4vw, 40px);
	}

	@media (prefers-reduced-motion: reduce) {
		.scan {
			display: none;
		}
	}

	@media (max-width: 820px) {
		.hero {
			padding: 60px 16px 110px;
			padding-left: 16px;
		}
		.grid {
			grid-template-columns: 1fr;
			gap: 28px;
			text-align: center;
		}
		.side {
			order: -1;
		}
		.eyebrow,
		.location,
		.role {
			justify-content: center;
		}
		.desc {
			margin-inline: auto;
		}
		.cta {
			justify-content: center;
		}
	}
</style>
