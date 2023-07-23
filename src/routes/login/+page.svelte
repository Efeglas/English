<script lang='ts'>
    
    import { Validator } from '$lib/helpers/Validator';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    import {username as storeUsername} from '$lib/stores/user';
	import { goto } from '$app/navigation';
    import { invalidate } from '$app/navigation';
    
    let username = "";
    let password = "";

    let usernameTouched = false;
    let passwordTouched = false;
    
    $: usernameValid = Validator.notEmpty(username);
    $: passwordValid = Validator.notEmpty(password);

    $: usernameHasNoError = !usernameTouched || (usernameTouched && usernameValid);
    $: passwordHasNoError = !passwordTouched || (passwordTouched && passwordValid);

    $: usernameInputClass = usernameHasNoError ? "input" : "input input-error";
    $: passwordInputClass = passwordHasNoError ? "input" : "input input-error";

    const usernameTouchedHandler = () => {
        usernameTouched = true;
    }

    const passwordTouchedHandler = () => {
        passwordTouched = true;
    }

    const submitLogin = async () => { 

        usernameTouchedHandler();
        passwordTouchedHandler();

        if (usernameValid && passwordValid) {
            
            let response;
            let t: ToastSettings;
            try {
                
                response = await fetch('http://192.168.50.188:7230/api/User/Login', {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",      
                    },
                    body: JSON.stringify({username: username, password: password})
                });

                if (response.status === 200) {              
                    t = {
                        message: 'Successful login',
                        background: 'variant-filled-success',
                    };
                    storeUsername.set(username);
                    goto("/");
                } else {
                    t = {
                        message: 'Invalid username or password',
                        background: 'variant-filled-error',
                    };
                }
                toastStore.trigger(t);
            } catch (error) {
                t = {
                    message: error,
                    background: 'variant-filled-error',
                };
                toastStore.trigger(t);
            }
           
        } else {
            const t: ToastSettings = {
                message: 'All fields must be filled',
                background: 'variant-filled-error',
            };
            toastStore.trigger(t);
        }
    }

    const enterPresshandler = (event) => {
        if (event.keyCode === 13) {
            submitLogin();
        }
    }

</script>

<div class="w-full flex justify-center mt-20">
    <div class="card p-4 w-9/10">
        <h1 class="text-center">Log In</h1>
        <label class="label">
            <span>Username</span>
            <input bind:value={username} on:input={usernameTouchedHandler} on:blur={usernameTouchedHandler} on:keydown={enterPresshandler} class={usernameInputClass} type="text" placeholder="Username..." />
        </label>
        <label class="label">
            <span>Password</span>
            <input bind:value={password} on:input={passwordTouchedHandler} on:blur={passwordTouchedHandler} on:keydown={enterPresshandler} class={passwordInputClass} type="password" placeholder="Password..." />
        </label>
        <div class="flex justify-center mt-6">
            <button on:click={submitLogin} type="button" class="btn variant-filled">Log In</button>
        </div>
        <p class="text-center mt-2">I don't have an account! <a href="/register" class="no-underline hover:underline font-bold">Register</a></p>
    </div>
</div>