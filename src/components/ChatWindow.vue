<template>
  <v-card class="mx-auto overflow-hidden">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(friend, i) in userInfo.friends"
            :key="i"
            @click.stop="changeCurrentFriend(friend.id)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="friend.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-img height="200px" src="@/assets/bdde1.jpg">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-app-bar-nav-icon
          color="white"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="title white--text pl-0"> Chat </v-toolbar-title>
      </v-app-bar>
      <v-card-title class="white--text">
        <v-avatar rounded size="90" v-if="userInfo.imgSrc">
          <img :src="userInfo.imgSrc" :alt="userInfo.name" />
        </v-avatar>
        <v-avatar rounded size="90" v-if="!userInfo.imgSrc" color="red">
          <span class="white--text headline">{{ createAvatar() }}</span>
        </v-avatar>
        <p class="ml-3">{{ userInfo.name }}</p>
      </v-card-title>
    </v-img>
    <v-card-text>
      <v-container fluid d-flex flex-column class="messages">
        <p class="ml-3 text-h4">{{ currentFriendName }}</p>
        <div
          class="message ma-2"
          v-for="(mes,i) in messages"
          :key="i"
          d-flex
          flex-row
          fluid
          v-bind:class="{
            'align-self-end from': mes.from == userInfo.id,
            'align-self-start to': mes.from != userInfo.id,
          }"
        >
          {{ mes.message }}
        </div>
      </v-container>
      <v-container fluid d-flex flex-column>
        <v-text-field
          label="Message"
          v-model="message"
          :append-outer-icon="message ? 'mdi-send' : ''"
          clearable
          type="text"
          @click:append-outer="sendMessage"
          white-space="pre-wrap"
        ></v-text-field>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ChatWindow",
  data() {
    return {
      drawer: null,
      currentFriendId: this.userInfo.id,
      message: null,
    };
  },
  props: {
    userInfo: Object,
  },
  methods: {
    createAvatar() {
      return this.userInfo.name[0];
    },
    changeCurrentFriend(num) {
      this.currentFriendId = num;
    },
    sendMessage() {
      if (this.message != null) {
        this.$emit("message", {
          from: this.userInfo.id,
          to: this.currentFriendId,
          message: this.message,
        });
        this.clearMessage();
      }
    },
    clearMessage() {
      this.message = null;
    },
  },
  computed: {
    currentFriendName() {
      return this.userInfo.friends.find(
        (friend) => friend.id == this.currentFriendId
      ).name;
    },
    messages() {
      if (this.userInfo.id == this.currentFriendId) {
        return this.userInfo.messages.filter(
          (message) =>
            message.from == this.currentFriendId &&
            message.to == this.currentFriendId
        );
      } else {
        return this.userInfo.messages.filter(
          (message) =>
            message.from == this.currentFriendId ||
            message.to == this.currentFriendId
        );
      }
    },
  },
};
</script>

<style scoped>
.messages {
  height: calc(100vh - 450px);
  overflow-y: auto;
}

.message {
  max-width: 50%;
  background-color: antiquewhite;
  border-radius: 15px;
  padding: 10px;
  box-sizing: border-box;
}

.message.from {
  background-color: #90ee90;
}

.message.to {
  background-color: #87cefa;
}
</style>