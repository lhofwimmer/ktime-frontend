<script>
  import { createEventDispatcher } from "svelte";
  import { createSchedule } from "../../service/userservice.js";
  import AnnotatedInput from "../AnnotatedInput.svelte";
  import StyledButton from "../StyledButton.svelte";

  const dispatch = createEventDispatcher();

  export let employees = [];
  $: selectList = employees.map((employee) => {
    const obj = {
      id: employee.uuid,
      value: `${employee.firstname} ${employee.lastname}`,
    };
    console.log(obj);
    return obj;
  });

  let schedule = {
    employee: "",
    scheduleStart: new Date(),
    scheduleEnd: new Date(),
  };

  async function dispatchAddSchedule() {
    const response = await createSchedule(schedule);

    if (response !== null) {
      schedule = {
        employee: "",
        startSchedule: new Date(),
        endSchedule: new Date(),
      };
      dispatch("addschedule", schedule);
    }
  }
</script>

<div>
  <AnnotatedInput
    label="Mitarbeiter auswählen"
    type="select"
    selectValues={selectList}
    bind:value={schedule.employee} />
  <AnnotatedInput
    label="Startzeit"
    type="datetime"
    bind:value={schedule.scheduleStart} />
  <AnnotatedInput
    label="Startzeit"
    type="datetime"
    bind:value={schedule.scheduleEnd} />
  <StyledButton buttonStyle="fill" on:click={dispatchAddSchedule}>
    Hinzufügen
  </StyledButton>
</div>
