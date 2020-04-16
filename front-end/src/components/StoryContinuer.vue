<template>
<div>
  <div v-if="inProgressStories.length>0">
    <h2> In Progress Stories: </h2>
    <div class="story" v-for="story in inProgressStories" v-bind:key="story._id" @click="chooseStory(story)">
      <img :src="story.illustration_path">
      <h3>{{story.title}}</h3>
    </div>

    <form class="pure-form" @submit.prevent="upload" v-if="selected">
      <h2>Enter a new paragraph, and put the first part of the next user's paragraph in the second input box. Make it a sentence or less (enough for them to go off of, but don't give away everything!)" </h2>
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
          <input type="radio" id="unfinished" value="unfinished" v-model="storyFinished">
          <label for="unfinished">Let someone else continue the story.</label>
          <input type="radio" id="finished" value="finished" v-model="storyFinished">
          <label for="finished">The story is complete!</label>
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
/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: 50%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all 0.5s ease;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Form */

form {
  font-size: 11pt;
}

input {
  width: 100%;
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
  width: 200px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
