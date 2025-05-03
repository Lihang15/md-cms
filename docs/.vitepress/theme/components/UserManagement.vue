<template>
  <div class="container">
    <el-button type="primary" @click="openDialog()">新增用户</el-button>
  <el-button type="primary" @click="goBack">返回</el-button>
    <el-table :data="users" stripe style="width: 1200px; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" width="200" label="邮箱" />
      <el-table-column prop="company" width="300" label="公司" />
      <el-table-column prop="valid" label="是否有效">
        <template #default="{ row }">
          <el-tag :type="row.valid ? 'success' : 'info'">{{ row.valid ? '有效' : '无效' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag v-for="r in row.role" :key="r" type="warning" class="mr-1">{{ r }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row, $index }">
          <el-button size="small" @click="openDialog(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteUser($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog :title="isEdit ? '编辑用户' : '新增用户'" v-model="dialogVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="form.company" />
        </el-form-item>
        <el-form-item label="是否有效">
          <el-switch v-model="form.valid" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" multiple placeholder="选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// 其他代码...


const goBack = () => {
   location.href = '/'  // 返回上一页
}

interface User {
  id: number
  username: string
  email: string
  password: string
  avatar: string
  company: string
  valid: boolean
  role: string[]
}

const users = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '',
    avatar: '',
    company: '测试公司',
    valid: true,
    role: ['admin']
  }
])

const form = reactive<User>({
  id: 0,
  username: '',
  email: '',
  password: '',
  avatar: '',
  company: '',
  valid: true,
  role: []
})

const dialogVisible = ref(false)
const isEdit = ref(false)

const openDialog = (user?: User) => {
  if (user) {
    Object.assign(form, user)
    isEdit.value = true
  } else {
    Object.assign(form, {
      id: Date.now(),
      username: '',
      email: '',
      password: '',
      avatar: '',
      company: '',
      valid: true,
      role: []
    })
    isEdit.value = false
  }
  dialogVisible.value = true
}

const submitForm = () => {
  if (isEdit.value) {
    const index = users.value.findIndex(u => u.id === form.id)
    if (index !== -1) {
      users.value[index] = { ...form }
    }
  } else {
    users.value.push({ ...form })
  }
  dialogVisible.value = false
}

const deleteUser = (index: number) => {
  users.value.splice(index, 1)
}
</script>

<style scoped>
.container{
    margin-top: 100px;
    margin-left: 400px;
    /* width: 1500px */
    
}

</style>