<script lang="ts">
	import { onMount } from 'svelte';

	let {
		onWeb = () => {},
		sshHost = 'ssh.farhanaulianda.my.id'
	}: { onWeb?: () => void; sshHost?: string } = $props();

	// index terpilih: 0 = WEB, 1 = SSH
	let selected = $state(0);
	let booting = $state(true); // animasi power-on
	let sshCopied = $state(false);
	let showCursor = $state(true);

	const options = $derived([
		{
			key: 'WEB',
			label: 'WEB INTERFACE',
			desc: 'Render the portfolio in your browser.',
			meta: 'graphical · recommended',
			cmd: 'open https://portfolio'
		},
		{
			key: 'SSH',
			label: 'SSH TERMINAL',
			desc: 'Connect to a live shell session.',
			meta: 'text-mode · for hackers',
			cmd: `ssh ${sshHost}`
		}
	]);

	function choose(i: number) {
		selected = i;
		if (i === 0) {
			onWeb();
		} else {
			openSSH();
		}
	}

	function openSSH() {
		try {
			navigator.clipboard?.writeText(`ssh ${sshHost}`);
			sshCopied = true;
			setTimeout(() => (sshCopied = false), 2600);
		} catch {}
		// coba buka klien ssh lewat protokol uri
		window.open(`ssh://${sshHost}`, '_self');
	}

	function handleKey(e: KeyboardEvent) {
		if (booting) return;
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			selected = (selected + options.length - 1) % options.length;
			e.preventDefault();
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			selected = (selected + 1) % options.length;
			e.preventDefault();
		} else if (e.key === 'Enter') {
			choose(selected);
			e.preventDefault();
		} else if (e.key.toLowerCase() === 'w') {
			choose(0);
		} else if (e.key.toLowerCase() === 's') {
			choose(1);
		}
	}

	onMount(() => {
		const cursorInterval = setInterval(() => (showCursor = !showCursor), 530);
		// selesai power-on
		const t = setTimeout(() => (booting = false), 900);
		window.addEventListener('keydown', handleKey);
		return () => {
			clearInterval(cursorInterval);
			clearTimeout(t);
			window.removeEventListener('keydown', handleKey);
		};
	});
</script>

