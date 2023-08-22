import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Result, IRandomUserResponse } from './types/randUserTypes'

// define injection key
export const key: InjectionKey<Store<RandomUserState>> = Symbol()


// define own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface RandomUserState {
    allUsers: Result[],
    lastError: Error | null,
    filters: Dictionary<string>,
    currentUser: Result | null
}

// Create a new store instance.
export const store = createStore<RandomUserState>({
    state() {
        return {
            allUsers: [],
            lastError: null,
            filters: { name: "", country: "" },
            currentUser: null,
        }
    },
    getters: {
        getUsersList(state: RandomUserState) {
            return state.allUsers;
        },
         getFilters:(state: RandomUserState) =>()=>{
            return state.filters;
        },
        getUserById: (state: RandomUserState) => (id: number) => {
            const arr = state.allUsers.filter(i => i.localId == id);
            if (arr.length > 0)
                return arr[0];

            return null;
        },
        //getUserById(state: RandomUserState, id: number) {
        //    return state.allUsers.filter(i => i.localId = id);
        //}
    },
    mutations: {
        setUsers(state: RandomUserState, items: Result[]) {
            state.allUsers = items;
        },
        setError(state: RandomUserState, error: Error) {
            state.lastError = error;
        },
      
    },
    actions: {
        async initUsersList(state) {
            fetch('https://randomuser.me/api/?results=10').then(res => {
                if (res.ok) {
                    res.json().then((res: IRandomUserResponse) => {
                        res.results?.forEach((i, index) => i.localId = index)
                        state.commit("setUsers", res.results);
                        console.trace(res.results);
                    }).catch(err => {
                        state.commit("setError", err);
                        console.log('error : ' + err)
                    });
                }
            }).catch(err => {
                state.commit("setError", err);
                console.log('error : ' + err)
            })
        }
       
    }
})
