<script lang="ts">
	import { onMount } from "svelte";

	let organization: any;

	onMount(async () => {
		let erpHostname = window.location.hostname
		if (erpHostname === 'localhost') {
			erpHostname = 'store.subvind.com'
		}

    const responseOrg = await fetch(`https://api.subvind.com/organizations/erpHostname/${erpHostname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      organization = await responseOrg.json();
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }

		// @ts-ignore
		gtag('event', 'pageview', {
			'organizationId': organization.id
		});
	})
</script>

<svelte:head>
	{#if organization}
		<title>Privacy Policy - {organization.displayName}</title>
	{/if}
	<meta name="description" content="About this app" />
</svelte:head>

<nav class="breadcrumbs black">
  <div class="container">
    <div class="nav-wrapper">
      <div class="col s12">
        <a href="/" class="breadcrumb">Home</a>
				<a href="/privacy-policy" class="breadcrumb">Privacy Policy</a>
      </div>
    </div>
  </div>
</nav>

<div class="container">
	<h4>Privacy Policy</h4>

	{#if organization}
		<p>
			{organization.privacyPolicy}
		</p>
	{:else}
		<p>loading...</p>
	{/if}
</div>
