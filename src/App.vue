<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      id="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    ></a-input>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>
    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            e => {
              cbStatusChanged(e, item.id);
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>
      <!-- footer 区域 -->
      <div class="footer" slot="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            @click="changeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey === 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["list", "inputValue", "viewKey"]),
    ...mapGetters(["unDoneLength", "infoList"])
  },
  methods: {
    // 监听文本框内容的变化
    handleInputChange(event) {
      this.$store.commit("setInputValue", event.target.value);
    },
    // 添加 item 到 list
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warn("文本框内容不能为空");
      }
      this.$store.commit("addItem");
    },
    // 根据id删除item
    removeItemById(id) {
      this.$store.commit("removeItem", id);
    },
    // 监听复选框状态变化
    cbStatusChanged(e, id) {
      const param = { id: id, status: e.target.checked };
      this.$store.commit("changeStatus", param);
    },
    // 清除已完成任务
    clean() {
      this.$store.commit("cleanDone");
    },
    // 切换任务列表
    changeList(key) {
      this.$store.commit("changeViewKey", key);
    }
  }
};
</script>

<style>
#app {
  padding: 10px;
}
#my_ipt {
  width: 500px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
