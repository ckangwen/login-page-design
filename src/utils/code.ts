const elFormTemplate = `  <el-form ref="elFormRef" label-placement="left" size="large" :model="formData" :rules="rules">
<el-form-item path="username">
  <el-input v-model:value="formData.username" placeholder="请输入用户名">
    <template #prefix>
      <icon name="ic:baseline-email"></icon>
    </template>
  </el-input>
</el-form-item>
<el-form-item path="password">
  <el-input
    v-model:value="formData.password"
    type="password"
    show-password-on="click"
    placeholder="请输入密码"
  >
    <template #prefix>
      <icon name="ic:baseline-password"></icon>
    </template>
  </el-input>
</el-form-item>
<el-form-item class="mb-0">
  <div class="w-full flex justify-between items-center">
    <div class="flex-initial">
      <el-checkbox>自动登录</el-checkbox>
    </div>
    <el-button link>忘记密码?</el-button>
  </div>
</el-form-item>
<el-form-item>
  <el-button class="w-full" type="primary" size="large" :loading="loading" @click="onLogin">
    登录
  </el-button>
</el-form-item>
</el-form>`;

const elFormScript = `const elFormRef = ref();
const loading = ref(false);

const formData = reactive({
  username: "kevin.generic@outlook.com",
  password: "123456",
});

const rules = {
  username: { required: true, message: "请输入绑定邮箱", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

const onLogin = async () => {
  //
};`;
