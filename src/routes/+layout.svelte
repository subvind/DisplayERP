<script lang="ts">
	import { onMount } from 'svelte';

  import { HeaderERP } from "subvind-components"

	// custom
	import './styles.css';

	let organization: any;
	let erpHostname: any = '';

	onMount(async() => {
		erpHostname = window.location.hostname
		if (erpHostname === 'localhost') {
			erpHostname = 'store.subvind.com'
		}
    const response = await fetch(`https://api.subvind.com/organizations/erpHostname/${erpHostname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
	})
</script>

<div class="app">
	{#if organization}
		<HeaderERP organization={organization} />
	{:else}
		<nav class="grey darken-3">
			<div class="nav-wrapper">
			</div>
		</nav>
	{/if}

	<main>
		<slot />
	</main>

	{#if organization}
		<footer>
			<p style="margin: 0;">
				{erpHostname} © {new Date().getFullYear()}.
			</p>
			{#if organization.isBranding}
				<p style="margin: 0;">
					powered by <a href="https://subvind.com">subvind</a>
				</p>
			{/if}
		</footer>
	{/if}
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	
	main {
		overflow: hidden;
	}
	
	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
