<script lang="ts">
  import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	export let organization: any;

	let categories: any;

	onMount(async () => {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

		var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
			constrainWidth: false,
		});

		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
		}
    const response = await fetch(`https://backend.subvind.com/categories/hostname/${hostname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      categories = await response.json();

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
		
				var elems = document.querySelectorAll('.collapsible');
		    var instances = M.Collapsible.init(elems, {});

      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
	})
</script>

<header>
	<nav>
		<div class="nav-wrapper">
			<ul id="slide-out" class="sidenav">
				<nav style="max-height: 64px;">
					<div class="nav-wrapper">
						{#if organization}
							<a href="/" class="brand-logo" style="width: 100%; text-align: center;">{organization.shortName || 'STOREFRONT'}</a>
						{/if}
					</div>
				</nav>
				{#if organization}
					<div class="describe">
						{organization.description}
					</div>
				{/if}
				
				<li><div class="divider"></div></li>
				<li><a class="subheader">Categories</a></li>
				<li class="black-text">
					<ul class="collapsible">
						{#if categories}
							{#each categories.data as category}
								{#if !category.parentCategory}
									<li>
										<div class="collapsible-header">{category.name}</div>
										<div class="collapsible-body">
											{#if category.subCategories}
												{#each category.subCategories as subCategory}
													<li><a class="waves-effect" href={`/categories/${subCategory.slug}`} target="_self"><i class="material-icons">subdirectory_arrow_right</i>{subCategory.name}</a></li>
												{/each}
											{/if}
										</div>
									</li>
								{/if}
							{/each}
						{/if}
					</ul>
				</li>			
				
				<li><div class="divider"></div></li>
				<li><a class="subheader">Menu</a></li>

				<li><a href="#"><i class="material-icons">home</i>Homepage</a></li>
				<li class="active"><a href="/"><i class="material-icons">local_grocery_store</i>Store</a></li>
				<!-- <li><a href="/about"><i class="material-icons">local_library</i>About</a></li> -->
				<li><a href="/contact-center"><i class="material-icons">local_phone</i>Contact Center</a></li>
				
				<li><div class="divider"></div></li>
				<li><a class="subheader">Extra</a></li>
				<li><a class="waves-effect" href="#">Privacy Policy</a></li>
				<li><a class="waves-effect" href="#">Terms & Conditions</a></li>
			</ul>
			{#if organization}
				<a href="#" data-target="slide-out" class="brand-logo sidenav-trigger left"><i class="material-icons">menu</i>{organization.displayName}</a>
			{/if}

			<ul id="nav-mobile" class="right">
				<!-- Dropdown Trigger -->
				<li>
					<div class="logo">
						<img src="/logo.jpg" alt="logo" class="dropdown-trigger" data-target='dropdown1'>
					</div>
				</li>

				<!-- Dropdown Structure -->
				<ul id='dropdown1' class='dropdown-content'>
					{#if organization}
						{#if organization.ebayUser}
							<li><a href={`https://www.ebay.com/usr/${organization.ebayUser}`} target="_blank">ebay.com/usr/{organization.ebayUser}</a></li>
						{/if}
						{#if organization.etsyUser}
							<li><a href={`https://www.etsy.com/usr/${organization.etsyUser}`} target="_blank">etsy.com/usr/{organization.etsyUser}</a></li>
						{/if}
					{/if}
				</ul>
			</ul>
		</div>
	</nav>
</header>


		<!-- <div class="corner">
			<a href="https://kit.svelte.dev">
				<img src={logo} alt="SvelteKit" />
			</a>
		</div>

			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
			</svg>
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">Home</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/about">About</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
					<a href="/sverdle">Sverdle</a>
				</li>
			</ul>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
			</svg>

		<div class="corner">
			<a href="https://github.com/sveltejs/kit">
				<img src={github} alt="GitHub" />
			</a>
		</div> -->


<style>
	.logo {
		max-height: 3.2em;
		width: 3.2em;
		margin: 0.5em;
		border-radius: 10em;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
	}

	.logo img {
    width: auto;
    max-width: 100%;
    object-fit: contain;
	}

	nav .sidenav-trigger {
		display: initial !important;
	}
	
	.describe {
    margin: 0px 0.5em;
    color: rgb(17, 17, 17);
    line-height: 2em;
    text-align: center;
	}

	.collapsible-header {
		height: 3.2em;
		padding: 0 32px;
	}
</style>
