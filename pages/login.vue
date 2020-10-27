<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >

      <h1 class="title has-text-centered">
        Welcome back!
      </h1>

      <!--      <Notification :message="error" v-if="error"/>-->
      <!--        method="post"-->

      <div v-if="$route.query.message" class="alert alert-danger mb-3">
        Need Login First
      </div>

      <form @submit.prevent="login">
        <div class="field">
          <label class="label">Email</label>

          <div class="control">
            <input
              v-model="email"
              type="text"
              class="input"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>

          <div class="control">
            <input
              v-model="password"
              type="password"
              class="input"
            />
          </div>
        </div>

        <div class="control">
          <!--              <button v-on:click="login" type="submit" class="button is-dark is-fullwidth">Log In</button>-->
<!--          <button type="submit" class="button is-dark is-fullwidth">-->
<!--            Log In-->
<!--          </button>-->
          <v-btn
            type="submit"
            class="button is-dark is-fullwidth"
            elevation="2"
          >
            Log In
          </v-btn>
          #
        </div>
      </form>

      <!--        <div class="has-text-centered" style="margin-top: 20px">-->
      <!--          <p>-->
      <!--            Don't have an account? <nuxt-link to="/register">Register</nuxt-link>-->
      <!--          </p>-->
      <!--        </div>-->

      <!--          <v-btn text @click="$auth.logout()">Logout</v-btn>-->

      <a href="/register">Registration</a>

      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // layout: 'empty'
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    // onSubmit () {
    //   this.$store.dispatch('login')
    //   this.$router.push('/account')
    // },
    async login () {
      //console.log("login form submitted")
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        // console.log(response);
        console.log("[AX] login success")
        this.$store.dispatch('login')
        this.$router.push('/account')
      } catch (e) {
        console.log(e)
        this.error = e.response.data.message
        alert(e.response.data.message)
      }
    }
  }
}
</script>
