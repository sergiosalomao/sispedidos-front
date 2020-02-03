<template>
  <div class="lista-fabricante">
    <q-page padding>
      <q-table
        title="Lista de Fabricantes"
        :data="fabricantes"
        :columns="columns"
        row-key="id"
        hide-bottom
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        :loading="loading"
      >
       <q-td
          slot="body-cell-status"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="item.row.status === 'Ativo' ? 'green' : 'red' "
            dark
          >{{ item.row.status }}</q-badge>
        </q-td>
        <q-td slot="body-cell-id" slot-scope="item" :props="item">
          <q-icon name="person" size="1.5rem" color="gray" />
        </q-td>
        <q-td slot="body-cell-action" slot-scope="props" :props="props">
          <q-btn @click="edit(props.row)" color="primary" flat icon="edit" />
          <q-btn @click="showModalDelete(props.row)" color="red" flat icon="delete" />
        </q-td>
      </q-table>
      <paginacao :last_page="lastPage" :current_page="currentPage" @input="load($event)" />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="showModal = true" fab icon="add" color="primary" />
      </q-page-sticky>
    </q-page>
    <modal-cadastro
      :edit="editarFabricante"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
    <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarFabricante"
    />
  </div>
</template>
<script>
import {
  QPage, QTable, QPageSticky,
} from 'quasar';
import FabricanteService from '../../service/Fabricante/FabricanteService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';

export default {
  name: 'ListaFabricante',
  components: {
    QPage,
    QTable,
    QPageSticky,
    ModalCadastro,
    ModalDelete,
    Paginacao,
  },
  data() {
    return {
      loading: false,
      currentPage: 0,
      lastPage: 0,
      FabricanteService: new FabricanteService(),
      showModal: false,
      showDeleteModal: false,
      editarFabricante: {},
      fabricantes: [],
      columns: [
         {
          name: 'id', style: 'min-width: 15px; width: 15px', label: '', field: 'id', align: 'center',
        },
        {
          name: 'nome', sortable: true, label: 'Nome', field: 'nome', align: 'left',
        },
        {
          name: 'cpfcnpj', label: 'CPF/CNPJ', field: 'cpfcnpj', align: 'left',
        },
        {
          name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left',
        },
        {
          name: 'contato', label: 'Contato', field: 'contato', align: 'left',
        },
        {
          name: 'email', label: 'Email', field: 'email', align: 'left',
        },
        {
          name: 'status', label: 'Status', field: 'status', align: 'left',
        },
        {
          name: 'action',
          label: 'Ação',
          field: 'action',
          align: 'center',
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0, // 0 means all rows
      },
    };
  },
  methods: {
    edit(item) {
      this.editarFabricante = { ...item };
      this.showModal = true;
    },
    async onSubmit(fabricante) {
      await this.FabricanteService.createOrUpdate(fabricante);
      this.notify();
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load(page) {
      this.loading = true;
      const data = await this.FabricanteService.search({}, page);
      this.loading = false;
      this.lastPage = data.last_page;
      this.currentPage = data.current_page;
      this.fabricantes = data.data;
    },
    onReset() {
      this.fabricante = {};
    },
    fecharModal() {
      this.editarFabricante = {};
      this.showModal = false;
    },

    showModalDelete(item) {
      this.editarFabricante = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      await this.FabricanteService.remove(item.id);
      this.showDeleteModal = false;
      this.load();
      this.notify();
    },
    notify() {
      this.$q.notify({
        message: 'Operação realizada com sucesso!',
        color: 'green',
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>
