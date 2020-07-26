<script>
  // import { getEmployees } from "../../service/userservice.js";
  // import { onMount } from "svelte";
  import { link } from "svelte-routing";

  const dateFormatter = new Intl.DateTimeFormat("de-AT");

  export let employees = [];

  // onMount(async () => {
  //   employees = await getEmployees();
  // });

  function navigateToEmployee() {}
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
            <th>Wochenstunden</th>
            <th>Einstiegsdatum</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
          </tr>
        </thead>
        <tbody class="bg-white">
          {#each employees as employee}
            <tr>
              <td class="bold">{employee.firstname} {employee.lastname}</td>
              <td class="normal">{employees.weeklyHours}</td>
              <td class="normal">{dateFormatter.format(employee.entryDate)}</td>
              <td
                class="px-6 py-4 whitespace-no-wrap text-right border-b
                border-gray-200 text-sm leading-5 font-medium">
                <a
                  href="/employee/{employee.uuid}"
                  class="text-indigo-600 hover:text-indigo-900"
                  use:link>
                  Detail
                </a>
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
    <a
      href="#"
      class="relative inline-flex items-center px-4 py-2 border border-gray-300
      text-sm leading-5 font-medium rounded-md text-gray-700 bg-white
      hover:text-gray-500 focus:outline-none focus:shadow-outline-blue
      focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition
      ease-in-out duration-150">
      Previous
    </a>
    <a
      href="#"
      class="ml-3 relative inline-flex items-center px-4 py-2 border
      border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700
      bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue
      focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition
      ease-in-out duration-150">
      Next
    </a>
  </div>
</nav>
