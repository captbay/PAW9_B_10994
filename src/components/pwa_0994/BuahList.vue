<template>
    <v-main class="list">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet" />
        <!-- <v-snackbar v-model="hijau" :timeout="3000" :value="false" absolute right shaped bottom color="green">
            <v-icon color="white">mdi-heart</v-icon> Stok: > 100
        </v-snackbar>
        <v-snackbar v-model="kureng" :timeout="3000" :value="false" absolute center shaped top color="pink">
            <v-icon color="white">mdi-alarm</v-icon> Stok: kurang 100
        </v-snackbar>
        <v-snackbar v-model="kuning" :timeout="3000" :value="false" absolute left shaped top color="yellow">
            <v-icon color="white">mdi-pause</v-icon> Stok: > 300
        </v-snackbar>
        <v-snackbar v-model="merah" :timeout="3000" :value="false" absolute center shaped top color="red">
            <v-icon color="white">mdi-alarm</v-icon> Stok: > 400
        </v-snackbar> -->
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Buah</v-list-item-title>
                    <v-list-item-subtitle>by 200710994</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" outlined hide details
                    style="margin-top: 30px"></v-text-field>
                <v-spacer></v-spacer>
                <!-- filter nih bos -->
                <!-- <v-flex>
                    <v-select v-model="stokFilterValue" :items="stokList" label="Filter Stok"></v-select>
                </v-flex> -->
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialogTambah = true">
                    Tambah
                </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers" :items="buah" :search="search" :filter="filter" single-expand
                item-key="name" :expanded-sync="expanded">
                <!-- action -->
                <template v-slot:[`item.actions`]="{ item }">
                    <div>
                        <v-btn small class="mr-2 green" @click="editItem(item)">
                            <v-icon color="white"> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn small class="error" @click="deleteItem(item)">
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
                    <span class="headine"> Form Buah</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="formBuah.name" label="Name" required></v-text-field>
                        <v-text-field suffix="Buah" v-model="formBuah.stok" label="Stok" type="number"
                            required></v-text-field>
                        <v-text-field prefix="$" v-model="formBuah.harga" label="Harga" type="number"
                            required></v-text-field>
                        <v-select v-model="formBuah.kondisi" :items="[`Sangat Baik`, `Segar`, 'Hampir Busuk']"
                            label="Kondisi" required></v-select>
                        <v-combobox v-model="formBuah.penyimpanan"
                            :items="['Kulkas', 'Suhu Rendah', 'Luar Ruangan', 'Lembab']" label="Penyimpanan" multiple
                            chips></v-combobox>
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
                    <span class="headine"> Form Buah</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="formBuah.name" label="Name" required></v-text-field>
                        <v-text-field suffix="Buah" v-model="formBuah.stok" label="Stok" type="number"
                            required></v-text-field>
                        <v-text-field prefix="$" v-model="formBuah.harga" label="Harga" type="number"
                            required></v-text-field>
                        <v-select v-model="formBuah.kondisi" :items="[`Sangat Baik`, `Segar`, 'Hampir Busuk']"
                            label="Kondisi" required></v-select>
                        <v-combobox v-model="formBuah.penyimpanan"
                            :items="['Kulkas', 'Suhu Rendah', 'Luar Ruangan', 'Lembab']" label="Penyimpanan" multiple
                            chips></v-combobox>
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
                    <span class="headine"> Form Buah</span>
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
            // stokFilterValue: null,
            // stokList: [
            //     { text: "All", value: null },
            //     { text: "Merah", value: "Merah" },
            //     { text: "Hijau", value: "Hijau" },
            //     { text: "Kuning", value: "Kuning" },
            // ],
            // merah: false,
            // hijau: false,
            // kuning: false,
            // kureng: false,
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
                // { text: "Stok", value: "stok", filter: this.stokFilter },
                { text: "Stok", value: "stok" },
                { text: "Harga", value: "harga" },
                { text: "Kondisi", value: "kondisi" },
                { text: "Penyimpanan", value: "penyimpanan" },
                { text: "Actions", value: "actions" },
                { text: "Check", value: "checkbox" },
            ],
            buah: [
                {
                    name: "Mangga",
                    stok: 10,
                    harga: 1000,
                    kondisi: "Sangat Baik",
                    penyimpanan: ["Kulkas", "Suhu Rendah"],
                },
                {
                    name: "Apel",
                    stok: 22,
                    harga: 1000,
                    kondisi: "Sangat Baik",
                    penyimpanan: ["Kulkas"],
                },
                {
                    name: "Jeruk",
                    stok: 25,
                    harga: 1000,
                    kondisi: "Sangat Baik",
                    penyimpanan: ["Kulkas"],
                },
            ],
            formBuah: {
                name: null,
                stok: null,
                harga: null,
                kondisi: null,
                penyimpanan: null,
            },
        };
    },
    methods: {
        // stokFilter(value) {
        //     // If this filter has no value we just skip the entire filter.
        //     if (!this.stokFilterValue) {
        //         return true;
        //     }

        //     // Check if the current loop value (The stok value)
        //     // equals to the selected value at the <v-select>.
        //     return value === this.stokFilterValue;
        // },
        save() {
            this.buah.push(this.formBuah);
            this.resetForm();
            this.dialogTambah = false;
        },
        saveEdit() {
            this.buah[this.index].name = this.formBuah.name;
            this.buah[this.index].stok = this.formBuah.stok;
            this.buah[this.index].harga = this.formBuah.harga;
            this.buah[this.index].kondisi = this.formBuah.kondisi;
            this.buah[this.index].penyimpanan = this.formBuah.penyimpanan;
            this.index = null;
            this.resetForm();
            this.dialogEdit = false;
        },
        editItem(item) {
            this.index = this.buah.indexOf(item);
            this.formBuah.name = this.buah[this.index].name;
            this.formBuah.stok = this.buah[this.index].stok;
            this.formBuah.harga = this.buah[this.index].harga;
            this.formBuah.kondisi = this.buah[this.index].kondisi;
            this.formBuah.penyimpanan = this.buah[this.index].penyimpanan;
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
            this.index = this.buah.indexOf(item);
            this.dialogDelete = true;
        },
        DeleteOfIndex() {
            this.buah.splice(this.index, 1);
            this.index = null;
            this.dialogDelete = false;
        },
        DeleteMultiple() {
            for (let i = 0; i < this.selected.length; i++) {
                this.buah.splice(this.buah.indexOf(this.selected[i]), 1);
            }
            this.selected = [];
        },
        resetForm() {
            this.formBuah = {
                name: null,
                stok: null,
                harga: null,
                kondisi: null,
                penyimpanan: null,
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
  