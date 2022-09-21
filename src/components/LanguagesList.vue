<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by title"
            v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Languages List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(language, index) in languages"
            :key="index"
            @click="setActiveLanguage(language, index)"
          >
            {{ language.title }}
          </li>
        </ul>
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllLanguages">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentLanguage">
          <h4>Language</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentLanguage.title }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentLanguage.description }}
          </div>
          <div>
            <label><strong>Status:</strong></label> {{ currentLanguage.published ? "Published" : "Pending" }}
          </div>
  
          <router-link :to="'/languages/' + currentLanguage.id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Language...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LanguageDataService from "../services/LanguageDataService";
  
  export default {
    name: "languages-list",
    data() {
      return {
        languages: [],
        currentLanguage: null,
        currentIndex: -1,
        title: ""
      };
    },
    methods: {
      retrieveLanguages() {
        LanguageDataService.getAll()
          .then(response => {
            this.languages = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveLanguages();
        this.currentLanguage = null;
        this.currentIndex = -1;
      },
  
      setActiveLanguage(language, index) {
        this.currentLanguage = language;
        this.currentIndex = language ? index : -1;
      },
  
      removeAllLanguages() {
        LanguageDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchTitle() {
        LanguageDataService.findByTitle(this.title)
          .then(response => {
            this.languages = response.data;
            this.setActiveLanguage(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveLanguages();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>
  