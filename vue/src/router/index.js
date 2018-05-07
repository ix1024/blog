import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddItem from '@/pages/AddItem'
import EditItem from '@/pages/EditItem'
import ItemList from '@/pages/ItemList'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/item',
    name: 'AddItem',
    component: AddItem
  },
  {
    path: '/item/:id',
    name: 'EditItem',
    component: EditItem
  },
  {
    path: '/list',
    name: 'ItemList',
    component: ItemList
  }
  ]
})