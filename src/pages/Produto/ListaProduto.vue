<template>
    <div class="lista-produto">
        <q-page padding>
            <q-table title="Lista de Produtos" :data="produtos" :columns="columns" row-key="id" hide-bottom :rows-per-page-options="[]" :pagination.sync="pagination" :loading="loading">
                
                <template v-slot:loading>
              <q-inner-loading
                showing
                color="primary"
              />
                </template>
        <q-td
          slot="body-cell-descricao"
          slot-scope="item"
          :props="item"
        >
          {{item.row.descricao.length > 40 ? `${item.row.descricao.substring(0,40)}...`
            : item.row.descricao}}
        </q-td>

        <q-td
          slot="body-cell-id"
          slot-scope="item"
          :props="item"
        >
          <q-icon
            name="event_note"
            size="1.5rem"
            color="gray"
          />
        </q-td>
        <q-td
          slot="body-cell-categoria"
          slot-scope="item"
          :props="item"
        >
          {{item.row.categoria.descricao}}
        </q-td>
         <q-td
          slot="body-cell-fabricante"
          slot-scope="item"
          :props="item"
        >
          {{item.row.fabricante.nome}}
        </q-td>
         <q-td
          slot="body-cell-fornecedor"
          slot-scope="item"
          :props="item"
        >
          {{item.row.fornecedor.nome}}
        </q-td>

        <q-td
          slot="body-cell-status"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="getColorStatus(item.row.status)"
            dark
          >{{ item.row.status }}</q-badge>
        </q-td>
        I

        <q-td
          slot="body-cell-faturado"
          slot-scope="item"
          :props="item"
        >
          <q-badge
            :color="item.row.faturado === 'Sim' ? 'green' : 'red' "
            dark
          >{{ item.row.faturado }}</q-badge>
        </q-td>

        I
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
          <q-btn
            @click="editDetalhe(props.row)"
            color="grey"
            flat
            icon="chat"
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
      :edit="editarProduto"
      :show="showModal"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
    <modal-detalhe
      :edit="editarProduto"
      :show="showModalDetalhe"
      @fechar="fecharModal"
      @salvar="onSubmit($event)"
    />
    <modal-delete
      :dialog="showDeleteModal"
      @fechar="showDeleteModal = false"
      @deletar="deletar($event)"
      :item="editarProduto"
    />
  </div>

</template>

<script>
import {
    QPage,
    QTable,
    QPageSticky,
    QInnerLoading,
} from 'quasar';
import ProdutoService from '../../service/Produto/ProdutoService';
import DinheiroFilter from '../../filter/dinheiro';
import DataFilter from '../../filter/data';
import ModalCadastro from './ModalCadastro';
import ModalDetalhe from './Detalhes';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';

export default {
    name: 'ListaProduto',
    components: {
        QPage,
        QTable,
        QPageSticky,
        ModalCadastro,
        ModalDelete,
        ModalDetalhe,
        Paginacao,
        QInnerLoading,
    },
    data() {
        return {
            loading: false,
            currentPage: 0,
            lastPage: 0,
            showDeleteModal: false,
            ProdutoService: new ProdutoService(),
            showModal: false,
            showModalDetalhe: false,
            editarProduto: {},
            produtos: [],
            colors: {
                'Em andamento': () => 'amber',
                'Não Iniciado': () => 'red',
                Iniciado: () => 'primary',
                default: () => 'green',
            },
            columns: [

                {
                    name: 'id',
                    style: 'min-width: 15px; width: 15px',
                    label: '',
                    field: 'id',
                    align: 'left',
                },
                {
                    name: 'data_lancamento',
                    label: 'Data Lançamento',
                    field: 'data_lancamento',
                    align: 'center',
                    format: val => DataFilter(val),
                },
                {
                    name: 'fabricante',
                    label: 'Fabricante',
                    field: 'fabricante',
                    align: 'center',
                },
                {
                    name: 'fornecedor',
                    label: 'Fornecedor',
                    field: 'fornecedor',
                    align: 'center',
                },
                {
                    name: 'categoria',
                    label: 'Categoria',
                    field: 'categoria',
                    align: 'center',
                },
                {
                    name: 'titulo',
                    label: 'Produto',
                    field: 'titulo',
                    align: 'center',
                },
                {
                    name: 'unidade_medida',
                    label: 'UND',
                    field: 'unidade_medida',
                    align: 'center',
                },

                {
                    name: 'descricao',
                    style: 'min-width: 150px; width: 150px',
                    label: 'Descrição',
                    field: 'descricao',
                    align: 'left',
                },

                {
                    name: 'valor',
                    label: 'Valor',
                    field: 'valor',
                    align: 'center',
                    format: val => DinheiroFilter(val),
                },

                {
                    name: 'status',
                    label: 'Status',
                    field: 'status',
                    align: 'center',
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
        getColorStatus(status) {
            return (this.colors[status] || this.colors.default)();
        },
        edit(item) {
            this.editarProduto = { ...item };
            this.showModal = true;
        },
        editDetalhe(item) {
            this.editarProduto = { ...item };
            this.showModalDetalhe = true;
        },
        async onSubmit(produto) {
            await this.ProdutoService.createOrUpdate(produto);
            this.load();
            this.fecharModal();
        },

        async load(page) {
            this.loading = true;
            const data = await this.ProdutoService.search({}, page);
            this.loading = false;
            this.lastPage = data.last_page;
            this.currentPage = data.current_page;
            this.produtos = data.data;
        },
        fecharModal() {
            this.showModal = false;
            this.showModalDetalhe = false;
            this.editarProduto = {};
        },
        showModalDelete(item) {
            this.editarProduto = item;
            this.showDeleteModal = true;
        },
        async deletar(item) {
            await this.ProdutoService.remove(item.id);
            this.showDeleteModal = false;
            this.load();
        },
    },
    mounted() {
        this.load();
    },
};
</script>
