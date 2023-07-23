<script lang='ts'>
    import Fa from 'svelte-fa/src/fa.svelte';
	import { faTimes, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
    import { LightSwitch, toastStore, type ToastSettings, drawerStore } from '@skeletonlabs/skeleton';
    import {username as storeUsername} from '$lib/stores/user';
	import { goto } from '$app/navigation';

    export let onClick: MouseEventHandler<HTMLButtonElement>;

    const logoutHandler = async () => {
        let response;
            let t: ToastSettings;
            try {
                
                response = await fetch('http://192.168.50.188:7230/api/User/Logout', {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",      
                    },                  
                });

                if (response.status === 200) {              
                    t = {
                        message: 'Successful logout',
                        background: 'variant-filled-success',
                    };
                    storeUsername.set(null);
                    goto("/login");
                    drawerStore.close();
                } else {
                    t = {
                        message: 'Invalid username or password',
                        background: 'variant-filled-error',
                    };
                }
                toastStore.trigger(t);
            } catch (error: any) {
                t = {
                    message: error,
                    background: 'variant-filled-error',
                };
                toastStore.trigger(t);
            }
    }
</script>

<div class="flex justify-start p-6">
    <button on:click={onClick} class="btn bg-initial hover:bg-surface-900"><Fa icon={faTimes} /></button>
</div>
<div class="pr-4 text-right">
    <p>Settings</p>
    <hr>
</div>
<div class="flex flex-col p-4">
    <div class="flex justify-between mb-6">
        <span>Mode</span>
        <LightSwitch />
    </div>
    <button on:click={logoutHandler} class="btn bg-initial hover:bg-surface-900"><Fa class='mr-1' icon={faRightFromBracket} /> Log Out</button>
</div>