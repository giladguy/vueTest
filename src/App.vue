<template>
    <q-layout view="lHh Lpr lFf" @keydown="$emit('input', $event)">
       
        <router-view />
    </q-layout>
   
</template>

<script>
import { ref } from 'vue'   
    import router from './router'

    router.push({ name: 'UsersList' });

export default {
  name: 'LayoutDefault',
  
        methods: {
            back() {
                router.go(-1);
            }
        },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
