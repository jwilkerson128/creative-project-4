<template>
<div>
  <h1>ADMINS ONLY!</h1>
  <p>Please only delete stories that are inappropriate or offensive</p>
  <div class="story-gallery">
    <div class="story" v-for="story in completedStories" v-bind:key="story._id">
      <img :src="story.illustration_path">
      <h3>{{story.title}}</h3>
      <button @click="deleteStory(story)">Delete</button>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
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
    async deleteStory(story) {
      try {
        await axios.delete("/api/story/" + story._id)
        await this.getCompletedStories();
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
  }
}
</script>

<style>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
