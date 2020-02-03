<template>
  <div class="lista-fornecedor">
    <q-page padding>
      <q-table
        title="Lista de Fornecedores"
        :data="fornecedores"
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
      :edit="editarFornecedor"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
    <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarFornecedor"
    />
  </div>
</template>
<script>
import {
  QPage, QTable, QPageSticky,
} from 'quasar';
import FornecedorService from '../../service/Fornecedor/FornecedorService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';

export default {
  name: 'ListaFornecedor',
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
      FornecedorService: new FornecedorService(),
      showModal: false,
      showDeleteModal: false,
      editarFornecedor: {},
      fornecedores: [],
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
      this.editarFornecedor = { ...item };
      this.showModal = true;
    },
    async onSubmit(fornecedor) {
      await this.FornecedorService.createOrUpdate(fornecedor);
      this.notify();
      this.load();
      this.onReset();
      this.fecharModal();
    },
    async load(page) {
      this.loading = true;
      const data = await this.FornecedorService.search({}, page);
      this.loading = false;
      this.lastPage = data.last_page;
      this.currentPage = data.current_page;
      this.fornecedores = data.data;
    },
    onReset() {
      this.fornecedor = {};
    },
    fecharModal() {
      this.editarFornecedor = {};
      this.showModal = false;
    },

    showModalDelete(item) {
      this.editarFornecedor = item;
      this.showDeleteModal = true;
    },
    async deletar(item) {
      await this.FornecedorService.remove(item.id);
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
