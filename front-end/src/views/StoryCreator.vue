<template>
<div class="creator">
  <h1>Story Creator</h1>
  <form>
    <input type="radio" id="new" value="new" v-model="creationMode">
    <label for="new">Start New Story</label>
    <input type="radio" id="continue" value="continue" v-model="creationMode">
    <label for="continue">Continue a Story</label>
  </form>
  <div v-if="creationMode==='new'">
    <story-starter />
  </div>
  <div v-if="creationMode==='continue'">
    <story-continuer />
  </div>
  <button @click="submit">Submit</button>
</div>
</template>

<script>
import axios from 'axios';
import StoryStarter from '@/components/StoryStarter.vue';
import StoryContinuer from '@/components/StoryContinuer.vue';
export default {
  name: 'StoryCreator',
  data() {
    return {
      creationMode: '',
    }
  },
  components: {
    StoryStarter,
    StoryContinuer,
  },
  methods: {
    async submit() {
      await axios.get("/api/story/", {});
    },
  }
}
</script>
