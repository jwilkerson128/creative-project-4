<template>
<div>
  <div v-if="inProgressStories.length>0">
    <h2> In Progress Stories (click the one you'd like to continue)</h2>
    <div class="story-gallery">
      <div class="story" v-for="story in inProgressStories" v-bind:key="story._id" @click="chooseStory(story)">
        <img :src="story.illustration_path">
        <h3>{{story.title}}</h3>
      </div>
    </div>

    <form class="pure-form" @submit.prevent="upload" v-if="selected">
      <h3>Enter a new paragraph, and put the first part of the next user's paragraph in the second input box. Make it a sentence or less (enough for them to go off of, but don't give away everything!)" </h3>
      <h4>Story selected: {{selected.title}} </h4>
      <div v-if="selected.paragraphs.length!=0">
        <p> Here is the first part of your paragraph: </p>
        <p> {{selected.paragraphs[selected.paragraphs.length-1].lastPart}}</p>
      </div>
      <div v-else>
        <p> You'll be writing the first paragraph! </p>
      </div>
      <fieldset>
        <input v-model="name" placeholder="Your name">
      </fieldset>
      <fieldset>
        <div class="paragraph-writer">
          <textarea v-model="paragraph" placeholder="Continue paragraph here"></textarea>
          <input v-model="lastPart" placeholder="Write the beginning of the next user's paragraph">
        </div>
        <p v-if="error" class="error">{{error}}</p>
      </fieldset>
      <fieldset class="buttons">
        <form>
          <div class=radio-row>
            <input type="radio" id="unfinished" value="unfinished" v-model="storyFinished">
            <label for="unfinished">Let someone else continue the story.</label>
          </div>
          <div class=radio-row>
            <input type="radio" id="finished" value="finished" v-model="storyFinished">
            <label for="finished">The story is complete!</label>
          </div>
        </form>
        <button type="submit" class="pure-button pure-button-primary right">Add Paragraph</button>
      </fieldset>
    </form>
  </div>
  <div v-else>
    <p> No current stories in progress, you can start a new one though! </p>
  </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'StoryContinuer',
  data() {
    return {
      inProgressStories: [],
      selected: null,
      error: '',
      paragraph: '',
      lastPart: '',
      storyFinished: "unfinished",
      name: '',
    }
  },
  created() {
    this.getInProgressStories();
  },
  methods: {
    chooseStory(story) {
      this.selected = story;
    },
    async upload() {
      try {
        await axios.put("/api/story/" + this.selected._id, {
          paragraph: this.paragraph,
          lastPart: this.lastPart,
          name: this.name,
          storyFinished: this.storyFinished
        });
        this.paragraph = null;
        this.lastPart = "";
        this.name = "";
        this.selected = null;
        this.storyFinished = "unfinished"
        this.getInProgressStories();
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
    async getInProgressStories() {
      try {
        let response = await axios.get("/api/story/inprogress");
        this.inProgressStories = response.data;
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
* {
  background-color: #02C8A7;
}

h1,
h2,
h3 {
  padding: 15px;
}

img {
  padding: 15px;
}

.radio-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 4px;
}

.story-gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.story {
  border: 3px solid #F9BE02;
  margin: 8px;
  width: 220px;
}

/* Form */

form {
  font-size: 11pt;
  width: 100%;
  margin: auto;
}

input {
  width: 100%;
}

#finished,
#unfinished {
  width: auto;
}

textarea {
  width: 100%;
  height: 100px;
}

.placeholder {
  background: #F0F0F0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.placeholder:hover {
  background: #E0E0E0;
}

.fileInput {
  display: none;
}

img {
  width: 95%;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

button {
  background-color: #E0E0E0;
}

/*Desktop*/
@media only screen and (min-width: 961px) {
  form {
    width: 50%;
  }

  .story {
    width: 20%;
    margin: 0;
  }
}
</style>
