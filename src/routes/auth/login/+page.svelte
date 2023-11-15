<script lang="ts">
  import { onMount } from "svelte";

  import { AuthAccountLogin } from "subvind-components"

	let organization: any;

  onMount(async () => {
    let erpHostname = window.location.hostname
    if (erpHostname === 'localhost') {
      erpHostname = 'videos.subvind.com'
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

<br />
<br />
<AuthAccountLogin organization={organization} />
