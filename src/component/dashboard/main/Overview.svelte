<script>
  // import CreateEmployeeForm from "../../forms/CreateEmployeeForm.svelte";
  // import CreateScheduleForm from "../../forms/CreateScheduleForm.svelte";
  import EmployeeList from "../../lists/EmployeeList.svelte";
  import ScheduleList from "../../lists/ScheduleList.svelte";
  import { onMount } from "svelte";
  import { getEmployees, getAllSchedules } from "../../../service/userservice";

  let employees = [];
  let schedules = [];

  onMount(async () => {
    employees = await getEmployees();
    schedules = await getAllSchedules();
  });

  // function handleAddEmployee(event) {
  //   employees = [...employees, event.detail];
  // }

  // function handleAddSchedule(event) {
  //   schedules = [...schedules, event.detail];
  // }
</script>

<div class="overflow-y-scroll flex-1">
  <div
    class="flex-none flex flex-col items-center text-center bg-teal-900
    text-gray-400 border-r" />
  <!-- <div class="row-auto">
    <CreateEmployeeForm on:addemployee={handleAddEmployee} />
  </div> -->

  <div class="row-auto">
    <EmployeeList {employees} />
  </div>

  <!-- <div class="row-auto">
    <CreateScheduleForm {employees} on:addschedule={handleAddEmployee} />
  </div> -->

  <div class="row-auto">
    <ScheduleList {schedules} />
  </div>
</div>
