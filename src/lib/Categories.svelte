<script lang="ts">
  export let categories: any;
  export let organization: any;
</script>

{#if categories.data.length}
  <h4>BROWSE BY CATEGORY</h4>
{/if}
<!-- {JSON.stringify(categories)} -->
<div class="row categories">
  {#each categories.data as category}
    {#if !category.parentCategory}
      <div class="col s6 m4 l3">
        <div class="card hoverable">
          <div class="card-image">
            <div class="photo">
              {#if category.mainPhoto}
                <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${category.mainPhoto.bucket.name}/${category.mainPhoto.filename}`} alt="category">
              {:else}
                <img src="/placeholder.png" alt="category">
              {/if}
            </div>
            <!-- <span class="card-title"></span> -->
          </div>
          <div class="card-action">
            <a href={`/categories/${category.slug}`}>{category.name}</a>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

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