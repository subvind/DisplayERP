<script lang="ts">
  import { onMount } from "svelte";

  import SubCategories from "$lib/SubCategories.svelte";

  export let data: any;
  let category: any;
  let organization: any;

	onMount(async() => {
		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
		}
    
    const responseOrg = await fetch(`https://backend.subvind.com/organizations/hostname/${hostname}`, {
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

    const response = await fetch(`https://backend.subvind.com/categories/slug/${data.categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      category = await response.json();

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
	})
</script>

<nav class="breadcrumbs black">
  <div class="container">
    <div class="nav-wrapper">
      <div class="col s12">
        <a href="/" class="breadcrumb">Home</a>
        {#if organization}
          <a href="/categories" class="breadcrumb">{organization.categoriesName}</a>
        {/if}
        {#if category}
          {#if category.parentCategory}
            <a href={`/categories/${category.parentCategory.slug}`} target="_self" class="breadcrumb">{category.parentCategory.name}</a>
          {/if}
          <a href={`/categories/${category.slug}`} target="_self" class="breadcrumb">{category.name}</a>
        {/if}
      </div>
    </div>
  </div>
</nav>

<div class="container">
  {#if category}
    <SubCategories categories={category.subCategories} />
  {/if}
</div>

<div class="container">
  <h4>BROWSE PRODUCTS</h4>
  <nav class="grey">
    <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input id="search" type="search" required>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
  {JSON.stringify(category)}
</div>