<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>聊天室</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="8">
            <el-button type="primary">聊天室A</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="info">大厅</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="warning">聊天室B</el-button>
          </el-col>
        </el-row>
        <div v-bind:style="{height:fullHeight+'px',marginTop:'10px'}" class="chatcontent" id="chatcontent">
          <template>
            <ul>
              <li v-for="(item,index) in msgArr" :key="index">
                <div>
                  <span class="name">{{item.user}}</span>
                  <span class="time">{{item.createAt}}：</span>
                </div>
                <span v-bind:style="{backgroundColor:item.color}" class="content">{{item.content}}</span>
              </li>
            </ul>
          </template>

        </div>
      </el-main>
      <el-footer>
        <div class="input">
          <el-input placeholder="请输入内容" v-model="inputText" class="input-with-select" @keydown.native="enterSend">
            <el-button slot="append" icon="el-icon-arrow-up" @click="send"></el-button>
          </el-input>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            msgArr: [], //消息列表
            fullHeight: document.documentElement.clientHeight - 350, //屏幕高度
            inputText: "",//输入的消息
        };
    },
    mounted() {
        // 屏幕
        const that = this;
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight;
                that.fullHeight = window.fullHeight - 350;
            })();
        };
    },
    methods: {
        // 回车发送消息
        enterSend(event) {
            const key = event.keyCode;
            if (key === 13) {
                this.send();
            }
        },
        // 发送消息给后端
        send: function(val) {
            console.log(this.inputText);
            if (this.inputText) {
                console.log(this.$socket);
                this.$socket.emit("message", this.inputText);
                this.inputText = "";
            } else {
                alert("输入的内容不能为空！");
            }
        }
    },
    sockets: {
      // 连接
        connect: function() {
            console.log("连接成功");
            this.id = this.$socket.id;
            console.log(this.id);
        },
        // 接收后端返回的数据
        message: function(val) {
            this.msgArr.push(val);
            this.$nextTick(() => {
                var div = document.getElementById("chatcontent");
                div.scrollTop = div.scrollHeight;
            });
        }
    },
    watch: {
      // 监听屏幕高度变化
        fullHeight(val) {
            if (!this.timer) {
                this.fullHeight = val;
                this.timer = true;
                let that = this;
                setTimeout(function() {
                    that.timer = false;
                }, 400);
            }
        }
    }
};
</script>

<style>
html,
body {
    height: 100%;
    background-color: #cccc99;
    overflow: hidden;
}
h1,
ul,
li {
    margin: 0;
    padding: 0;
    list-style: none;
}
.el-container {
    margin-top: 40px;
    padding: 20px;
    background-color: #cccc99;
}

.el-header {
    margin: 0 auto;
    width: 900px;
    background-color: #996666;
    color: #fff;
    text-align: center;
    line-height: 60px;
    border-radius: 30px;
    -moz-box-shadow: 0px 10px 20px #333333;
    -webkit-box-shadow: 0px 10px 20px #333333;
    box-shadow: 0px 10px 20px #333333;
}
.el-main {
    border-radius: 5px 5px 0 0;
    width: 850px;
    background-color: #fff;
    margin: 0 auto;
    /* height: 700px; */
    -moz-box-shadow: 0px 0px 20px #333333;
    -webkit-box-shadow: 0px 0px 20px #333333;
    box-shadow: 0px 0px 20px #333333;
    /* overflow: auto; */
}
.el-main .chatcontent {
    overflow: auto;
}
.el-main .el-row {
    padding: 10px;
    text-align: center;
    background-color: #cc9999;
}
.el-main li {
    border: 1px #ccc dashed;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}
.el-main .name {
    display: inline-block;
    color: #993300;
    font-weight: 600;
    margin-right: 5px;
}
.el-main .time {
    display: inline-block;
    font-size: 14px;
    color: #999999;
}
.el-main .content {
    margin-top: 10px;
    font-size: 14px;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
}
.el-footer {
    margin: 0 auto;
    width: 850px;
    background-color: #99cccc;
    -moz-box-shadow: 0px 10px 20px #333333;
    -webkit-box-shadow: 0px 10px 20px #333333;
    box-shadow: 0px 10px 20px #333333;
}
.el-footer .input {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
.el-main ul li span {
    display: inline-block;
}
</style>
