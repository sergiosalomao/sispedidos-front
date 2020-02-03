<template>
  <div class="lista-usuario">
    <q-page padding>
      <q-table
        title="Lista de Usuarios"
        :data="usuarios"
        :columns="columns"
        row-key="id"
        hide-bottom
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        :loading="loading"
      >
        <q-td
          slot="body-cell-id"
          slot-scope="item"
          :props="item"
        >
          <q-icon
            name="person"
            size="1.5rem"
            color="gray"
          />
        </q-td>
        <q-td
          slot="body-cell-tipo"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="getColorTipo(item.row.tipo)"
            dark
          >{{ item.row.tipo }}</q-badge>
        </q-td>

        <q-td
          slot="body-cell-action"
          slot-scope="props"
          :props="props"
        >
          <q-btn
            @click="edit(props.row)"
            color="primary"
            flat
            icon="edit"
          />
          <q-btn
            @click="showModalDelete(props.row)"
            color="red"
            flat
            icon="delete"
          />
        </q-td>
      </q-table>
      <paginacao
            :last_page="lastPage"
            :current_page="currentPage"
            @input="load($event)"
          />
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          @click="showModal = true"
          fab
          icon="add"
          color="primary"
        />
      </q-page-sticky>
    </q-page>
    <modal-cadastro
      :edit="editarUsuario"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
     <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarUsuario"
    />
  </div>
</template>
<script>
import {
  QPage, QTable, QPageSticky, QInnerLoading,
} from 'quasar';
import UsuarioService from '../../service/Usuario/UsuarioService';
import RegisterService from '../../service/Register/RegisterService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';

export default {
  name: 'ListaUsuario',
  components: {
    QPage, QTable, QPageSticky, ModalCadastro, ModalDelete, QInnerLoading, Paginacao,
  },
  data() {
    return {
      loading: false,
      currentPage: 0,
      lastPage: 0,
      UsuarioService: new UsuarioService(),
      RegisterService: new RegisterService(),
      showModal: false,
      showDeleteModal: false,
      editarUsuario: {},
      usuarios: [],
      colors: {
        Administrador: () => 'primary',
        Coordenador: () => 'amber',
        Usuario: () => 'grey',
        default: () => 'red',
      },
      columns: [
        {
          name: 'id', style: 'min-width: 15px; width: 15px',label: '', field: 'id', align: 'center',
        },
        {
          name: 'name', label: 'Nome', field: 'name', align: 'left',
        },
        {
          name: 'email', label: 'Email', field: 'email', align: 'left',
        },
        {
          name: 'tipo', label: 'Tipo', field: 'tipo', align: 'left',
        },
        {
          name: 'action', label: 'Ação', field: 'action', align: 'center',
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0, // 0 means all rows
      },
    };
  },
  methods: {
    getColorTipo(tipo) {
      return (this.colors[tipo] || this.colors.default)();
    },
    edit(item) {
      this.editarUsuario = { ...item };
      this.showModal = true;
    },
    async onSubmit(usuario) {
      await this.RegisterService.createOrUpdate(usuario);
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load(page) {
      this.loading = true;
      const data = await this.UsuarioService.search({}, page);
      this.loading = false;
      this.lastPage = data.last_page;
      this.currentPage = data.current_page;
      this.usuarios = data.data;
    },
    onReset() {
      this.usuario = {};
    },
    fecharModal() {
      this.editarUsuario = {};
      this.showModal = false;
    },

    showModalDelete(item) {
      this.editarUsuario = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      await this.UsuarioService.remove(item.id);
      this.showDeleteModal = false;
      this.load();
    },

  },
  mounted() {
    this.load();
  },
};
</script>
