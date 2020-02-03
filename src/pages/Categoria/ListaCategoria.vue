<template>
    <div class="lista-categoria">
        <q-page padding>
            <q-table title="Lista de Categorias" :data="categorias" :columns="columns" row-key="id" hide-bottom :rows-per-page-options="[0]" :pagination.sync="pagination" :loading="loading">
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
        <modal-cadastro :edit="editarCategoria" :show="showModal" @fechar="fecharModal" @salvar="onSubmit($event)" />
        <modal-delete :dialog="showDeleteModal" @fechar="showDeleteModal = false" @deletar="deletar($event)" :item="editarCategoria" />
    </div>
</template>

<script>
import {
    QPage,
    QTable,
    QPageSticky,
} from 'quasar';
import CategoriaService from '../../service/Categoria/CategoriaService';
import ModalCadastro from './ModalCadastro';
import ModalDelete from '../../components/modal/ModalDelete';
import Paginacao from '../../components/table/Paginate';

export default {
    name: 'ListaCategoria',
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
            CategoriaService: new CategoriaService(),
            showModal: false,
            showDeleteModal: false,
            editarCategoria: {},
            categorias: [],
            columns: [{
                    name: 'id',
                    style: 'min-width: 15px; width: 15px',
                    label: '',
                    field: 'id',
                    align: 'center',
                },
                {
                    name: 'descricao',
                    sortable: true,
                    label: 'Nome',
                    field: 'descricao',
                    align: 'left',
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
            this.editarCategoria = { ...item };
            this.showModal = true;
        },
        async onSubmit(categoria) {
            await this.CategoriaService.createOrUpdate(categoria);
            this.notify();
            this.load();
            this.onReset();
            this.fecharModal();
        },
        async load(page) {
            this.loading = true;
            const data = await this.CategoriaService.search({}, page);
            this.loading = false;
            this.lastPage = data.last_page;
            this.currentPage = data.current_page;
            this.categorias = data.data;
        },
        onReset() {
            this.categoria = {};
        },
        fecharModal() {
            this.editarCategoria = {};
            this.showModal = false;
        },

        showModalDelete(item) {
            this.editarCategoria = item;
            this.showDeleteModal = true;
        },
        async deletar(item) {
            await this.CategoriaService.remove(item.id);
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
