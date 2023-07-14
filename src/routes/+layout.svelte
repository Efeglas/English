<script lang='ts'>
	import '@skeletonlabs/skeleton/themes/theme-sahara.css';	
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faBars, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

	import { AppShell, AppBar, Drawer, drawerStore, Toast } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import Menu from '$lib/UI/menu/Menu.svelte';
	import Settings from '$lib/UI/menu/Settings.svelte';

	let drawerSettings: DrawerSettings;

	const menuClickHandler = () => {
		openDrawerWithId("menu");
	}

	const settingsClickHandler = () => {
		openDrawerWithId("settings", "right");
	}

	const closeDrawer = () => {
		drawerStore.close();
	}

	const openDrawerWithId = (id: string, position: any = "left") => {
		drawerSettings = { id: id, position: position };
		drawerStore.open(drawerSettings);
	}

</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead"><button on:click={menuClickHandler} class="btn bg-initial hover:bg-surface-900"><Fa icon={faBars} /></button></svelte:fragment>
			English
			<svelte:fragment slot="trail"><button on:click={settingsClickHandler} class="btn bg-initial hover:bg-surface-900"><Fa icon={faCog} /></button></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<Drawer>		
		{#if $drawerStore.id === 'menu'}
			<Menu onClick={closeDrawer}/>
		{:else if $drawerStore.id === 'settings'}
			<Settings onClick={closeDrawer}/>
		{/if}
	</Drawer>
	<slot />
	<Toast />
</AppShell>