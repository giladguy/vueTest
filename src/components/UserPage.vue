<template>
    <q-layout view="lHh Lpr lFf" @keydown="$emit('input', $event)" class="row wrap justify-center items-start content-start">
       
        <q-card v-if="user!=null" class="my-card" flat bordered>
            <img v-bind:src="user.picture.large" />
            <q-input outlined  v-model="user.name.title" label="title"></q-input>
            <q-input outlined  v-model="user.name.first" label="Name" ></q-input>
            <q-input outlined  v-model="user.name.last" label="Last Name" ></q-input>


       

         


            <q-list>
                <q-item clickable>
                    <q-item-section avatar  class="relative-position">
                        <q-icon color="primary"  name="transgender"></q-icon>                        
                    </q-item-section>

                    <q-item-section avatar  class="relative-position ">
                        <span class="text-weight-bold text-grey flex" >
                            gender:   <span class="text-primary">&nbsp; {{user.gender}}</span>
                        </span>                     
                    </q-item-section>
                        

                </q-item>

                <q-item clickable>
                    <q-item-section avatar>
                        <q-icon color="secondary" name="cake"></q-icon>
                    </q-item-section>

                    <q-item-section>
                        <span class="text-weight-bold text-grey flex">Age: <span class="text-primary">{{user.dob.age}}</span></span>
                        <span class="text-weight-bold text-grey flex">DOB: <span class="text-primary"> {{user.dob.date.toString('yyyy/MM/dd')}}</span></span>
                    </q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section avatar>
                        <q-icon color="primary" name="place"></q-icon>
                    </q-item-section>

                    <q-item-section>
                        <span class="text-weight-bold text-grey flex">Address: <span class="text-primary">{{user.location.street.name}} {{user.location.street.number}}, {{user.location.city}}, {{user.location.state}}</span></span>
                   
                    </q-item-section>
                </q-item>
                <q-item clickable >
                    <q-item-section avatar>
                        <q-icon color="secondary" name="perm_contact_calendar"></q-icon>
                    </q-item-section>

                    <q-item-section  >
                        <div class="text-weight-bold text-grey flex">Phone: <div class="text-primary"> {{user.phone}}</div></div>
                        <span class="text-weight-bold text-grey">Email: <span class="text-primary"> {{user.email}}</span></span>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card>
    </q-layout>
</template>

<script lang="ts">
   import { defineComponent } from 'vue';
  import  router  from '../router'
   import {  mapGetters} from "vuex";

   import { store } from '../store';
import { Result } from '../types/randUserTypes';
  //  import { Result } from '../types/randUserTypes'

    export default defineComponent({
        name: 'UserPage',
           setup() {
               
            return {                 
                store,
               router
            }
        },       
        computed: {
            ...mapGetters({ getUserById: "getUserById" }),
            user():Result|null
            {     
                return this.store.getters.getUserById(router.currentRoute.value.params.id)
            }
        },
    });
</script>

<style>
</style>