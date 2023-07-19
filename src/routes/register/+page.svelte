<script lang='ts'>
	import { Validator } from "$lib/helpers/Validator";
    import { ProgressBar } from '@skeletonlabs/skeleton';

    let username = "";
    let password = "";
    let repassword = "";

    let usernameTouched = false;
    let passwordTouched = false;
    let repasswordTouched = false;
    
    $: usernameValid = Validator.notEmpty(username);
    $: passwordValid = Validator.password(password);
    $: repasswordValid = Validator.password(repassword);

    $: passPartials = Validator.passwordPartial(password);
    $: passStrength = passPartials.reduce((a, c) => {
        return c ? a + 1 : a;
    }, 0);

    $: usernameHasNoError = !usernameTouched || (usernameTouched && usernameValid);
    $: passwordHasNoError = !passwordTouched || (passwordTouched && passwordValid);
    $: repasswordHasNoError = !repasswordTouched || (repasswordTouched && repasswordValid);

    $: usernameInputClass = usernameHasNoError ? "input" : "input input-error";
    $: passwordInputClass = passwordHasNoError ? "input" : "input input-error";
    $: repasswordInputClass = repasswordHasNoError ? "input" : "input input-error";

    const usernameTouchedHandler = () => {
        usernameTouched = true;
    }

    const passwordTouchedHandler = () => {
        passwordTouched = true;
    }

    const repasswordTouchedHandler = () => {
        repasswordTouched = true;
    }

    const submitRegister = () => {
        //todo
        if (usernameValid && passwordValid && repasswordValid) {
            
        }

        if (passwordValid == repasswordValid) {
            
        }
    }
    
    const enterPresshandler = (event) => {
        if (event.keyCode === 13) {
            submitRegister();
        }
    }



</script>

<div class="w-full flex justify-center mt-20">
    <div class="card p-4 w-10/12">
        <h1 class="text-center">Register</h1>
        <label class="label">
            <span>Username</span>
            <input bind:value={username} on:input={usernameTouchedHandler} on:blur={usernameTouchedHandler} on:keydown={enterPresshandler} class={usernameInputClass} type="text" placeholder="Username..." />
        </label>
        <label class="label">
            <span>Password</span>
            <input bind:value={password} on:input={passwordTouchedHandler} on:blur={passwordTouchedHandler} on:keydown={enterPresshandler} class={passwordInputClass} type="password" placeholder="Password..." />
        </label>
        <div class="flex justify-center">
            <div class="w-10/12">
                <ProgressBar class="mt-2" meter={passStrength === 3 ? "bg-green-500" : "bg-green-50"} label="Progress Bar" value={passStrength} min={0} max={3} />
                <div class="bg-surface-900 mt-2 p-1 rounded-lg">   
                    <p class={`text-slate-50 ${passPartials[0] && "opacity-20"}`}>At least 8 characters</p>
                    <p class={`text-slate-50 ${passPartials[1] && "opacity-20"}`}>At least one number</p>
                    <p class={`text-slate-50 ${passPartials[2] && "opacity-20"}`}>At least one uppercase character</p>
                </div>
            </div>
        </div>
        <label class="label">
            <span>Re-Enter Password</span>
            <input  bind:value={repassword} on:input={repasswordTouchedHandler} on:blur={repasswordTouchedHandler} on:keydown={enterPresshandler} class={repasswordInputClass} type="password" placeholder="Password..." />
        </label>
        <div class="flex justify-center mt-6">
            <button on:click={submitRegister} type="button" class="btn variant-filled">Register</button>
        </div>
        <p class="text-center mt-2">I have an account! <a href="/login" class="no-underline hover:underline font-bold">Log In</a></p>
    </div>
</div>