<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >

      <h1 class="title has-text-centered">
        Account
      </h1>

      <div id="chart_data">
        btx: ???<hr>
        ltc: ???<hr>
        eth: ???<hr>
        <br>
        Loading ...
      </div>

    </v-col>
  </v-row>
</template>

<script>
  export default {
    // layout: 'empty'
    methods: {
      onSubmit () {
        this.$store.dispatch('login')
        this.$router.push('/')
      }
    }
  }
</script>

<!--<script>-->
<!--// import Notification from '~/components/Notification'-->

<!--export default {-->
<!--  // middleware: 'guest',-->

<!--  // components: {-->
<!--  //   Notification-->
<!--  // },-->

<!--  // data () {-->
<!--  //   return {-->
<!--  //     email: '',-->
<!--  //     password: '',-->
<!--  //     error: null-->
<!--  //   }-->
<!--  // },-->

<!--  methods: {-->
<!--    async login () {-->
<!--      try {-->
<!--        /*-->
<!--        await this.$auth.loginWith('local', {-->
<!--          data: {-->
<!--            email: this.email,-->
<!--            password: this.password-->
<!--          }-->
<!--        })-->

<!--        this.$router.push('/')-->

<!--         */-->
<!--        // const response = await this.$auth.loginWith('local', {-->
<!--        //   data: {-->
<!--        //     email: this.email,-->
<!--        //     password: this.password-->
<!--        //   }-->
<!--        // })-->
<!--        console.log(this.email)-->
<!--      } catch (e) {-->
<!--        // eslint-disable-next-line-->
<!--        console.log(e)-->
<!--        // this.error = e.response.data.message-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
