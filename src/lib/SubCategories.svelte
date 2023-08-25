<script lang="ts">
  export let categories: any;
</script>

{#if categories.length}
  <h4>BROWSE SUB CATEGORIES</h4>
  <!-- {JSON.stringify(categories)} -->
  <div class="row categories">
    {#each categories as category}
      <div class="col s6 m3 l4">
        <div class="card hoverable">
          <div class="card-image">
            <div class="category">
              <img src="/IMG-1258.jpg" alt="logo">
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

  .card-action a {
    color: #000 !important;
  }

  .category {
    /* max-height: 200px; */
    overflow: hidden;
    display: flex;
    justify-content: center; /* Horizontally center the image */
    align-items: center; /* Vertically center the image */
  }

  .category img {
    width: auto;
    max-width: 100%;
    object-fit: contain; /* This ensures the image maintains its aspect ratio and fits within the container */
  }
</style>