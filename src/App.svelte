<script>
  import { Router, Route } from "svelte-routing";

  import Dashboard from "./component/Dashboard.svelte";
  import Login from "./component/Login.svelte";
  import SignUp from "./component/SignUp.svelte";
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<Router>
  <Route path="login" component={Login} />
  <Route path="signup" component={SignUp} />
  <Route path="/*" component={Dashboard} />
</Router>
