<script>
  import { user } from "../store/stores.js";
  import { getUser } from "../service/userservice";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Router, Route, links } from "svelte-routing";

  import Employee from "./dashboard/main/Employee.svelte";
  import Schedule from "./dashboard/main/Schedule.svelte";
  import Overview from "./dashboard/main/Overview.svelte";
  import EmployeeList from "./lists/EmployeeList.svelte";
  import ScheduleList from "./lists/ScheduleList.svelte";

  import EmployeeIcon from "./icons/Employees.svelte";
  import HomeIcon from "./icons/Home.svelte";
  import SchedulesIcon from "./icons/Schedules.svelte";
  import BurgerIcon from "./icons/Burger.svelte";
  import SearchIcon from "./icons/Search.svelte";
  import BellIcon from "./icons/Bell.svelte";

  let mobileMenuOpen = false;
  let profileMenuOpen = false;

  let currentActiveTab = "dashboard";

  onMount(async () => {
    if ($user === null) {
      user.set(await getUser());
    }
  });
</script>

<style>
  .tab-mobile {
    @apply mt-1 flex items-center px-2 py-2 text-base leading-6
              font-medium rounded-md text-gray-300 transition ease-in-out duration-150;
  }

  .tab-mobile:hover {
    @apply bg-gray-700 text-white;
  }

  .tab-mobile:focus {
    @apply bg-gray-700 outline-none text-white;
  }

  .tab-mobile.active {
    @apply flex items-center px-2 py-2 text-base leading-6
              font-medium rounded-md text-white bg-gray-900 transition ease-in-out duration-150;
  }

  .tab-mobile.active:focus {
    @apply bg-gray-700 outline-none;
  }

  .tab {
    @apply mt-1 flex items-center px-2 py-2 text-sm leading-5
            font-medium text-gray-300 rounded-md transition ease-in-out duration-150;
  }

  .tab:hover {
    @apply bg-gray-700 text-white;
  }

  .tab:focus {
    @apply bg-gray-700 text-white outline-none;
  }

  .tab.active {
    @apply flex items-center px-2 py-2 text-sm leading-5
            font-medium text-white rounded-md bg-gray-900 transition ease-in-out duration-150;
  }

  .tab.active:focus {
    @apply bg-gray-700 outline-none;
  }
</style>

