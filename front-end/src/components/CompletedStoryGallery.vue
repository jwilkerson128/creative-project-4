<template>
<div>
  <div class="story-gallery">
    <div class="story" v-for="story in completedStories" v-bind:key="story._id">
      <router-link :to="{ name: 'Story', params: { id: story._id }}">
        <img :src="story.illustration_path">
        <h3>{{story.title}}</h3>
      </router-link>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CompletedStoryGallery',
  data() {
    return {
      completedStories: [],
      error: '',
    }
  },
  created() {
    this.getCompletedStories();
  },
  methods: {
    async getCompletedStories() {
      try {
        let response = await axios.get("/api/story/complete");
        this.completedStories = response.data;
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.story-gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.story {
  margin: 10px;
}
</style>
