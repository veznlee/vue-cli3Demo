<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="角色名称" prop="role">
      <Input type="text" v-model="formCustom.role" size="large" :maxlength="30" :readonly="isView"/>
    </FormItem>
    <FormItem label="所属部门" class="f-pr" prop="departmentText">
      <div class="f-pr"  v-clickoutside="closeDeptSel">
        <Input type="text" v-model="formCustom.departmentText" size="large" :maxlength="30" readonly @on-focus="openDeptSel"/>
        <transition name="transition-drop">
          <div v-show="deptsel" class="diy-tree-sel-wrap" >
            <Tree :data="treeData" @on-select-change="departSelect"></Tree>
          </div>
        </transition>
      </div>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('The two input passwords do not match!'));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Age cannot be empty'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'));
        } else {
          if (value < 18) {
            callback(new Error('Must be over 18 years of age'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
            
    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: ''
      },
      ruleCustom: {
        passwd: [
            { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
            { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>