const state = () => ({
  isLoggedIn: false,
  user: {
    username: null,
    img: null,
    id: null
  }
});

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn;
  },
  getUserInfo: state => {
    return {
      name: state.user.username,
      img: state.user.img,
      id: state.user.id
    }
  }
};

const actions = {
  login({ commit }, user) {
    commit("login", user);
  }
};

const mutations = {
  login(state, user) {
    state.isLoggedIn = true;
    state.user.username = user.username;
    state.user.img = user.img;
    state.user.id = user.id;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
