<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { createSchedule } from "../../service/userservice.js";

  import AddScheduleIcon from "../icons/AddSchedule.svelte";
  import AnnotatedInput from "../AnnotatedInput.svelte";

  const dispatch = createEventDispatcher();
  export let employee;
  export let show = false;

  function close() {
    show = false;
    dispatch("close", show);
  }

  let schedule = {
    employee: employee.uuid,
    scheduleStart: new Date(),
    scheduleEnd: new Date(),
  };

  async function dispatchAddSchedule() {
    const response = await createSchedule(schedule);

    if (response !== null) {
      // schedule = {
      //   employee,
      //   startSchedule: new Date(),
      //   endSchedule: new Date(),
      // };
      dispatch("addschedule", response);
    }
  }
</script>

<div
  class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:items-center
  sm:justify-center {show ? 'sm:flex' : 'hidden'}">
  <!--
      Background overlay, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
  <div class="fixed inset-0 transition-opacity" on:click={close}>
    <div class="absolute inset-0 bg-gray-600 opacity-75" />
  </div>

  <!--
      Modal panel, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
  <div
    class="bg-white rounded-lg overflow-hidden shadow-xl transform
    transition-all sm:max-w-lg sm:w-full"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex-shrink-0 flex items-center justify-center h-12
          w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
          <div class="h-6 w-6 text-purple-600">
            <AddScheduleIcon />
          </div>

        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
          <h3
            class="text-lg leading-6 font-medium text-gray-900"
            id="modal-headline">
            Add Schedule
          </h3>
          <div class="mt-2">
            <AnnotatedInput
              label="Startzeit"
              type="datetime"
              bind:value={schedule.scheduleStart} />
            <AnnotatedInput
              label="Startzeit"
              type="datetime"
              bind:value={schedule.scheduleEnd} />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button
          type="button"
          class="inline-flex justify-center w-full rounded-md border
          border-transparent px-4 py-2 bg-purple-600 text-base leading-6
          font-medium text-white shadow-sm hover:bg-purple-500
          focus:outline-none focus:border-purple-700 focus:shadow-outline-red
          transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          on:click={dispatchAddSchedule}>
          Add Schedule
        </button>
      </span>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button
          type="button"
          class="inline-flex justify-center w-full rounded-md border
          border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium
          text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none
          focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out
          duration-150 sm:text-sm sm:leading-5"
          on:click={close}>
          Cancel
        </button>
      </span>
    </div>
  </div>
</div>
