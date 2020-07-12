<script>
  import AnnotatedInput from "./AnnotatedInput.svelte";
  import StyledButton from "./StyledButton.svelte";
  import { links, navigate } from "svelte-routing";
  import { signup, getUser } from "../service/userservice";
  import { authToken, user } from "../store/stores";

  let email = "";
  let password = "";
  let firstname = "";
  let lastname = "";

  async function trySignUp() {
    const signupAttempt = await signup(email, password, firstname, lastname);

    if (signupAttempt.success) {
      authToken.set(signupAttempt.token);

      user.set(await getUser());
      if ($user !== null) {
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
    <AnnotatedInput label="Vorname" bind:value={firstname} />
    <AnnotatedInput label="Nachname" bind:value={lastname} />
    <AnnotatedInput label="Passwort" bind:value={password} type="password" />
    <StyledButton on:click={trySignUp} buttonStyle="fill">
      Registrieren
    </StyledButton>
    <div class="pt-1 w-full flex justify-center" use:links>
      <StyledButton href="/login">Login</StyledButton>
    </div>
  </div>
</div>
