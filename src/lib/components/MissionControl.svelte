<script lang="ts">
	import { onMount } from 'svelte';

	// Subtle live data — disciplined, not everything moving at once.
	let accuracy = $state(96.4);
	let reqCount = $state(1284);
	let threats = $state(0);
	let logIndex = $state(0);

	const secLog = [
		'ufw: connection allowed :443',
		'fail2ban: 0 active bans',
		'tls: handshake ok (ECDHE)',
		'audit: no anomalies detected',
		'osint: passive recon idle'
	];

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;

		const a = setInterval(() => {
			accuracy = +(95.6 + Math.random() * 2.6).toFixed(1);
		}, 2200);
		const r = setInterval(() => {
			reqCount += Math.floor(Math.random() * 7);
		}, 1500);
		const t = setInterval(() => {
			threats = Math.random() > 0.85 ? 1 : 0;
		}, 3400);
		const l = setInterval(() => {
			logIndex = (logIndex + 1) % secLog.length;
		}, 2600);

		return () => {
			clearInterval(a);
			clearInterval(r);
			clearInterval(t);
			clearInterval(l);
		};
	});
</script>

<div class="mc-layer" aria-hidden="true">
	<!-- Cloud / DevOps -->
	<article class="widget mc-card w-cloud">
		<header><span class="status ok"></span> CLOUD · DEPLOY</header>
		<div class="flow">
			<span class="node">VPC</span>
			<span class="wire"><i class="packet"></i></span>
			<span class="node">EC2</span>
			<span class="wire"><i class="packet packet-2"></i></span>
			<span class="node">S3</span>
		</div>
		<footer>
			<span class="badge ok">● live</span>
			<span class="metric">{reqCount.toLocaleString()} req/min</span>
		</footer>
	</article>

	<!-- Security -->
	<article class="widget mc-card w-sec">
		<header>
			<span class="status {threats ? 'warn' : 'ok'}"></span>
			THREAT FEED · {threats ? 'INSPECTING' : 'SECURE'}
		</header>
		<ul class="log">
			{#each secLog as line, i (line)}
				<li class:active={i === logIndex}>
					<span class="ts">[{(i + 1).toString().padStart(2, '0')}]</span>
					{line}
				</li>
			{/each}
		</ul>
	</article>

	<!-- AI / ML -->
	<article class="widget mc-card w-ai">
		<header><span class="status ok"></span> MODEL · MobileNet</header>
		<p class="run">status: <span class="teal">running</span> · transfer-learning</p>
		<div class="bar">
			<span class="fill" style="width:{accuracy}%"></span>
		</div>
		<footer><span class="metric">val_accuracy</span><span class="teal">{accuracy}%</span></footer>
	</article>

	<!-- Dev terminal -->
	<article class="widget mc-card w-dev">
		<header><span class="status ok"></span> ~/arhamy · git</header>
		<pre class="term">$ git log --oneline -4
<span class="hash">1a2c9f</span> feat: deploy via nginx + pm2
<span class="hash">8b41de</span> fix: open-graph dinamis
<span class="hash">c77a02</span> perf: drizzle atomic tx
<span class="hash">e90b15</span> init: arhamy os<span class="cursor">▌</span></pre>
	</article>
</div>

<style>
	.mc-layer {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
	}
	.widget {
		position: absolute;
		width: 230px;
		padding: 12px 14px;
		font-family: var(--font-mono);
		opacity: 0.92;
	}
	.w-cloud {
		top: 84px;
		left: 96px;
	}
	.w-sec {
		top: 120px;
		right: 40px;
	}
	.w-ai {
		bottom: 70px;
		left: 110px;
	}
	.w-dev {
		bottom: 56px;
		right: 40px;
		width: 270px;
	}

	header {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 10.5px;
		letter-spacing: 1px;
		color: var(--muted);
		margin-bottom: 10px;
	}
	.status {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex: none;
	}
	.status.ok {
		background: var(--teal);
		box-shadow: 0 0 8px var(--teal);
	}
	.status.warn {
		background: var(--amber);
		box-shadow: 0 0 8px var(--amber);
	}

	/* Cloud flow */
	.flow {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.node {
		font-size: 11px;
		color: var(--ink);
		padding: 4px 8px;
		border: 1px solid var(--line);
		border-radius: 7px;
		background: var(--surface-2);
	}
	.wire {
		position: relative;
		flex: 1;
		height: 2px;
		background: var(--line-strong);
		border-radius: 2px;
		overflow: hidden;
	}
	.packet {
		position: absolute;
		top: -1px;
		left: 0;
		width: 8px;
		height: 4px;
		border-radius: 2px;
		background: var(--teal);
		box-shadow: 0 0 6px var(--teal);
		animation: flow 2.4s linear infinite;
	}
	.packet-2 {
		animation-delay: 1.2s;
	}
	@keyframes flow {
		from {
			left: -10px;
		}
		to {
			left: 100%;
		}
	}
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 12px;
		font-size: 11px;
	}
	.badge.ok {
		color: var(--teal);
	}
	.metric {
		color: var(--muted);
	}
	.teal {
		color: var(--teal);
	}

	/* Security log */
	.log {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 3px;
		font-size: 10.5px;
	}
	.log li {
		color: var(--faint);
		transition: color 0.3s ease;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.log li.active {
		color: var(--ink);
	}
	.log .ts {
		color: var(--teal-dim);
		margin-right: 6px;
	}

	/* AI bar */
	.run {
		margin: 0 0 10px;
		font-size: 11px;
		color: var(--muted);
	}
	.bar {
		height: 6px;
		border-radius: 6px;
		background: var(--surface-3);
		overflow: hidden;
	}
	.fill {
		display: block;
		height: 100%;
		border-radius: 6px;
		background: linear-gradient(90deg, var(--teal-dim), var(--teal));
		transition: width 0.8s ease;
	}

	/* Dev terminal */
	.term {
		margin: 0;
		font-size: 10.5px;
		line-height: 1.65;
		color: var(--muted);
		white-space: pre-wrap;
		word-break: break-word;
	}
	.hash {
		color: var(--teal);
	}
	.cursor {
		color: var(--teal);
		animation: blink 1s step-end infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	/* Hide the atmosphere on smaller screens — keep hero clean */
	@media (max-width: 1180px) {
		.w-cloud,
		.w-ai {
			left: 24px;
		}
		.w-sec,
		.w-dev {
			right: 24px;
		}
	}
	@media (max-width: 980px) {
		.mc-layer {
			display: none;
		}
	}
</style>
