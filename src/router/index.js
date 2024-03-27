import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/main/MainView.vue'
import LoginFormView from '../views/user/LoginFormView.vue'
import ModifyFormView from '../views/user/ModifyFormView.vue'
import JoinFormView from '../views/user/JoinFormView.vue'
import JoinOkView from '../views/user/JoinOkView.vue'
import AddListView from '../views/guestbook/addListView.vue'
import AttachFormView from '../views/attach/AttachFormView.vue'
import AttachResultView from '../views/attach/AttachResultView.vue'
import DelFormView from '../views/guestbook/DelFormView.vue'
import BoardListView from '../views/board/ListView.vue'
import BoardModifyFormView from '../views/board/ModifyFormView.vue'
import BoardReadView from '../views/board/ReadView.vue'
import BoardWriteFormView from '../views/board/WriteFormView.vue'

const routes = [
  {
    path: '/',
    name: '/',
    component: MainView
  }, 
  {
    path: '/user/loginform',
    name: '/user/loginform',
    component: LoginFormView
  },
  {
    path: '/user/modifyform',
    name: '/user/modifyform',
    component: ModifyFormView
  },
  {
    path: '/user/joinform',
    name: '/user/joinform',
    component: JoinFormView
  },
  {
    path: '/user/joinok',
    name: '/user/joinok',
    component: JoinOkView
  },
  {
    path: '/guestbook/addlist',
    name: '/guestbook/addlist',
    component: AddListView
  },
  {
    path: '/guestbook/delete/:no',
    name: '/guestbook/delete',
    component: DelFormView
  },
  {
    path: '/attach/form',
    name: '/attach/form',
    component: AttachFormView
  },
  {
    path: '/attach/result',
    name: '/attach/result',
    component: AttachResultView
  },
  {
    path: '/board/list',
    name: '/board/list',
    component: BoardListView
  },
  {
    path: '/board/modify/:no',
    name: '/board/modify',
    component: BoardModifyFormView
  },
  {
    path: '/board/read/:no',
    name: '/board/read',
    component: BoardReadView
  },
  {
    path: '/board/writeform',
    name: '/board/writeform',
    component: BoardWriteFormView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
