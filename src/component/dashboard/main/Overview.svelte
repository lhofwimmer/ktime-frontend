<script>
  // import CreateEmployeeForm from "../../forms/CreateEmployeeForm.svelte";
  // import CreateScheduleForm from "../../forms/CreateScheduleForm.svelte";
  import EmployeeList from "../../lists/EmployeeList.svelte";
  import ScheduleList from "../../lists/ScheduleList.svelte";
  import { onMount } from "svelte";
  import { getEmployees, getAllSchedules } from "../../../service/userservice";
  import { Shadow } from "svelte-loading-spinners";

  let employees = getEmployees();
  let schedules = getAllSchedules();

  // onMount(async () => {
  //   employees = await getEmployees();
  //   schedules = await getAllSchedules();
  // });

  // function handleAddEmployee(event) {
  //   employees = [...employees, event.detail];
  // }

  // function handleAddSchedule(event) {
  //   schedules = [...schedules, event.detail];
  // }
</script>

<!-- <div class="overflow-y-scroll flex-1">
  <div
    class="flex-none flex flex-col items-center text-center bg-teal-900
    text-gray-400 border-r" />
  
</div> -->

<!-- <div class="row-auto">
    <CreateEmployeeForm on:addemployee={handleAddEmployee} />
  </div> -->
{#await employees}
  <div class="flex justify-center py-4">
    <Shadow size="40" color="#5850ec" unit="px" />
  </div>
{:then result}
  <EmployeeList employees={result} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<!-- <div class="row-auto">
    <CreateScheduleForm {employees} on:addschedule={handleAddEmployee} />
  </div> -->

{#await schedules}
  <div class="flex justify-center py-4">
    <Shadow size="40" color="#5850ec" unit="px" />
  </div>
{:then result}
  <ScheduleList schedules={result} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
