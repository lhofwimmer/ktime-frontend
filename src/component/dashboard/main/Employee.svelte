<script>
  import { onMount } from "svelte";
  import { Shadow } from "svelte-loading-spinners";
  import { getSchedules, getEmployee } from "../../../service/userservice";

  import ScheduleList from "../../lists/ScheduleList.svelte";

  import EditIcon from "../../icons/Edit.svelte";
  import AddScheduleIcon from "../../icons/AddSchedule.svelte";
  import CreateScheduleModal from "../../forms/CreateScheduleModal.svelte";

  export let id;
  let offset = 0;

  let schedules = [];
  let employee = getEmployee(id);

  let showCreateScheduleForm = false;

  function addSchedule(schedule) {
    schedules = [...schedules, schedule.detail];
  }

  async function awaitSchedules() {
    schedules = await getSchedules(id, 20, offset);
  }
</script>

{#await employee}
  <div class="flex justify-center py-4">
    <Shadow size="40" color="#5850ec" unit="px" />
  </div>
{:then result}
  <div class="lg:flex lg:items-center lg:justify-between">
    <div class="flex-1 min-w-0">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl
        sm:leading-9 sm:truncate">
        {result.firstname} {result.lastname}
      </h2>
    </div>
    <div class="mt-5 flex lg:mt-0 lg:ml-4">
      <span class="hidden sm:block ml-3 shadow-sm rounded-md">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-gray-300
          text-sm leading-5 font-medium rounded-md text-gray-700 bg-white
          hover:text-gray-500 focus:outline-none focus:shadow-outline-blue
          focus:border-blue-300 active:text-gray-800 active:bg-gray-50
          active:text-gray-800 transition duration-150 ease-in-out">
          <div class="-ml-1 h-5 w-5 text-gray-500">
            <EditIcon />
          </div>
          Edit
        </button>
      </span>

      <span class="sm:ml-3 shadow-sm rounded-md">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent
          text-sm leading-5 font-medium rounded-md text-white bg-indigo-600
          hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo
          focus:border-indigo-700 active:bg-indigo-700 transition duration-150
          ease-in-out"
          on:click={() => (showCreateScheduleForm = true)}>
          <div class="-ml-1 h-5 w-5">
            <AddScheduleIcon />
          </div>
          Add Schedule
        </button>
      </span>
    </div>
  </div>

  {#if showCreateScheduleForm}
    <CreateScheduleModal
      employee={result}
      show={showCreateScheduleForm}
      on:close={() => (showCreateScheduleForm = false)}
      on:addschedule={addSchedule} />
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<div class="py-5" />
{#await awaitSchedules()}
  <div class="flex justify-center py-4">
    <Shadow size="40" color="#5850ec" unit="px" />
  </div>
{:then result}
  <ScheduleList {schedules} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