<div class="h-screen flex overflow-hidden bg-gray-100">
  <!-- Off-canvas menu for mobile -->
  <div class="md:hidden" style={mobileMenuOpen ? '' : 'display: none;'}>
    <div class="fixed inset-0 flex z-40">
      <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div
        class="fixed inset-0 transition-opacity ease-linear duration-300 {mobileMenuOpen ? 'opacity-100' : 'opacity-0'}"
        on:click={() => (mobileMenuOpen = false)}>
        <div class="absolute inset-0 bg-gray-600 opacity-75" />
      </div>
      <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
      <div
        class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4
        bg-gray-800 transition ease-in-out duration-300 transform {mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}">
        <div class="absolute top-0 right-0 -mr-14 p-1">
          <button
            class="flex items-center justify-center h-12 w-12 rounded-full
            focus:outline-none focus:bg-gray-600"
            aria-label="Close sidebar"
            on:click={() => (mobileMenuOpen = false)}>
            <BurgerIcon />
          </button>
        </div>
        <div class="flex-shrink-0 flex items-center px-4">
          <img
            class="h-8 w-auto"
            src="/img/logos/workflow-logo-on-dark.svg"
            alt="Workflow" />
        </div>
        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="px-2" use:links>
            <a
              href="/"
              on:click={() => (currentActiveTab = 'dashboard')}
              class="group tab-mobile"
              class:active={currentActiveTab === 'dashboard'}>
              <HomeIcon />
              Dashboard
            </a>
            <a
              href="/employees"
              on:click={() => (currentActiveTab = 'employees')}
              class="group tab-mobile"
              class:active={currentActiveTab === 'employees'}>
              <EmployeeIcon />
              Employees
            </a>
            <a
              href="/schedules"
              on:click={() => (currentActiveTab = 'schedules')}
              class="group tab-mobile"
              class:active={currentActiveTab === 'schedules'}>
              <SchedulesIcon />
              Schedules
            </a>
          </nav>
        </div>
      </div>
      <div class="flex-shrink-0 w-14">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
        <img
          class="h-8 w-auto"
          src="/img/logos/workflow-logo-on-dark.svg"
          alt="Workflow" />
      </div>
      <div class="h-0 flex-1 flex flex-col overflow-y-auto">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <nav class="flex-1 px-2 py-4 bg-gray-800" use:links>
          <a
            href="/"
            on:click={() => (currentActiveTab = 'dashboard')}
            class="group tab"
            class:active={currentActiveTab === 'dashboard'}>
            <HomeIcon />
            Dashboard
          </a>
          <a
            href="/employees"
            on:click={() => (currentActiveTab = 'employees')}
            class="group tab"
            class:active={currentActiveTab === 'employees'}>
            <EmployeeIcon />
            Employees
          </a>
          <a
            href="/schedules"
            on:click={() => (currentActiveTab = 'schedules')}
            class="group tab"
            class:active={currentActiveTab === 'schedules'}>
            <SchedulesIcon />
            Schedules
          </a>
        </nav>
      </div>
    </div>
  </div>

  <!-- Content and search -->
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none
        focus:bg-gray-100 focus:text-gray-600 md:hidden"
        aria-label="Open sidebar"
        on:click={() => (mobileMenuOpen = true)}>
        <svg
          class="h-6 w-6"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      <div class="flex-1 px-4 flex justify-between">
        <div class="flex-1 flex">
          <div class="w-full flex md:ml-0">
            <label for="search_field" class="sr-only">Search</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600">
              <div
                class="absolute inset-y-0 left-0 flex items-center
                pointer-events-none">
                <SearchIcon />
              </div>
              <input
                id="search_field"
                class="block w-full h-full pl-8 pr-3 py-2 rounded-md
                text-gray-900 placeholder-gray-500 focus:outline-none
                focus:placeholder-gray-400 sm:text-sm"
                placeholder="Search"
                type="search" />
            </div>
          </div>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <button
            class="p-1 text-gray-400 rounded-full hover:bg-gray-100
            hover:text-gray-500 focus:outline-none focus:shadow-outline
            focus:text-gray-500"
            aria-label="Notifications">
            <BellIcon />
          </button>

          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button
                class="max-w-xs flex items-center text-sm rounded-full
                focus:outline-none focus:shadow-outline"
                id="user-menu"
                aria-label="User menu"
                aria-haspopup="true">
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" />
              </button>
            </div>
            <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md
              shadow-lg transition ease-in-out duration-75 {mobileMenuOpen ? 'transform opacity-0 scale-95' : ' transform opacity-100 scale-100'}">
              <div
                class="py-1 rounded-md bg-white shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu">
                <a
                  href="/"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                  transition ease-in-out duration-150"
                  role="menuitem">
                  Your Profile
                </a>
                <a
                  href="/"
                  zp
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                  transition ease-in-out duration-150"
                  role="menuitem">
                  Settings
                </a>
                <a
                  href="/"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                  transition ease-in-out duration-150"
                  role="menuitem">
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main
      class="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
      tabindex="0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <!-- Replace with your content -->
        <Router>
          <Route path="employee/:id" let:params>
            <Employee id={params.id} />
          </Route>
          <Route path="schedule/:id" let:params>
            <Schedule employeeId={params.employeeId} />
          </Route>
          <Route path="/*" component={Overview} />
          <Route path="schedules" component={ScheduleList} />
          <Route path="employees" component={EmployeeList} />
        </Router>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</div>
