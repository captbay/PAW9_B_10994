<template>
    <v-main class="list">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet" />
        <v-snackbar v-model="hijau" :timeout="3000" :value="false" absolute right shaped bottom color="green">
            <v-icon color="white">mdi-heart</v-icon> Calories: > 100
        </v-snackbar>
        <v-snackbar v-model="kureng" :timeout="3000" :value="false" absolute center shaped top color="pink">
            <v-icon color="white">mdi-alarm</v-icon> Calories: kurang 100
        </v-snackbar>
        <v-snackbar v-model="kuning" :timeout="3000" :value="false" absolute left shaped top color="yellow">
            <v-icon color="white">mdi-pause</v-icon> Calories: > 300
        </v-snackbar>
        <v-snackbar v-model="merah" :timeout="3000" :value="false" absolute center shaped top color="red">
            <v-icon color="white">mdi-alarm</v-icon> Calories: > 400
        </v-snackbar>
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Makanan</v-list-item-title>
                    <v-list-item-subtitle>by 200710994</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" outlined hide details
                    style="margin-top: 30px"></v-text-field>
                <v-spacer></v-spacer>
                <!-- filter nih bos -->
                <!-- <v-flex>
                    <v-select v-model="caloriesFilterValue" :items="caloriesList" label="Filter Calories"></v-select>
                </v-flex> -->
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialogTambah = true">
                    Tambah
                </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="makanan" :search="search" :filter="filter" show-expand
                single-expand item-key="name" :expanded-sync="expanded">
                <!-- expanded -->
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <div v-if="(item.calories > 400)">
                            <div class="red">
                                <div class="pa-4">
                                    <div class="red lighten-2" style="
                        width: fit-content;
                        border-radius: 15px;
                        padding: 5px;
                      ">
                                        <v-icon color="white"> mdi-fire </v-icon>
                                        <span style="color: white">{{ item.calories }}</span>
                                    </div>
                                    <div class="yellow darken-3" style="
                        width: fit-content;
                        border-radius: 15px;
                        padding: 5px;
                        margin-top: 5px;
                      ">
                                        <v-icon color="white"> mdi-note-text-outline </v-icon>
                                        <span style="color: white">Note Name: {{ item.note }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="(item.calories > 300)">
                            <div class="yellow">
                                <div class="pa-4">
                                    <div class="red lighten-2" style="
                        width: fit-content;
                        border-radius: 15px;
                        padding: 5px;
                      ">
                                        <v-icon color="white"> mdi-fire </v-icon>
                                        <span style="color: white">{{ item.calories }}</span>
                                    </div>
                                    <div class="yellow darken-3" style="
                        width: fit-content;
                        border-radius: 15px;
                        padding: 5px;
                        margin-top: 5px;
                      ">
                                        <v-icon color="white"> mdi-note-text-outline </v-icon>
                                        <span style="color: white">Note Name: {{ item.note }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="(item.calories > 100)">
                            <div class="green">
                                <div class="pa-4">
                                    <div class="red lighten-2" style="
                        width: fit-content;
                        border-radius: 15px;
                        padding: 5px;
                      ">
                                        <v-icon color="white"> mdi-fire </v-icon>
                                        <span style="color: white">{{ item.calories }}</span>
                                    </div>
                                    <div class="yellow darken-3" style="
                        width: fit-content;
                        border-radius: 15px;
                        padding: 5px;
                        margin-top: 5px;
                      ">
                                        <v-icon color="white"> mdi-note-text-outline </v-icon>
                                        <span style="color: white">Note Name: {{ item.note }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </td>
                </template>
                <!-- icon calories -->
                <template v-slot:[`item.calories`]="{ item }">
                    <div v-if="(item.calories > 400)">
                        <v-btn small class="red" @click="merah = true">
                            <v-text style="color: white;"> {{ item.calories }} </v-text>
                        </v-btn>
                    </div>
                    <div v-else-if="(item.calories > 300)">
                        <v-btn small class="yellow" @click="kuning = true">
                            <v-text> {{ item.calories }} </v-text>
                        </v-btn>
                    </div>
                    <div v-else-if="(item.calories > 100)">
                        <v-btn small class="green" @click="hijau = true">
                            <v-text style="color: white;"> {{ item.calories }} </v-text>
                        </v-btn>
                    </div>
                    <div v-else-if="(item.calories < 100)">
                        <v-btn small class="pink" @click="kureng = true">
                            <v-text style="color: white;"> {{ item.calories }} </v-text>
                        </v-btn>
                    </div>

                </template>
                <!-- action -->
                <template v-slot:[`item.actions`]="{ item }">
                    <div v-if="item.status == 'Ready'">
                        <v-btn :disabled="isActive" small class="mr-2 green" @click="editItem(item)">
                            <v-icon color="white"> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn small class="error" @click="deleteItem(item)">
                            <v-icon color="white"> mdi-delete </v-icon>
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn small class="mr-2 green" @click="editItem(item)">
                            <v-icon color="white"> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn :disabled="isActive" small class="error" @click="deleteItem(item)">
                            <v-icon color="white"> mdi-delete </v-icon>
                        </v-btn>
                    </div>
                </template>
                <!-- checkbox -->
                <template v-slot:[`item.checkbox`]="{ item }">
                    <v-checkbox v-model="selected" :value="item" multiple></v-checkbox>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialogTambah" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headine"> Form Makanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="formMakanan.name" label="Name" required></v-text-field>
                        <v-text-field v-model="formMakanan.calories" label="Calories" type="number"
                            required></v-text-field>
                        <v-textarea v-model="formMakanan.note" label="Note" required></v-textarea>
                        <v-select v-model="formMakanan.status" :items="[`Ready`, `On Process`, 'Delivery']"
                            label="Status" required></v-select>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save"> Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogEdit" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headine"> Form Makanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="formMakanan.name" label="Name" required></v-text-field>
                        <v-text-field v-model="formMakanan.calories" label="Calories" type="number"
                            required></v-text-field>
                        <v-textarea v-model="formMakanan.note" label="Note" required></v-textarea>
                        <v-select v-model="formMakanan.status" :items="[`Ready`, `On Process`, 'Delivery']"
                            label="Status" required></v-select>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="saveEdit()"> Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" persistent max-width="300px">
            <v-card>
                <v-card-title>
                    <span class="headine"> Form Makanan</span>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text class="body-2 font-weight-bold" @click="cancel">Cancel</v-btn>
                    <v-btn color="green" class="body-2 font-weight-bold" outlined @click="DeleteOfIndex()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="headline">Delete Multiple</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <div v-if="selected[0] != NULL">
                <v-list>
                    <v-list-item v-for="(item, index) in selected" :key="index">
                        <v-list-item-subtitle> - {{ item.name }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item><v-btn color="red" class="body-2 font-weight-bold" outlined
                            @click="DeleteMultiple()">HAPUS SEMUA</v-btn></v-list-item>
                </v-list>
            </div>
        </v-card>
    </v-main>
</template>
<script>
export default {
    name: "ListItem",
    data() {
        return {
            selected: [],
            caloriesFilterValue: null,
            // caloriesList: [
            //     { text: "All", value: null },
            //     { text: "Merah", value: "Merah" },
            //     { text: "Hijau", value: "Hijau" },
            //     { text: "Kuning", value: "Kuning" },
            // ],
            merah: false,
            hijau: false,
            kuning: false,
            kureng: false,
            search: null,
            isActive: true,
            index: null,
            dialogTambah: false,
            dialogEdit: false,
            dialogDelete: false,
            headers: [
                {
                    text: "Name",
                    align: "start",
                    sortable: true,
                    value: "name",
                },
                // { text: "Calories", value: "calories", filter: this.caloriesFilter },
                { text: "Calories", value: "calories" },
                { text: "Note", value: "note" },
                { text: "Status", value: "status" },
                { text: "Actions", value: "actions" },
                { text: "Check", value: "checkbox" },
            ],
            makanan: [
                {
                    name: "Friend Rice",
                    calories: 120,
                    note: "Tidak pakai cabe",
                    status: "On Process",
                },
                {
                    name: "Dessert",
                    calories: 350,
                    note: "Tambah alat makan",
                    status: "Ready",
                },
                {
                    name: "Ice Cream",
                    calories: 450,
                    note: "Rasa coklat dan stoberi aja",
                    status: "Delivery",
                },
            ],
            formMakanan: {
                name: null,
                calories: null,
                note: null,
                status: null,
            },
        };
    },
    methods: {
        caloriesFilter(value) {
            // If this filter has no value we just skip the entire filter.
            if (!this.caloriesFilterValue) {
                return true;
            }

            // Check if the current loop value (The calories value)
            // equals to the selected value at the <v-select>.
            return value === this.caloriesFilterValue;
        },
        save() {
            this.makanan.push(this.formMakanan);
            this.resetForm();
            this.dialogTambah = false;
        },
        saveEdit() {
            this.makanan[this.index].name = this.formMakanan.name;
            this.makanan[this.index].calories = this.formMakanan.calories;
            this.makanan[this.index].note = this.formMakanan.note;
            this.makanan[this.index].status = this.formMakanan.status;
            this.index = null;
            this.resetForm();
            this.dialogEdit = false;
        },
        editItem(item) {
            this.index = this.makanan.indexOf(item);
            this.formMakanan.name = this.makanan[this.index].name;
            this.formMakanan.calories = this.makanan[this.index].calories;
            this.formMakanan.note = this.makanan[this.index].note;
            this.formMakanan.status = this.makanan[this.index].status;
            this.dialogEdit = true;
        },
        cancel() {
            this.resetForm();
            this.dialogTambah = false;
            this.dialogEdit = false;
            this.dialogDelete = false;
            this.index = null;
        },
        deleteItem(item) {
            this.index = this.makanan.indexOf(item);
            this.dialogDelete = true;
        },
        DeleteOfIndex() {
            this.makanan.splice(this.index, 1);
            this.index = null;
            this.dialogDelete = false;
        },
        DeleteMultiple() {
            for (let i = 0; i < this.selected.length; i++) {
                this.makanan.splice(this.makanan.indexOf(this.selected[i]), 1);
            }
            this.selected = [];
        },
        resetForm() {
            this.formMakanan = {
                name: null,
                calories: null,
                note: null,
                status: null,
            };
        },
    },
};
</script>
<style>
.text {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 40px;
    font-style: italic;
}
</style>
  