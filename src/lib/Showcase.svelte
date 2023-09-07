<script lang="ts">
  import { onMount } from 'svelte';
  import Carousel from 'svelte-carousel';
  import { browser } from '$app/environment';

  export let organization: any;
  let carousel: any; // for calling methods of the carousel instance
  let showcases: any;

  const handleNextClick = () => {
    carousel.goToNext()
  }

  onMount(async () => {
    const response = await fetch(`https://backend.subvind.com/showcases/orgRelated/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      showcases = await response.json();
      console.log('showcases', showcases)

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

{#if browser && showcases && showcases.data.length}
  <Carousel
    bind:this={carousel}
  >
    {#each showcases.data as showcase}
      <div class="card">
        <div class="card-image">
          <div class="banner">
            {#if showcase.bannerPhoto}
              <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${showcase.bannerPhoto.bucket.name}/${showcase.bannerPhoto.filename}`} alt={showcase.title}>
            {:else}
              <img src="/IMG-1255.jpg" alt={showcase.title}>
            {/if}
          </div>
        </div>
        <div class="card-action">
          <a href={showcase.url}>{showcase.title}</a>
        </div>
      </div>
    {/each}
  </Carousel>
{/if}

<!-- <button on:click={handleNextClick}>Next</button> -->

<style>
  .banner {
    max-height: 400px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center; /* Horizontally center the image */
    align-items: center; /* Vertically center the image */
  }

  .banner img {
    width: auto;
    max-width: 100%;
    object-fit: contain; /* This ensures the image maintains its aspect ratio and fits within the container */
  }

  .card-action {
    text-align: center;
  }
  .card-action a {
    /* color: #000 !important; */
    margin-right: 0 !important;
  }
</style>