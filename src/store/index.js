import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: "",
    nextId: 3,
    viewKey: "all"
  },
  mutations: {
    initList(state, list) {
      state.list = list;
    },
    // 为 store 中的 inputValue 赋值
    setInputValue(state, val) {
      state.inputValue = val;
    },
    // 添加列表项
    addItem(state) {
      const item = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      };
      state.list.push(item);
      state.nextId++;
      state.inputValue = "";
    },
    // 根据id删除item
    removeItem(state, id) {
      const index = state.list.findIndex(item => item.id === id);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    // 修改item中的选中状态
    changeStatus(state, param) {
      const index = state.list.findIndex(item => item.id === param.id);
      if (index !== -1) {
        state.list[index].done = param.status;
      }
    },
    // 清除已完成任务
    cleanDone(state) {
      state.list = state.list.filter(item => item.done === false);
    },
    // 改变视图关键字
    changeViewKey(state, key) {
      state.viewKey = key;
    }
  },
  actions: {
    getList(context) {
      axios.get("/list.json").then(({ data }) => {
        context.commit("initList", data);
      });
    }
  },
  modules: {},
  getters: {
    unDoneLength: state => {
      return state.list.filter(item => item.done === false).length;
    },
    infoList(state) {
      if (state.viewKey === "all") {
        return state.list;
      }
      if (state.viewKey === "undone") {
        return state.list.filter(item => item.done === false);
      }
      if (state.viewKey === "done") {
        return state.list.filter(item => item.done === true);
      }
    }
  }
});
