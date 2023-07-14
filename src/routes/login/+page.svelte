<script lang='ts'>

    import { Validator } from '$lib/helpers/Validator';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    
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
            //todo
            console.log(`SUBMIT: U: ${username} P: ${password}`);

            let response = await fetch('https://localhost:7230/api/User/Login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username, password: password})
            });
            const result = await response.json();
            console.log(result);

            const t: ToastSettings = {
                message: 'Successful login',
                background: 'variant-filled-success',
            };
            toastStore.trigger(t);
        } else {
            const t: ToastSettings = {
                message: 'All fields must be filled',
                background: 'variant-filled-error',
            };
            toastStore.trigger(t);
        }
    }

</script>

<div class="w-full flex justify-center mt-20">
    <div class="card p-4 w-9/10">
        <h1 class="text-center">Log In</h1>
        <label class="label">
            <span>Username</span>
            <input bind:value={username} on:input={usernameTouchedHandler} on:blur={usernameTouchedHandler} class={usernameInputClass} type="text" placeholder="Username..." />
        </label>
        <label class="label">
            <span>Password</span>
            <input bind:value={password} on:input={passwordTouchedHandler} on:blur={passwordTouchedHandler} class={passwordInputClass} type="password" placeholder="Password..." />
        </label>
        <div class="flex justify-center mt-6">
            <button on:click={submitLogin} type="button" class="btn variant-filled">Log In</button>
        </div>
    </div>
</div>