<script>
  import AnnotatedInput from "./AnnotatedInput.svelte";
  import StyledButton from "./StyledButton.svelte";
  import { login, getUser } from "../service/userservice.js";
  import { links, navigate } from "svelte-routing";
  import { authToken, user } from "../store/stores";

  let email = "";
  let password = "";

  async function tryLogin() {
    let loginAttempt = await login(email, password);
    console.log(loginAttempt);

    if (loginAttempt.success) {
      console.log("login succesful");

      authToken.set(loginAttempt.token);

      user.set(await getUser());
      if ($user !== null) {
        console.log("navigatin to dashboard");

        navigate("/");
      }
    }
  }
</script>

<div class="flex flex-col justify-center bg-indigo-300 h-screen">
  <div
    class="w-full max-w-sm mx-auto flex flex-col p-10 bg-white rounded-lg
    shadow-xl">
    <AnnotatedInput label="Email" bind:value={email} />
    <AnnotatedInput label="Passwort" bind:value={password} type="password" />
    <StyledButton on:click={tryLogin} buttonStyle="fill">Login</StyledButton>
    <div class="pt-1 w-full flex justify-center" use:links>
      <StyledButton href="/signup">Registrieren</StyledButton>
    </div>
  </div>
</div>
