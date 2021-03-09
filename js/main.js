/*    Jeff Bohn   3/8/2021   VUE Chapter 1   Lab 12     main.js  */


const submissionComponent = {
    template:           // the template of a component must be enclosed within a single root element. This is a strict limitation to declaring VUE templates
                        // because of this, everything gets wrapped within a container of some sort: <div>
                        // also, the submission object in this template was undefined so it has to be passed to the "props" down below
    ` <div style="display: flex; width: 100%">   
        <figure class="media-left">
          <img class="image is-64x64"
            v-bind:src="submission.submissionImage">
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>
                <a v-bind:href="submission.url" class="has-text-info">
                  {{ submission.title }}
                </a>
                <span class="tag is-small">#{{ submission.id }}</span>
              </strong>
              <br>
                {{ submission.description }}
              <br>
              <small class="is-size-7">
                Submitted by:
                <img class="image is-24x24"
                  v-bind:src="submission.avatar">
              </small>
            </p>
          </div>
        </div>
        <div class="media-right">
          <span class="icon is-small" v-on:click="upvote(submission.id)">
            <i class="fa fa-chevron-up"></i>
            <strong class="has-text-info">{{ submission.votes }}</strong>
          </span>
        </div>
      </div>`,
    props: ['submission', 'submissions'],     /*  use "props" to pass data from the root instance to this component  */


    methods: {                                /* click event handler to call an upvote (submission.id) method when ever the upvote is clicked ( use "v-on:click" in HTML) */
    upvote(submissionId) {
      const submission = this.submissions.find(          /* update logic uses "find" method */
        submission => submission.id === submissionId     /* locate submission object with the id equal to the submissionId parameter */
      );
      submission.votes++;                                /* votes attribute of that submission is then incremented by one */
      }
    }
  };
  
  new Vue({          /*  Vue instance, starting point of all Vue applications  */
    el: "#app",      /*  el option with string value #app  */
    data: {
        submissions: Seed.submissions   /* this Vue object is global: now in HTML we can reference all submission data by accessing "submissions"  */
    },
  
  
  /*  with vue instance created and containing submission data, we can now work towards synchronizing data in the model to the view.
      In other words, we can now -DATA BIND-  the instance's data to the DOM  */
  
  /*  The simplest form of data binding uses mustache syntax {{}}. That "V-BIND" and "V-FOR" syntax will now be applied on the HTML page */
  
    computed: {
      sortedSubmissions() {                           /* returns a sorted array of submissions ( votes: largest to smallest )  */
        return this.submissions.sort((a,b) => {
          return b.votes - a.votes;
        });
      }
    },
    components: {
      'submission-component': submissionComponent
    }
  });
















/*  JS File: Before adding HTML into the js file  



new Vue({          
  el: "#app",     
  data: {
      submissions: Seed.submissions   
  },
  computed: {
    sortedSubmissions() {                           
      return this.submissions.sort((a,b) => {
        return b.votes - a.votes;
      });
    }
  },
  methods: {                               
    upvote(submissionId) {
      const submission = this.submissions.find(         
        submission => submission.id === submissionId   
      );
      submission.votes++;                              
    }
  }
});


*/


/*  HTML Before migration

  <div id="app">
    <h2 class="title has-text-centered dividing-header">UpVote!</h2>

    <div class="section">
      <!-- v-for is used for LISTS, so alter this: <article class="media"> -->
        <article v-for="submission in sortedSubmissions" 
        v-bind:key="submission.id" 
        class="media"
        v-bind:class="{ 'blue-border': submission.votes >= 20 }">   <!-- add blue border after 20 upvotes -->

        <figure class="media-left">
          <img class="image is-64x64" v-bind:src="submission.submissionImage">
          <!-- src="images/submissions/image-yellow.png">  -->  
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>
                <a v-bind:href="submission.url" class="has-text-info"> {{ submission.title }} </a>
                <span class="tag is-small">#{{ submission.id }}</span>
                <!-- <a href="#" class="has-text-info">Yellow Pail</a>
                <span class="tag is-small">#4</span>  -->
              </strong>
              <br>
              {{ submission.description }}
               <!-- On-demand sand castle construction expertise. --> 
              <br>
              <small class="is-size-7">
                Submitted by:
                <img class="image is-24x24" v-bind:src="submission.avatar">
                <!--   src="images/avatars/daniel.jpg">  -->
              </small>
            </p>
          </div>
        </div>
        <div class="media-right">
          <span class="icon is-small" v-on:click="upvote(submission.id)">   <!--  v-on:click for event handing   <span class="icon is-small"> -->
            <i class="fa fa-chevron-up"></i>&nbsp;
            <strong class="has-text-info">{{ submission.votes }}</strong>  <!-- <strong class="has-text-info">10</strong> -->
          </span>
        </div>
      </article>
    </div>
  </div>

  */