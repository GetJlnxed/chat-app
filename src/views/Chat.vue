<template>
  <v-container fluid d-flex justify="space-around">
    <chat-window :userInfo="currentUser" @message="sendMessage" class="mr-2"/>
    <chat-window :userInfo="ivan" @message="sendMessage"/>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ChatWindow from "@/components/ChatWindow";

export default {
  name: "Chat",
  components: {
    ChatWindow,
  },
  mounted() {
    this.isLoggedIn ? false : this.$router.push("/");
    this.$store.dispatch('chat/addFriend', {
      currentId: this.currentUser.id,
      friendId: this.ivan.id,
      friendName: this.ivan.name
    })
    this.$store.dispatch('chat/addFriend', {
      currentId: this.ivan.id,
      friendId: this.currentUser.id,
      friendName: this.currentUser.name
    })
  },
  methods: {
    sendMessage(message) {
      this.$store.dispatch('chat/addMessage', message)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      user: "auth/getUserInfo",
    }),
    ivan() {
      return this.$store.getters["chat/getUserInfo"](0);
    },
    currentUser() {
      return this.$store.getters["chat/getUserInfo"](this.user.id);
    },
  },
};
</script>
