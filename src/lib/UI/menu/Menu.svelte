<script lang='ts'>
    import Fa from 'svelte-fa/src/fa.svelte';
	import { faBook, faChartLine, faFileLines, faHome, faTimes, faTrophy } from '@fortawesome/free-solid-svg-icons';

    export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<div class="flex justify-end p-6">
    <button on:click={onClick} class="btn bg-initial hover:bg-surface-900"><Fa icon={faTimes} /></button>
</div>
<div class="pl-4">
    <p>Menu</p>
    <hr>
</div>			
<div class="flex flex-col p-4">
    <a on:click={onClick} href='/' class="btn bg-initial mb-1 hover:bg-surface-900 justify-start"><Fa class="mr-2" icon={faHome} /> Home</a>
    <a on:click={onClick} href='/dictionary' class="btn bg-initial mb-1 hover:bg-surface-900 justify-start"><Fa class="mr-2" icon={faBook} /> Dictionary</a>
    <a on:click={onClick} href='/test' class="btn bg-initial mb-1 hover:bg-surface-900 justify-start"><Fa class="mr-2" icon={faFileLines} /> Test</a>
    <a on:click={onClick} href='/statistics' class="btn bg-initial mb-1 hover:bg-surface-900 justify-start"><Fa class="mr-2" icon={faChartLine} /> Statistics</a>
    <a on:click={onClick} href='/trophy' class="btn bg-initial mb-1 hover:bg-surface-900 justify-start"><Fa class="mr-2" icon={faTrophy} /> Trophies</a>
</div>