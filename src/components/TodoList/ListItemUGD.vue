<template>
  <v-main class="list">
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <v-snackbar
      v-model="notImportant"
      :timeout="3000"
      :value="false"
      absolute
      right
      shaped
      bottom
      color="blue"
    >
      <v-icon color="white">mdi-heart</v-icon> Priority: Not Important
    </v-snackbar>
    <v-snackbar
      v-model="normal"
      :timeout="3000"
      :value="false"
      absolute
      left
      shaped
      top
      color="yellow"
    >
      <v-icon color="white">mdi-pause</v-icon> Priority: Normal
    </v-snackbar>
    <v-snackbar
      v-model="urgent"
      :timeout="3000"
      :value="false"
      absolute
      center
      shaped
      top
      color="red"
    >
      <v-icon color="white">mdi-alarm</v-icon> Priority: Urgent
    </v-snackbar>
    <v-card>
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline"
            >Ungiuded To Do List</v-list-item-title
          >
          <v-list-item-subtitle>by 200710994</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          hide
          details
          style="margin-top: 30px"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark @click="dialogTambah = true">
          Tambah
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="todos"
        :search="search"
        show-expand
        single-expand
        item-key="task"
        :expanded-sync="expanded"
      >
        <!-- expanded -->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div v-if="item.priority == 'Urgent'">
              <div class="red">
                <div class="pa-4">
                  <div
                    class="red lighten-2"
                    style="
                      width: fit-content;
                      border-radius: 15px;
                      padding: 5px;
                    "
                  >
                    <v-icon color="white"> mdi-fire </v-icon>
                    <span style="color: white">{{ item.priority }}</span>
                  </div>
                  <div
                    class="yellow darken-3"
                    style="
                      width: fit-content;
                      border-radius: 15px;
                      padding: 5px;
                      margin-top: 5px;
                    "
                  >
                    <v-icon color="white"> mdi-note-text-outline </v-icon>
                    <span style="color: white">Note Task: {{ item.note }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.priority == 'Not Important'">
              <div class="blue">
                <div class="pa-4">
                  <div
                    class="red lighten-2"
                    style="
                      width: fit-content;
                      border-radius: 15px;
                      padding: 5px;
                    "
                  >
                    <v-icon color="white"> mdi-fire </v-icon>
                    <span style="color: white">{{ item.priority }}</span>
                  </div>
                  <div
                    class="yellow darken-3"
                    style="
                      width: fit-content;
                      border-radius: 15px;
                      padding: 5px;
                      margin-top: 5px;
                    "
                  >
                    <v-icon color="white"> mdi-note-text-outline </v-icon>
                    <span style="color: white">Note Task: {{ item.note }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.priority == 'Normal'">
              <div class="yellow">
                <div class="pa-4">
                  <div
                    class="red lighten-2"
                    style="
                      width: fit-content;
                      border-radius: 15px;
                      padding: 5px;
                    "
                  >
                    <v-icon color="white"> mdi-fire </v-icon>
                    <span style="color: white">{{ item.priority }}</span>
                  </div>
                  <div
                    class="yellow darken-3"
                    style="
                      width: fit-content;
                      border-radius: 15px;
                      padding: 5px;
                      margin-top: 5px;
                    "
                  >
                    <v-icon color="white"> mdi-note-text-outline </v-icon>
                    <span style="color: white">Note Task: {{ item.note }}</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </template>
        <!-- icon priority -->
        <template v-slot:[`item.priority`]="{ item }">
          <div v-if="item.priority == 'Urgent'">
            <v-btn small class="black" @click="urgent = true">
              <v-icon color="red"> mdi-alert-octagon </v-icon>
            </v-btn>
          </div>
          <div v-if="item.priority == 'Not Important'">
            <v-btn small class="black" @click="notImportant = true">
              <v-icon color="blue"> mdi-alert-octagon </v-icon>
            </v-btn>
          </div>
          <div v-if="item.priority == 'Normal'">
            <v-btn small class="black" @click="normal = true">
              <v-icon color="yellow"> mdi-alert-octagon </v-icon>
            </v-btn>
          </div>
        </template>
        <!-- action -->
        <template v-slot:[`item.actions`]="{ item }">
          <div v-if="item.status == 'Selesai'">
            <v-btn
              :disabled="isActive"
              small
              class="mr-2 blue"
              @click="editItem(item)"
            >
              <v-icon color="white"> mdi-pencil </v-icon>
            </v-btn>
            <v-btn small class="error" @click="deleteItem(item)">
              <v-icon color="white"> mdi-delete </v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn small class="mr-2 blue" @click="editItem(item)">
              <v-icon color="white"> mdi-pencil </v-icon>
            </v-btn>
            <v-btn small class="error" @click="deleteItem(item)">
              <v-icon color="white"> mdi-delete </v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogTambah" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headine"> Form Todo List</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="formTodo.task"
              label="Task"
              required
            ></v-text-field>
            <v-select
              v-model="formTodo.priority"
              :items="[`Urgent`, `Normal`, `Not Important`]"
              label="Priority"
              required
            ></v-select>

            <v-textarea
              v-model="formTodo.note"
              label="Note"
              required
            ></v-textarea>
            <v-select
              v-model="formTodo.status"
              :items="[`Selesai`, `Belum Selesai`]"
              label="Status"
              required
            ></v-select>
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
          <span class="headine"> Edit Todo List</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="formTodo.task"
              label="Task"
              required
            ></v-text-field>
            <v-select
              v-model="formTodo.priority"
              :items="[`Urgent`, `Normal`, `Not Important`]"
              label="Priority"
              required
            ></v-select>

            <v-textarea
              v-model="formTodo.note"
              label="Note"
              required
            ></v-textarea>
            <v-select
              v-model="formTodo.status"
              :items="[`Selesai`, `Belum Selesai`]"
              label="Status"
              required
            ></v-select>
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
          <span class="headine"> Form Todo List</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            class="body-2 font-weight-bold"
            @click="cancel"
            >Cancel</v-btn
          >
          <v-btn
            color="green"
            class="body-2 font-weight-bold"
            outlined
            @click="DeleteOfIndex()"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>
<script>
export default {
  name: "ListItem",
  data() {
    return {
      urgent: false,
      notImportant: false,
      normal: false,
      search: null,
      isActive: true,
      index: null,
      dialogTambah: false,
      dialogEdit: false,
      dialogDelete: false,
      headers: [
        {
          text: "Task",
          align: "start",
          sortable: true,
          value: "task",
        },
        { text: "Priority", value: "priority" },
        { text: "Note", value: "note" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
      todos: [
        {
          task: "Coding",
          priority: "Urgent",
          note: "Code for your life",
          status: "Belum Selesai",
        },
        {
          task: "Cooking",
          priority: "Not Important",
          note: "Indomie saat begadang ngerjain coding terbaek",
          status: "Selesai",
        },
        {
          task: "Gaming",
          priority: "Normal",
          note: "Wasting time",
          status: "Belum Selesai",
        },
      ],
      formTodo: {
        task: null,
        priority: null,
        note: null,
        status: null,
      },
    };
  },
  methods: {
    save() {
      this.todos.push(this.formTodo);
      this.resetForm();
      this.dialogTambah = false;
    },
    saveEdit() {
      this.todos[this.index].task = this.formTodo.task;
      this.todos[this.index].priority = this.formTodo.priority;
      this.todos[this.index].note = this.formTodo.note;
      this.todos[this.index].status = this.formTodo.status;
      this.index = null;
      this.resetForm();
      this.dialogEdit = false;
    },
    editItem(item) {
      this.index = this.todos.indexOf(item);
      this.formTodo.task = this.todos[this.index].task;
      this.formTodo.priority = this.todos[this.index].priority;
      this.formTodo.note = this.todos[this.index].note;
      this.formTodo.status = this.todos[this.index].status;
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
      this.index = this.todos.indexOf(item);
      this.dialogDelete = true;
    },
    DeleteOfIndex() {
      this.todos.splice(this.index, 1);
      this.index = null;
      this.dialogDelete = false;
    },
    resetForm() {
      this.formTodo = {
        task: null,
        priority: null,
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
