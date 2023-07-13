<script lang='ts'>
    import Fa from 'svelte-fa/src/fa.svelte';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
    import { LightSwitch } from '@skeletonlabs/skeleton';

    export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<div class="flex justify-start p-6">
    <button on:click={onClick} class="btn bg-initial hover:bg-surface-900"><Fa icon={faTimes} /></button>
</div>
<div class="pr-4 text-right">
    <p>Settings</p>
    <hr>
</div>
<div class="flex flex-col p-4">
    <div class="flex justify-between">
        <span>Mode</span>
        <LightSwitch />
    </div>
</div>