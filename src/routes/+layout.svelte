<script lang="ts">
	import { onMount } from 'svelte';

	import Header from '$lib/Header.svelte';

	// custom
	import './styles.css';

	let organization: any;
	let hostname: any;

	onMount(async() => {
		hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
		}
    const response = await fetch(`https://backend.subvind.com/organizations/hostname/${hostname}`, {
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
	<Header organization={organization} />

	<main>
		<slot />
	</main>

	<footer>
		<p style="margin: 0;">
  		{hostname} © {new Date().getFullYear()}.
		</p>
		<p style="margin: 0;">
			powered by <a href="https://subvind.com">subvind</a>
		</p>
	</footer>
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
