<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="language.title"
            name="title"
          />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            id="description"
            required
            v-model="language.description"
            name="description"
          />
        </div>
  
        <button @click="saveLanguage" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newLanguage">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import LanguageDataService from "../services/LanguageDataService";
  
  export default {
    name: "add-language",
    data() {
      return {
        language: {
          id: null,
          title: "",
          description: "",
          published: false
        },
        submitted: false
      };
    },
    methods: {
      saveLanguage() {
        var data = {
          title: this.language.title,
          description: this.language.description
        };
  
        LanguageDataService.create(data)
          .then(response => {
            this.language.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newLanguage() {
        this.submitted = false;
        this.language = {};
      }
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  