<div class="crt-stage">
	<div class="crt-screen" class:booting>
		<!-- lapisan efek CRT -->
		<div class="crt-fx">
			<div class="crt-scanlines"></div>
			<div class="crt-flicker"></div>
			<div class="crt-vignette"></div>
			<div class="power-sweep"></div>
		</div>

		<div class="crt-content">
			<!-- header -->
			<header class="term-header">
				<div class="term-prompt">
					<span class="user">root</span><span class="at">@</span><span class="machine"
						>Muhammad Ulul Arhami</span
					>
					<span class="path">:~$</span>
					<span class="typed">select_interface</span>
					{#if showCursor}<span class="hcursor">▋</span>{/if}
				</div>
				<div class="term-sub">SYSTEM ONLINE · choose how you want to connect</div>
			</header>

			<!-- pilihan -->
			<div class="options" role="listbox" aria-label="Pilih antarmuka" tabindex="-1">
				{#each options as opt, i (opt.key)}
					<button
						class="opt-card"
						class:active={selected === i}
						role="option"
						aria-selected={selected === i}
						onmouseenter={() => (selected = i)}
						onclick={() => choose(i)}
					>
						<span class="opt-marker">{selected === i ? '▶' : ' '}</span>
						<span class="opt-body">
							<span class="opt-top">
								<span class="opt-key">[{opt.key === 'WEB' ? 'W' : 'S'}]</span>
								<span class="opt-label">{opt.label}</span>
							</span>
							<span class="opt-desc">{opt.desc}</span>
							<span class="opt-cmd">$ {opt.cmd}</span>
						</span>
						<span class="opt-meta">{opt.meta}</span>
					</button>
				{/each}
			</div>

			<!-- footer kontrol -->
			<footer class="term-footer">
				<span class="hint"><kbd>←</kbd><kbd>→</kbd> navigate</span>
				<span class="hint"><kbd>↵</kbd> select</span>
				<span class="hint"><kbd>W</kbd>/<kbd>S</kbd> shortcut</span>
				{#if sshCopied}
					<span class="copied-flag">✓ command copied — opening shell…</span>
				{/if}
			</footer>
		</div>
	</div>

	<div class="crt-base">
		<div class="crt-stand"></div>
		<div class="crt-foot"></div>
		<div class="crt-led"></div>
		<span class="crt-brand">AULIANDA—OS</span>
	</div>
</div>

<style>
	.crt-stage {
		position: fixed;
		inset: 0;
		z-index: 99999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0;
		padding: 24px;
		background:
			radial-gradient(circle at 50% 40%, #0b1410 0%, #05080a 60%, #020304 100%);
		font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace;
		overflow: hidden;
	}

	/* ====== TABUNG CRT ====== */
	.crt-screen {
		position: relative;
		width: min(760px, 92vw);
		aspect-ratio: 4 / 3;
		max-height: 70vh;
		border-radius: 28px / 22px;
		background: #04110c;
		padding: clamp(22px, 4vw, 48px);
		box-sizing: border-box;
		overflow: hidden;
		border: 2px solid #0d2018;
		box-shadow:
			inset 0 0 60px rgba(0, 0, 0, 0.9),
			inset 0 0 120px rgba(7, 60, 40, 0.25),
			0 0 0 12px #11160f,
			0 0 0 14px #0a0d08,
			0 30px 80px rgba(0, 0, 0, 0.8),
			0 0 80px rgba(28, 220, 140, 0.08);
		/* lengkungan layar tabung */
		transform: perspective(1400px);
	}

	/* kaca melengkung */
	.crt-screen::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			ellipse at 50% 0%,
			rgba(255, 255, 255, 0.06),
			transparent 60%
		);
		pointer-events: none;
		z-index: 20;
	}

	/* ====== EFEK CRT ====== */
	.crt-fx {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 15;
		border-radius: inherit;
		overflow: hidden;
	}
	.crt-scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0) 0px,
			rgba(0, 0, 0, 0) 2px,
			rgba(0, 0, 0, 0.32) 3px,
			rgba(0, 0, 0, 0.32) 3px
		);
		mix-blend-mode: multiply;
		animation: scan-roll 8s linear infinite;
	}
	@keyframes scan-roll {
		0% { background-position-y: 0; }
		100% { background-position-y: 100px; }
	}
	.crt-flicker {
		position: absolute;
		inset: 0;
		background: rgba(28, 220, 140, 0.03);
		animation: flicker 0.15s steps(3) infinite;
	}
	@keyframes flicker {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 0.85; }
	}
	.crt-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at 50% 50%,
			transparent 55%,
			rgba(0, 0, 0, 0.55) 100%
		);
	}

	/* power-on sweep */
	.power-sweep {
		position: absolute;
		inset: 0;
		background: #0a1f16;
		z-index: 30;
		transform-origin: center;
		opacity: 0;
		pointer-events: none;
	}
	.crt-screen.booting .power-sweep {
		animation: power-on 0.9s ease both;
	}
	@keyframes power-on {
		0% { opacity: 1; transform: scaleY(0.004) scaleX(1.3); background: #d7ffe9; }
		18% { opacity: 1; transform: scaleY(0.004) scaleX(1.3); background: #d7ffe9; }
		42% { opacity: 1; transform: scaleY(1) scaleX(1); background: #0a1f16; }
		100% { opacity: 0; transform: scaleY(1) scaleX(1); }
	}
	.crt-screen.booting .crt-content {
		opacity: 0;
		animation: content-in 0.4s ease 0.55s forwards;
	}
	@keyframes content-in {
		to { opacity: 1; }
	}

	/* ====== KONTEN ====== */
	.crt-content {
		position: relative;
		z-index: 10;
		height: 100%;
		display: flex;
		flex-direction: column;
		color: #4ade80;
		text-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
	}

	.term-header {
		flex-shrink: 0;
	}
	.term-prompt {
		font-size: clamp(12px, 1.8vw, 16px);
		letter-spacing: 0.5px;
	}
	.term-prompt .user { color: #4ade80; }
	.term-prompt .at,
	.term-prompt .path { color: #2a7d52; }
	.term-prompt .machine { color: #86efac; }
	.term-prompt .typed { color: #d1fae5; }
	.hcursor {
		color: #4ade80;
		animation: blink 0.8s step-end infinite;
	}
	.term-sub {
		margin-top: 6px;
		font-size: clamp(9px, 1.3vw, 11px);
		letter-spacing: 3px;
		color: #2a7d52;
		text-transform: uppercase;
	}

	/* ====== KARTU OPSI ====== */
	.options {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: clamp(10px, 2vw, 18px);
		margin: clamp(8px, 2vh, 20px) 0;
	}

	.opt-card {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 14px;
		width: 100%;
		text-align: left;
		background: transparent;
		border: 1px solid rgba(74, 222, 128, 0.18);
		border-radius: 4px;
		padding: clamp(12px, 2vw, 18px) clamp(14px, 2.5vw, 22px);
		color: inherit;
		font-family: inherit;
		cursor: pointer;
		transition:
			border-color 0.18s ease,
			background 0.18s ease,
			transform 0.12s ease,
			box-shadow 0.18s ease;
	}
	.opt-card:hover,
	.opt-card.active {
		border-color: #4ade80;
		background: rgba(74, 222, 128, 0.07);
		box-shadow:
			inset 0 0 30px rgba(74, 222, 128, 0.08),
			0 0 24px rgba(74, 222, 128, 0.18);
	}
	.opt-card.active {
		transform: translateX(4px);
	}
	.opt-card:focus-visible {
		outline: 2px solid #86efac;
		outline-offset: 2px;
	}

	.opt-marker {
		font-size: clamp(14px, 2vw, 20px);
		color: #4ade80;
		width: 1ch;
		animation: marker-blink 1s step-end infinite;
	}
	.opt-card:not(.active) .opt-marker {
		animation: none;
		opacity: 0;
	}
	@keyframes marker-blink {
		50% { opacity: 0.3; }
	}

	.opt-body {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.opt-top {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}
	.opt-key {
		font-size: clamp(11px, 1.5vw, 14px);
		color: #facc15;
		text-shadow: 0 0 6px rgba(250, 204, 21, 0.5);
	}
	.opt-label {
		font-size: clamp(15px, 2.4vw, 22px);
		font-weight: 700;
		letter-spacing: 2px;
		color: #d1fae5;
	}
	.opt-desc {
		font-size: clamp(10px, 1.4vw, 13px);
		color: #4ade80;
		opacity: 0.75;
	}
	.opt-cmd {
		font-size: clamp(9px, 1.3vw, 12px);
		color: #2a7d52;
		opacity: 0;
		max-height: 0;
		overflow: hidden;
		transition: all 0.25s ease;
	}
	.opt-card.active .opt-cmd {
		opacity: 1;
		max-height: 24px;
		margin-top: 2px;
	}

	.opt-meta {
		font-size: clamp(8px, 1.2vw, 10px);
		letter-spacing: 1.5px;
		text-transform: uppercase;
		color: #2a7d52;
		text-align: right;
		white-space: nowrap;
	}

	/* ====== FOOTER ====== */
	.term-footer {
		flex-shrink: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: clamp(10px, 2vw, 20px);
		padding-top: clamp(8px, 1.5vh, 14px);
		border-top: 1px solid rgba(74, 222, 128, 0.15);
		font-size: clamp(9px, 1.3vw, 11px);
		color: #2a7d52;
	}
	.hint {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		letter-spacing: 1px;
	}
	kbd {
		display: inline-block;
		min-width: 1.4em;
		padding: 1px 5px;
		text-align: center;
		border: 1px solid rgba(74, 222, 128, 0.4);
		border-radius: 3px;
		background: rgba(74, 222, 128, 0.06);
		color: #4ade80;
		font-family: inherit;
		font-size: 0.95em;
	}
	.copied-flag {
		margin-left: auto;
		color: #86efac;
		text-shadow: 0 0 8px rgba(134, 239, 172, 0.7);
		animation: fade-in 0.2s ease;
	}

	/* ====== BADAN MONITOR ====== */
	.crt-base {
		position: relative;
		width: min(760px, 92vw);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.crt-stand {
		width: 90px;
		height: 26px;
		background: linear-gradient(#15201a, #0a0d08);
		border-radius: 0 0 6px 6px;
	}
	.crt-foot {
		width: 220px;
		height: 14px;
		background: linear-gradient(#11160f, #070a06);
		border-radius: 0 0 14px 14px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.7);
	}
	.crt-led {
		position: absolute;
		bottom: 28px;
		right: calc(50% - 130px);
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #4ade80;
		box-shadow: 0 0 10px #4ade80, 0 0 20px rgba(74, 222, 128, 0.6);
		animation: led-pulse 2.5s ease-in-out infinite;
	}
	@keyframes led-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.45; }
	}
	.crt-brand {
		position: absolute;
		bottom: 30px;
		left: calc(50% - 122px);
		font-size: 9px;
		letter-spacing: 3px;
		color: #2a7d52;
		opacity: 0.7;
	}

	/* ====== SHARED ====== */
	@keyframes blink {
		50% { opacity: 0; }
	}
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@media (max-width: 560px) {
		.crt-screen {
			aspect-ratio: 3 / 4;
			max-height: 64vh;
		}
		.opt-card {
			grid-template-columns: auto 1fr;
		}
		.opt-meta {
			display: none;
		}
		.term-footer .hint:nth-child(3) {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.crt-scanlines,
		.crt-flicker,
		.opt-marker,
		.crt-led,
		.hcursor {
			animation: none;
		}
		.crt-screen.booting .power-sweep {
			animation: none;
			opacity: 0;
		}
		.crt-screen.booting .crt-content {
			opacity: 1;
			animation: none;
		}
	}
</style>