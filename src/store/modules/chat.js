const state = () => ({
  users: []
});

const getters = {
  getUserInfo: (state) => (id) => {
    return state.users.find(user => user.id == id)
  }
};

const actions = {
  addUser({ commit }, user) {
    commit('addUser', user)
  },
  addFriend({ commit }, payload) {
    commit('addFriend', payload)
  },
  addMessage({ commit }, message) {
    commit('addMessage', message)
  }
};

const mutations = {
  addUser(state, user) {
    state.users.push(user)
  },
  addFriend(state, payload) {
    const currentUser = state.users.find(user => user.id == payload.currentId);
    currentUser.friends.push({
      id: payload.friendId,
      name: payload.friendName
    })
  },
  addMessage(state, message) {
    const targetUser = state.users.find(user => user.id == message.to)
    targetUser.messages.push(message)

    if (message.to != message.from) {
      const currentUser = state.users.find(user => user.id == message.from);
      currentUser.messages.push(message)
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
