<template>
<div class="home">
  <h1> Welcome to the Story Creator! </h1>
  <p>The Story Creator is a site where you can start your own story or continue someone else's. The catch:
    you don't know what was written previously, other than the last line! This can lead to some hilarious
    results. You can choose to either create the title for the story and upload an illustration to give its
    future writers inspiration on what to write, or you can choose to pick up with one of the stories that
    is in progress right now. Give it a try and head to the <router-link to="/storycreator">Story Creator</router-link>
    now, or click on one of the completed stories below to read the hilarious results!
  </p>
  <completed-story-gallery />
</div>
</template>

<script>
import CompletedStoryGallery from '@/components/CompletedStoryGallery.vue';
export default {
  name: 'Home',
  components: {
    CompletedStoryGallery,
  },
}
</script>

<style scoped>
* {
  padding: 15px;
}

a {
  padding: 0px;
}
</style>
