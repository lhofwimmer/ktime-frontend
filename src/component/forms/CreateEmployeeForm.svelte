<script>
  import AnnotatedInput from "../AnnotatedInput.svelte";
  import StyledButton from "../StyledButton.svelte";
  import { createEmployee } from "../../service/userservice";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let employee = {
    firstname: "",
    lastname: "",
    entryDate: new Date(),
    weeklyHours: 0,
  };

  async function dispatchCreateEmployee() {
    let response = await createEmployee(employee);

    if (response !== null) {
      dispatch("createemployee", employee);
    }
  }
</script>

<div>
  <AnnotatedInput label="Vorname" bind:value={employee.firstname} />
  <AnnotatedInput label="Nachname" bind:value={employee.lastname} />
  <AnnotatedInput
    label="Einstiegsdatum"
    bind:value={employee.entryDate}
    type="date" />
  <AnnotatedInput
    label="Wöchentliche Stunden"
    bind:value={employee.weeklyHours} />
  <StyledButton buttonStyle="fill" on:click={dispatchCreateEmployee}>
    Hinzufügen
  </StyledButton>
</div>
