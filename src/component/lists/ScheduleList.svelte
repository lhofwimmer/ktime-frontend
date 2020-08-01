<script>
  import { deleteSchedule } from "../../service/userservice";
  import { createEventDispatcher } from "svelte";

  const dateFormatter = new Intl.DateTimeFormat("de-AT");
  const dispatch = createEventDispatcher();

  export let schedules = [];

  async function executeDeleteSchedule(schedule) {
    const success = await deleteSchedule(schedule.uuid);

    if (success) {
      dispatch("deleteschedule", schedule);
    }
  }
</script>

<style>
  th {
    @apply px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider;
  }

  .normal {
    @apply px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500;
  }

  .bold {
    @apply px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900;
  }
</style>

<div class="flex flex-col">
  <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div
      class="align-middle inline-block min-w-full shadow overflow-hidden
      sm:rounded-lg border-b border-gray-200">
      <table class="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Startzeit</th>
            <th>Endzeit</th>
            <th>Datum</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
          </tr>
        </thead>
        <tbody class="bg-white">
          {#each schedules as schedule}
            <tr>
              <td class="bold">
                {schedule.employee.firstname} {schedule.employee.lastname}
              </td>
              <td class="normal">
                {dateFormatter.format(schedule.scheduleStart)}
              </td>
              <td class="normal">
                {dateFormatter.format(schedule.scheduleEnd)}
              </td>
              <!-- TODO -->
              <td class="normal">
                {dateFormatter.format(schedule.scheduleStart)}
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap text-right border-b
                border-gray-200 text-sm leading-5 font-medium cursor-pointer
                select-none">
                <span
                  class="text-indigo-600 hover:text-indigo-900"
                  on:click={executeDeleteSchedule(schedule)}>
                  Löschen
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<nav
  class="px-4 py-3 flex items-center justify-between border-t border-gray-200
  sm:px-6">
  <div class="flex-1 flex justify-between sm:justify-end">
    <span
      class="relative inline-flex items-center px-4 py-2 border border-gray-300
      text-sm leading-5 font-medium rounded-md text-gray-700 bg-white
      hover:text-gray-500 focus:outline-none focus:shadow-outline-blue
      focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition
      ease-in-out duration-150">
      Previous
    </span>
    <span
      class="ml-3 relative inline-flex items-center px-4 py-2 border
      border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700
      bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue
      focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition
      ease-in-out duration-150">
      Next
    </span>
  </div>
</nav>
