<template>
    <div v-if="currentLanguage" class="edit-form">
      <h4>Language</h4>
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title"
            v-model="currentLanguage.title"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description"
            v-model="currentLanguage.description"
          />
        </div>
  
        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentLanguage.published ? "Published" : "Pending" }}
        </div>
      </form>
  
      <button class="badge badge-primary mr-2"
        v-if="currentLanguage.published"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>
      <button v-else class="badge badge-primary mr-2"
        @click="updatePublished(true)"
      >
        Publish
      </button>
  
      <button class="badge badge-danger mr-2"
        @click="deleteLanguage"
      >
        Delete
      </button>
  
      <button type="submit" class="badge badge-success"
        @click="updateLanguage"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on a Language...</p>
    </div>
  </template>
  
  <script>
  import LanguageDataService from "../services/LanguageDataService";
  
  export default {
    name: "LanguageItem",
    data() {
      return {
        currentLanguage: null,
        message: ''
      };
    },
    methods: {
      getLanguage(id) {
        LanguageDataService.get(id)
          .then(response => {
            this.currentLanguage = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updatePublished(status) {
        var data = {
          id: this.currentLanguage.id,
          title: this.currentLanguage.title,
          description: this.currentLanguage.description,
          published: status
        };
  
        LanguageDataService.update(this.currentLanguage.id, data)
          .then(response => {
            console.log(response.data);
            this.currentLanguage.published = status;
            this.message = 'The status was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updateLanguage() {
        LanguageDataService.update(this.currentLanguage.id, this.currentLanguage)
          .then(response => {
            console.log(response.data);
            this.message = 'The language was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      deleteLanguage() {
        LanguageDataService.delete(this.currentLanguage.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "languages" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getLanguage(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  