<script lang="ts">
	import { onMount } from 'svelte';

	let { onComplete = () => {} }: { onComplete?: () => void } = $props();

	type BootLine = { text: string; type: string };
	type WhoChar = { final: string; current: string; locked: boolean };

	// phase: 0 = loading, 1 = error shake, 2 = who are you, 3 = enter system, 4 = done
	let phase = $state(0);
	let progress = $state(0);
	let showCursor = $state(true);

	// Fase 0 — loading log
	let loadLines = $state<string[]>([]);
	const loadingSteps = [
		'Initializing kernel...',
		'Mounting virtual filesystem...',
		'Establishing secure tunnel...',
		'Bypassing firewall...',
		'Fetching encrypted payload...',
		'Decrypting data stream...',
		'Injecting modules...'
	];

	// Fase 2 — Code Lyoko "who are you?"
	const whoText = 'WHO ARE YOU?';
	let whoChars = $state<WhoChar[]>([]);
	let whoRevealed = $state(false);

	// Fase 3 — enter system boot
	let systemLines = $state<BootLine[]>([]);
	let bootComplete = $state(false);
	let finalFlash = $state(false);
	const systemBoot = [
		{ text: 'ACCESS GRANTED', type: 'success' },
		{ text: '> identity confirmed', type: 'ok' },
		{ text: '> decrypting credentials.......... [ OK ]', type: 'ok' },
		{ text: '> loading user profile...', type: 'dim' },
		{ text: '> mounting modules [▓▓▓▓▓▓▓▓▓▓] 100%', type: 'dim' },
		{ text: '> establishing neural link....... [ OK ]', type: 'ok' },
		{ text: '> rendering interface...', type: 'dim' },
		{ text: '> sync complete', type: 'ok' },
		{ text: '> entering system', type: 'ok' },
		{ text: 'WELCOME, OPERATOR', type: 'welcome' }
	];

	// random glitch chars for scramble effect
	const glitchChars = '!<>-_\\/[]{}—=+*^?#$%&@01';

	function randChar() {
		return glitchChars[Math.floor(Math.random() * glitchChars.length)];
	}

	$effect(() => {
		if (phase < 4) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	onMount(() => {
		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 500);

		runPhase0();

		return () => clearInterval(cursorInterval);
	});

	// ===== FASE 0: LOADING sampai 90% lalu error =====
	function runPhase0() {
		let stepIdx = 0;

		// tampilkan baris log bertahap
		const logInterval = setInterval(() => {
			if (stepIdx < loadingSteps.length) {
				loadLines = [...loadLines, loadingSteps[stepIdx]];
				stepIdx++;
			} else {
				clearInterval(logInterval);
			}
		}, 280);

		// progress bar
		const progInterval = setInterval(() => {
			// melambat saat mendekati 90
			const remaining = 90 - progress;
			const inc = Math.max(0.6, remaining * 0.08);
			progress = Math.min(90, progress + inc);

			if (progress >= 90) {
				clearInterval(progInterval);
				clearInterval(logInterval);
				// jeda sebentar di 90% lalu trigger error/getar
				setTimeout(triggerError, 600);
			}
		}, 90);
	}

	// ===== FASE 1: ERROR / GETAR =====
	function triggerError() {
		phase = 1;
		// getar selama 1.4s lalu pindah ke fase WHO ARE YOU
		setTimeout(() => {
			phase = 2;
			runPhase2();
		}, 1400);
	}

	// ===== FASE 2: WHO ARE YOU (Code Lyoko style) =====
	function runPhase2() {
		// mulai dengan semua karakter acak
		whoChars = whoText.split('').map((c) => ({
			final: c,
			current: c === ' ' ? ' ' : randChar(),
			locked: c === ' '
		}));

		let frame = 0;
		const totalFrames = 40;

		const scramble = setInterval(() => {
			frame++;
			const lockUpTo = Math.floor((frame / totalFrames) * whoChars.length);

			whoChars = whoChars.map((ch, i) => {
				if (ch.locked) return ch;
				if (i < lockUpTo) {
					return { ...ch, current: ch.final, locked: true };
				}
				return { ...ch, current: ch.final === ' ' ? ' ' : randChar() };
			});

			if (frame >= totalFrames) {
				clearInterval(scramble);
				whoChars = whoChars.map((ch) => ({ ...ch, current: ch.final, locked: true }));
				whoRevealed = true;
				// tahan teks sebentar, lalu masuk sistem
				setTimeout(() => {
					phase = 3;
					runPhase3();
				}, 1600);
			}
		}, 45);
	}

	// ===== FASE 3: MASUK KE SISTEM =====
	function runPhase3() {
		let idx = 0;
		const interval = setInterval(() => {
			if (idx < systemBoot.length) {
				systemLines = [...systemBoot.slice(0, idx + 1)];
				idx++;
			} else {
				clearInterval(interval);
				bootComplete = true;
				// jeda sebentar lalu munculkan flash "ENTERING SYSTEM" full-screen
				setTimeout(() => {
					finalFlash = true;
				}, 650);
				// setelah flash selesai, masuk ke portofolio
				setTimeout(() => {
					phase = 4;
					onComplete();
				}, 1650);
			}
		}, 200);
	}

	function lineClass(type: string) {
		if (type === 'success') return 'sys-success';
		if (type === 'welcome') return 'sys-welcome';
		if (type === 'ok') return 'sys-ok';
		return 'sys-dim';
	}
</script>

{#if phase < 4}
	<div
		class="loader"
		class:phase-error={phase === 1}
		class:phase-who={phase === 2}
		class:phase-system={phase === 3}
	>
		<!-- efek scanline + noise selalu aktif -->
		<div class="fx-layer">
			<div class="scanlines"></div>
			<div class="noise"></div>
			{#if phase === 1}
				<div class="tear"></div>
				<div class="tear delay"></div>
			{/if}
		</div>

		<!-- ===== FASE 0 & 1: LOADING ===== -->
		{#if phase === 0 || phase === 1}
			<div class="load-screen" class:shake={phase === 1}>
				<div class="load-inner">
					<div class="brand">
						<span class="brand-bracket">[</span>
						SYSTEM_INIT
						<span class="brand-bracket">]</span>
					</div>

					<div class="load-log">
						{#each loadLines as line, i (i)}
							<div class="load-line">
								<span class="arrow">›</span>
								{line}
							</div>
						{/each}
						{#if showCursor}<span class="cursor">▋</span>{/if}
					</div>

					<div class="progress-wrap" class:err={phase === 1}>
						<div class="progress-bar" style="width: {progress}%"></div>
					</div>
					<div class="progress-meta">
						<span class="pct">{Math.floor(progress)}%</span>
						<span class="status">
							{#if phase === 1}
								<span class="err-text">▲ FATAL ERROR — connection lost</span>
							{:else}
								fetching payload...
							{/if}
						</span>
					</div>
				</div>
			</div>
		{/if}

		<!-- ===== FASE 2: WHO ARE YOU ===== -->
		{#if phase === 2}
			<div class="who-screen">
				<div class="who-text" class:revealed={whoRevealed}>
					{#each whoChars as ch, i (i)}
						<span class="who-char" class:locked={ch.locked}>{ch.current}</span>
					{/each}
				</div>
				<div class="who-sub" class:show={whoRevealed}>identify yourself</div>
			</div>
		{/if}

		<!-- ===== FASE 3: MASUK SISTEM ===== -->
		{#if phase === 3}
			<div class="system-screen">
				<div class="system-window">
					<div class="win-bar">
						<span class="win-dot red"></span>
						<span class="win-dot yellow"></span>
						<span class="win-dot green"></span>
						<span class="win-title">root@system — secure shell</span>
					</div>
					<div class="system-log">
						{#each systemLines as line, i (i)}
							<div class="system-line {lineClass(line.type)}">{line.text}</div>
						{/each}
						{#if showCursor && !bootComplete}<span class="cursor sys-cursor">▋</span>{/if}
					</div>
				</div>
				<div class="status-bar" class:active={bootComplete}>
					<span class="stat-led"></span>
					<span class="stat-text">
						{bootComplete ? 'CONNECTION SECURE — handshake complete' : 'establishing connection...'}
					</span>
					<span class="stat-time">[ {bootComplete ? '100' : '...'}% ]</span>
				</div>
			</div>

			<!-- flash full-screen sebelum masuk -->
			{#if finalFlash}
				<div class="final-flash">
					<div class="flash-text">ENTERING SYSTEM</div>
				</div>
			{/if}
		{/if}
	</div>
{/if}

<style>
	.loader {
		position: fixed;
		inset: 0;
		z-index: 99999;
		background: #05060a;
		color: #e4e4e7;
		font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.4s ease;
	}

	.loader.phase-error {
		background: #0a0406;
	}
	.loader.phase-who {
		background: #02040a;
	}
	.loader.phase-system {
		background: #04080a;
	}

	/* ===== FX LAYER ===== */
	.fx-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 10;
	}

	.scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent 0,
			transparent 2px,
			rgba(0, 0, 0, 0.25) 2px,
			rgba(0, 0, 0, 0.25) 3px
		);
		opacity: 0.5;
	}

	.noise {
		position: absolute;
		inset: 0;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		animation: noise 0.2s steps(6) infinite;
	}

	@keyframes noise {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(-4%, 4%); }
		50% { transform: translate(4%, -4%); }
		75% { transform: translate(-4%, -4%); }
	}

	.tear {
		position: absolute;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(255, 60, 60, 0.9), transparent);
		animation: tear 0.18s linear infinite;
	}
	.tear.delay {
		animation-delay: 0.09s;
		background: linear-gradient(90deg, transparent, rgba(60, 200, 255, 0.8), transparent);
	}

	@keyframes tear {
		0% { top: -5%; }
		100% { top: 105%; }
	}

	/* ===== FASE 0/1: LOADING ===== */
	.load-screen {
		position: relative;
		z-index: 5;
		width: 100%;
		max-width: 620px;
		padding: 24px;
	}

	.load-inner {
		width: 100%;
	}

	.brand {
		font-size: clamp(14px, 2vw, 18px);
		letter-spacing: 4px;
		color: #34d399;
		margin-bottom: 28px;
		text-shadow: 0 0 12px rgba(52, 211, 153, 0.5);
	}
	.brand-bracket {
		color: #52525b;
	}

	.load-log {
		min-height: 180px;
		font-size: clamp(11px, 1.4vw, 14px);
		line-height: 1.9;
		margin-bottom: 24px;
		color: #a1a1aa;
	}

	.load-line {
		animation: fade-in 0.2s ease;
	}
	.arrow {
		color: #34d399;
		margin-right: 8px;
	}

	.progress-wrap {
		height: 6px;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 12px;
	}
	.progress-wrap.err {
		border-color: #ef4444;
		box-shadow: 0 0 16px rgba(239, 68, 68, 0.4);
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #10b981, #34d399);
		box-shadow: 0 0 10px rgba(52, 211, 153, 0.6);
		transition: width 0.15s ease;
	}
	.phase-error .progress-bar {
		background: linear-gradient(90deg, #dc2626, #ef4444);
		box-shadow: 0 0 10px rgba(239, 68, 68, 0.7);
	}

	.progress-meta {
		display: flex;
		justify-content: space-between;
		font-size: clamp(11px, 1.4vw, 13px);
	}
	.pct {
		color: #34d399;
		font-weight: 600;
	}
	.phase-error .pct {
		color: #ef4444;
	}
	.status {
		color: #52525b;
	}
	.err-text {
		color: #ef4444;
		font-weight: 600;
		animation: blink 0.4s step-end infinite;
	}

	/* getaran / shake saat error */
	.shake {
		animation: shake 0.08s steps(2) infinite;
	}
	@keyframes shake {
		0% { transform: translate(0, 0); }
		25% { transform: translate(-4px, 2px) skewX(0.5deg); }
		50% { transform: translate(4px, -3px) skewX(-0.5deg); }
		75% { transform: translate(-3px, -2px); }
		100% { transform: translate(3px, 3px); }
	}

	/* ===== FASE 2: WHO ARE YOU (Code Lyoko) ===== */
	.who-screen {
		position: relative;
		z-index: 5;
		text-align: center;
		padding: 24px;
	}

	.who-text {
		font-size: clamp(28px, 8vw, 80px);
		font-weight: 700;
		letter-spacing: clamp(2px, 1vw, 10px);
		color: #5e7fff;
		text-shadow:
			0 0 20px rgba(94, 127, 255, 0.7),
			0 0 40px rgba(94, 127, 255, 0.4);
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		animation: who-flicker 0.12s steps(2) infinite;
	}
	.who-text.revealed {
		animation: who-glow 1.8s ease-in-out infinite;
		color: #8aa6ff;
	}

	.who-char {
		display: inline-block;
		min-width: 0.55em;
		color: #3b5bdb;
		transition: color 0.1s ease;
	}
	.who-char.locked {
		color: #8aa6ff;
		text-shadow:
			0 0 18px rgba(138, 166, 255, 0.9),
			0 0 36px rgba(94, 127, 255, 0.5);
	}

	@keyframes who-flicker {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.82; }
	}

	@keyframes who-glow {
		0%, 100% {
			text-shadow:
				0 0 20px rgba(138, 166, 255, 0.7),
				0 0 40px rgba(94, 127, 255, 0.4);
		}
		50% {
			text-shadow:
				0 0 30px rgba(138, 166, 255, 1),
				0 0 60px rgba(94, 127, 255, 0.7);
		}
	}

	.who-sub {
		margin-top: 28px;
		font-size: clamp(12px, 2vw, 16px);
		letter-spacing: 6px;
		color: #3b5bdb;
		opacity: 0;
		transition: opacity 0.6s ease;
	}
	.who-sub.show {
		opacity: 0.8;
		animation: blink 1.2s step-end infinite;
	}

	/* ===== FASE 3: SYSTEM ===== */
	.system-screen {
		position: relative;
		z-index: 5;
		width: 100%;
		max-width: 560px;
		padding: 24px;
	}

	/* window terminal ber-frame */
	.system-window {
		border: 1px solid rgba(16, 185, 129, 0.35);
		border-radius: 10px;
		background: rgba(4, 12, 10, 0.55);
		box-shadow:
			0 0 40px rgba(16, 185, 129, 0.15),
			inset 0 0 60px rgba(16, 185, 129, 0.05);
		overflow: hidden;
		animation: win-in 0.4s ease both;
	}

	@keyframes win-in {
		from { opacity: 0; transform: scale(0.97); }
		to { opacity: 1; transform: scale(1); }
	}

	.win-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		background: rgba(16, 185, 129, 0.08);
		border-bottom: 1px solid rgba(16, 185, 129, 0.2);
	}
	.win-dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		display: inline-block;
	}
	.win-dot.red { background: #ff5f56; }
	.win-dot.yellow { background: #ffbd2e; }
	.win-dot.green { background: #27c93f; }
	.win-title {
		margin-left: 8px;
		font-size: 12px;
		color: #52525b;
		letter-spacing: 1px;
	}

	.system-log {
		font-size: clamp(13px, 1.8vw, 17px);
		line-height: 2.1;
		padding: 18px 20px;
	}

	/* status bar di bawah window */
	.status-bar {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 14px;
		padding: 8px 14px;
		font-size: clamp(11px, 1.4vw, 13px);
		color: #52525b;
		border: 1px solid #27272a;
		border-radius: 6px;
		transition: all 0.3s ease;
	}
	.status-bar.active {
		color: #6ee7b7;
		border-color: rgba(16, 185, 129, 0.4);
		box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
	}
	.stat-led {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #71717a;
		animation: blink 1s step-end infinite;
	}
	.status-bar.active .stat-led {
		background: #10b981;
		box-shadow: 0 0 10px #10b981;
		animation: blink 0.6s step-end infinite;
	}
	.stat-text { flex: 1; }
	.stat-time { font-weight: 600; }

	/* flash full-screen "ENTERING SYSTEM" */
	.final-flash {
		position: absolute;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.18), #02050a 70%);
		animation: flash-in 0.3s ease both;
	}
	.flash-text {
		font-size: clamp(22px, 5vw, 46px);
		font-weight: 800;
		letter-spacing: clamp(4px, 1.5vw, 14px);
		color: #6ee7b7;
		text-shadow:
			0 0 24px rgba(110, 231, 183, 1),
			0 0 60px rgba(16, 185, 129, 0.7);
		animation: flash-text 1s ease both;
	}

	@keyframes flash-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes flash-text {
		0% { opacity: 0; transform: scale(1.3); filter: blur(10px); letter-spacing: 24px; }
		40% { opacity: 1; transform: scale(1); filter: blur(0); }
		100% { opacity: 1; transform: scale(1); }
	}

	.system-line {
		animation: slide-in 0.15s ease;
		white-space: pre-wrap;
	}

	.sys-success {
		color: #10b981;
		font-weight: 700;
		letter-spacing: 3px;
		text-shadow: 0 0 16px rgba(16, 185, 129, 0.6);
		margin-bottom: 8px;
	}
	.sys-ok {
		color: #34d399;
	}
	.sys-dim {
		color: #71717a;
	}
	.sys-welcome {
		margin-top: 18px;
		font-size: 1.35em;
		font-weight: 700;
		letter-spacing: 6px;
		color: #6ee7b7;
		text-shadow:
			0 0 18px rgba(110, 231, 183, 0.9),
			0 0 40px rgba(16, 185, 129, 0.5);
		animation: welcome-in 0.5s ease both, welcome-pulse 1.6s ease-in-out 0.5s infinite;
	}

	@keyframes welcome-in {
		from {
			opacity: 0;
			transform: translateY(10px);
			filter: blur(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	@keyframes welcome-pulse {
		0%, 100% {
			text-shadow:
				0 0 18px rgba(110, 231, 183, 0.9),
				0 0 40px rgba(16, 185, 129, 0.5);
		}
		50% {
			text-shadow:
				0 0 28px rgba(110, 231, 183, 1),
				0 0 64px rgba(16, 185, 129, 0.8);
		}
	}

	/* ===== SHARED ===== */
	.cursor {
		display: inline-block;
		color: #34d399;
		animation: blink 0.8s step-end infinite;
	}
	.sys-cursor {
		color: #10b981;
	}

	@keyframes blink {
		50% { opacity: 0; }
	}
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes slide-in {
		from { opacity: 0; transform: translateX(-12px); }
		to { opacity: 1; transform: translateX(0); }
	}

	@media (max-width: 600px) {
		.load-log { min-height: 150px; }
	}
</style>