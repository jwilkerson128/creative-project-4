<template>
<div class="main">
  <div class="image" v-if="story">
    <h1> {{this.story.title}} </h1>
    <p> Created by {{this.story.author}} on {{formatDate(this.story.created)}}</p>
    <img :src="this.story.illustration_path">
    <p> {{this.text}} </p>
    <p> Contributing authors: </p>
    <ol>
      <li class="author" v-for="paragraph in this.story.paragraphs" v-bind:key="paragraph._id">
        {{paragraph.author}} ({{formatDate(paragraph.created)}})
      </li>
    </ol>
    <p v-if="error">{{error}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Story',
  components: {},
  created() {
    this.getStory();
  },
  data() {
    return {
      story: null,
      error: '',
    }
  },
  computed: {
    text() {
      let val = ""
      for (let par of this.story.paragraphs) {
        val += par.text.trim();
        val += " "
        if (par.lastPart) {
          val += par.lastPart.trim();
          val += " "
        }
      }
      return val.trim()
    }
  },
  methods: {
    async getStory() {
      try {
        let response = await axios.get("/api/story/" + this.$route.params.id);
        this.story = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>
