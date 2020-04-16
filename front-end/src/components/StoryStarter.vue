<template>
<form class="pure-form" @submit.prevent="upload">
  <h3>Choose a title and illustration and write your name.</h3>
  <fieldset>
    <input v-model="title" placeholder="Title">
  </fieldset>
  <fieldset>
    <input v-model="name" placeholder="Your name">
  </fieldset>
  <fieldset>
    <div class="imageInput" @click="chooseImage">
      <img v-if="url" :src="url" />
      <div v-if="!url" class="placeholder">
        Upload an Illustration
      </div>
      <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
    </div>
    <p v-if="error" class="error">{{error}}</p>
  </fieldset>
  <fieldset class="buttons">
    <button type="submit">Create Story</button>
  </fieldset>
</form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'StoryStarter',
  data() {
    return {
      title: '',
      name: '',
      url: '',
      file: null,
      error: '',
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    chooseImage() {
      this.$refs.fileInput.click()
    },
    async upload() {
      if (this.file != null && this.title != '' && this.name != '') {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name);
          formData.append('title', this.title);
          formData.append('name', this.name);
          await axios.post("/api/story", formData);
          this.file = null;
          this.url = "";
          this.title = "";
          this.name = "";
        } catch (error) {
          this.error = "Error: " + error.response.data.message;
        }
      }
    }
  }
}
</script>

<style scoped>
* {
  background-color: #02C8A7;
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
}
</style>
