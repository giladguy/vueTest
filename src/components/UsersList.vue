
<script lang="ts">
    import { defineComponent } from 'vue';

    import { mapActions, mapGetters } from "vuex";
    import { store, Dictionary } from '../store';

    import { Result } from '../types/randUserTypes'
    import router from '../router'

    import { Country } from '../types/country'

    export default defineComponent({


        setup(props) {

            return {
                props,
                store,

                pagination: {
                    page: 1,
                    rowsPerPage: 0 // 0 means all rows
                }
            }
        },

        name: 'UsersList',
        methods: {
            ...mapActions({ fetchData: "initUsersList" }),
            customFilter(rows: Result[], terms: any) {

                // rows contain the entire data
                // terms contains whatever you have as filter

                console.log(terms, rows)

                const t = this;

                const filteredRows = rows.filter(
                    (row) => {

                        if (t.filters == null)
                            return true;


                        if ((t.filters['name'] != null) && t.getUserName(row).toLowerCase().indexOf(t.filters['name'].toLowerCase()) == -1) {
                            return false;
                        }


                        if ((t.filters['country'] != null) && row.location.country.toLowerCase().indexOf(t.filters['country'].toLowerCase()) == -1) {
                            return false;
                        }

                        return true;
                    })

                return filteredRows
            },
            getUserName(row: Result) {
                return row.name.title + " " + row.name.first + " " + row.name.last;
            },

            onRowClick(evt: Event, row: Result) {
                console.trace(evt);
                router.push({ name: 'UserPage', params: { id: row.localId } })
            },

            countryCodeFromCountry(cuntry: string) {
                return Country[cuntry.replaceAll(" ", "") as keyof typeof Country];
            }
        },
        computed: {
            ...mapGetters({ usersList: "getUsersList" }),
            filters(): Dictionary<string> | null {
                return this.store.getters.getFilters()
            },
            showGrid(): boolean {
                return this.store.getters.getUsersList.length > 0;

            },
            columns() {
                return [
                    { name: 'thumbnail', align: 'left', label: '', field: "", headerStyle: { fontSize: '1.4em' }, sortable: false, classes: "usersGridthumbnail" },
                    { name: 'name', align: 'left', label: 'Name', field: '', headerStyle: { fontSize: '1.4em' }, sortable: false },
                    { name: 'gender', align: 'left', label: 'gender', field: '', headerStyle: { fontSize: '1.4em' }, sortable: true },
                    { name: 'country', align: 'left', label: 'country', field: '', headerStyle: { fontSize: '1.4em' }, sortable: false },
                    { name: 'phone', align: 'left', label: 'phone', field: '', headerStyle: { fontSize: '1.4em' }, sortable: true },
                    { name: 'email', align: 'left', label: 'email', field: '', headerStyle: { fontSize: '1.4em' }, sortable: true },
                ]
            },
        }
    });

</script>

<style scoped lang="scss">
   
    @import "../styles/usersList.scss";

   
</style>

<template>
    <div class="container">
        <div class="d-grid gap-2">
            <q-btn color="teal" v-on:click="fetchData" >
                <q-icon left size="3em" name="autorenew" />
                <div>Fetch</div>
            </q-btn>

          
        </div>

        <q-table v-show="showGrid"
                 :rows="usersList"
                 :columns="columns"
                 row-key="localId"
                 :filter="filters"
                 :filter-method="customFilter"
                 :rows-per-page-options="[0]"
                 :pagination="pagination"
                 hide-bottom
                 v-bind:grid="false"
                 table-class="customGrid"
                 table-header-class="bg-purple-8 customGrid-header"
                 @row-click="onRowClick">


            <template v-slot:header-cell-name="props">
                <q-th :props="props" key="name" class="inlineContent">

                    <span>Name</span>

                    <q-input dense debounce="400"
                             v-model="filters.name"
                             @update:model-value="(x)=>{
                               filters['name'] = x;
                               }"
                             color="primary">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>

                </q-th>
            </template>
            <template v-slot:header-cell-country="props">
                <q-th :props="props" key="country" class="inlineContent">

                    <span>country</span>

                    <q-input dense debounce="400"
                             v-model="filters.country"
                             @update:model-value="(x)=>{
                                filters['country'] = x;
                               }"
                             color="primary">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>

                </q-th>
            </template>



            <template v-slot:body-cell-thumbnail="props">
                <q-td key="thumbnail" class="usersGridthumbnail">
                    <img v-bind:src="props.row.picture.thumbnail" />
                </q-td>


            </template>

            <template v-slot:body-cell-name="props">
                <q-td key="name" class="">
                    {{this.getUserName(props.row)}}
                </q-td>
            </template>

            <template v-slot:body-cell-gender="props">
                <q-td key="gender" class="">
                    {{props.row.gender}}
                    <q-icon color="secondary" v-bind:name="props.row.gender"></q-icon>
                </q-td>
            </template>

            <template v-slot:body-cell-country="props">
                <q-td key="country" class="">
                    {{props.row.location.country}}
                    <img width="20" alt="" onerror="(eventOrMessage: any, source: string, fileno: number)=>{(eventOrMessage.currentTarget as HTMLImageElement).style.display='none'}" :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCodeFromCountry(props.row.location.country)}.svg`" />
                </q-td>
            </template>

            <template v-slot:body-cell-phone="props">
                <q-td key="phone" class="">
                    {{props.row.phone}}
                </q-td>
            </template>

            <template v-slot:body-cell-email="props">
                <q-td key="email" class="">
                    {{props.row.email}}
                </q-td>
            </template>

        </q-table>
        <div>{{filter}}</div>
    </div>
</template>