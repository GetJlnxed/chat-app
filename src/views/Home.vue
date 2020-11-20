<template>
  <v-container fluid>
    <v-card class="mx-auto my-12" max-width="374" v-if="!isLoggedIn">
      <v-card-text>
        <v-card-title>Login</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Name"
            required
            v-model="user.username"
            :rules="[(value) => !!value || 'Name field is required']"
          ></v-text-field>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            v-model="user.img"
          ></v-file-input>
          <v-btn
            color="success"
            class="mr-4"
            :disabled="!valid"
            @click="handleLogin"
            >Sign in</v-btn
          >
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import User from "../models/user";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      valid: false,
      user: {
        username: null,
        img: null,
        id: 1,
      },
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        setTimeout(() => {
          if (this.user.img != null) {
            const file = this.user.img;
            this.user.img = URL.createObjectURL(file);
          }

          this.$store.dispatch("auth/login", this.user).then(() => {
            this.$store
              .dispatch("chat/addUser", new User(0, "Иван Иванович", null))
              .then(() => {
                this.$store.dispatch(
                  "chat/addUser",
                  new User(this.user.id, this.user.username, this.user.img)
                );
                this.$router.push("/chat");
                this.loading = false;
              });
          });
        }, 2000);
      } else {
        this.loading = false;
      }
    },
  },
  mounted() {
    if (this.isLoggedIn) this.$router.push("/chat");
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
    }),
  },
};
</script>
