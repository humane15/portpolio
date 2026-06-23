<script lang="ts">
	import LoadingScreen from '$lib/LoadingScreen.svelte';
	import InterfaceSelect from '$lib/InterfaceSelect.svelte';
	import Desktop from '$lib/components/Desktop.svelte';
	import { avatar } from '$lib/avatar';

	let stage = $state<'loading' | 'select' | 'portfolio'>('loading');
</script>

{#if stage === 'loading'}
	<LoadingScreen onComplete={() => (stage = 'select')} />
{:else if stage === 'select'}
	<InterfaceSelect onWeb={() => (stage = 'portfolio')} sshHost="ssh.farhanaulianda.my.id" />
{:else if stage === 'portfolio'}
	<Desktop avatar={avatar} />
{/if}