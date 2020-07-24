import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";
import { server } from "@/services/constants";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //ดึงข้อมูลมาแสดงใช้ state:
    isLogged: false,
    username: "",
  },
  getters: {
    // username(state) {
    //   return "Logged in as : " + state.username;
    // },
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      return state.username;
    },
  },
  mutations: {
    // สำหรับเก็บ logfile
    SET_LOGGED_IN(state) {
      state.isLogged = true;
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, username) {
      state.username = username;
    },
  },
  actions: {
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      }
    },
    async doLogin({ commit, state, dispatch }, { username, password }) {
      let result = await api.login({ username, password });
      if (result == true) {
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      } else {
        dispatch("doLogout", {});
      }
    },
    doLogout({ commit, state, dispatch }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
    },
  },
});
