<script lang="ts">
  import { onMount } from "svelte";

  export let categoryId: any;
  export let organization: any;
  let categories: any;

  onMount(async () => {
    const response = await fetch(`https://backend.subvind.com/categories/categoryRelated/${categoryId}`, {
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
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })
</script>

{#if categories}
  <h4>BROWSE SUB CATEGORIES</h4>
  <!-- {JSON.stringify(categories)} -->
  <div class="row categories">
    {#each categories.data as category}
      <div class="col s6 m3 l3">
        <div class="card hoverable">
          <div class="card-image">
            <div class="photo">
              {#if category.mainPhoto}
                <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${category.mainPhoto.bucket.name}/${category.mainPhoto.filename}`} alt="product">
              {:else}
                <img src="/IMG-1258.jpg" alt="category">
              {/if}
            </div>
            <!-- <span class="card-title"></span> -->
          </div>
          <div class="card-action">
            <a href={`/categories/${category.slug}`} target="_self">{category.name}</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .categories {
    width: 100%;
  }

  .photo {
    /* max-height: 200px; */
    overflow: hidden;
    display: flex;
    justify-content: center; /* Horizontally center the image */
    align-items: center; /* Vertically center the image */
  }

  .photo img {
    width: auto;
    max-width: 100%;
    object-fit: contain; /* This ensures the image maintains its aspect ratio and fits within the container */
  }
</style>