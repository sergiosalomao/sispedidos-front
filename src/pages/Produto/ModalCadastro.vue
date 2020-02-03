<template>
  <div class="modal-cadastro-produto">
    <q-dialog :value="show" @input="fechar">
      <q-card style="width: 700px; max-width: 100vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Cadastro Produto</div>
        </q-card-section>
 
        <q-card-section >
          <q-form>
            <div class="q-gutter-md">
              <q-input
                outlined
                type="date"

                fill-mask
                v-model="produto.data_lancamento"
                label="Data Lancamento"
              />
                <q-input outlined v-model="produto.titulo" label="Titulo" />
                <q-input outlined v-model="produto.descricao" label="Descricao" />
                <q-input outlined v-model="produto.valor" label="Valor" />
                <q-input outlined v-model="produto.codigobarras" label="Codigo de Barras" />
                <q-input outlined v-model="produto.unidade_medida" label="Unidade Medida" />
               

      
            
              <q-select
                emit-value
                map-options
                filled
                v-model="produto.categoria_id"
                :options="categorias"
                label="Categoria"
              />
               <q-select
                emit-value
                map-options
                filled
                v-model="produto.fornecedor_id"
                :options="fornecedores"
                label="Fornecedor"
              />
               <q-select
                emit-value
                map-options
                filled
                v-model="produto.fabricante_id"
                :options="fabricantes"
                label="Fabricante"
              />
               <q-input
                outlined
                type="date"

                fill-mask
                v-model="produto.data_fabricacao"
                label="Data Fabricacao"
              />
               <q-input
                outlined
                type="date"

                fill-mask
                v-model="produto.data_vencimento"
                label="Data Vencimento"
              />
          
              <q-select filled v-model="produto.status" :options="status" label="Status" />
              <q-select
                emit-value
                map-options
                filled
                v-model="produto.user_id"
                :options="users"
                label="Usuario"
              />
              <q-input outlined type="textarea" v-model="produto.obs" label="Observações" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            class="q-mt-md"
            color="grey"
           label="Fechar"
           @click="fechar"

           />
          <q-btn
            label="Salvar"
            @click="salvar"
            type="submit"
            class="q-mt-md"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { QDialog, QForm } from 'quasar';
import CategoriaService from '../../service/Categoria/CategoriaService';
import FornecedorService from '../../service/Fornecedor/FornecedorService';
import FabricanteService from '../../service/Fabricante/FabricanteService';
import UserService from '../../service/Usuario/UsuarioService';

export default {
  name: 'ModalCadastroProduto',
  components: {
    QDialog,
    QForm,
  },
  props: ['show', 'edit'],
  data() {
    return {
      categorias: [],
      fabricantes: [],
      fornecedores: [],
      users: [],
      CategoriaService: new CategoriaService(),
      FornecedorService: new FornecedorService(),
      FabricanteService: new FabricanteService(),
      UserService: new UserService(),
     
      status: ['Disponivel', 'Não Disponivel'],
      produto: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.produto);
    },
    fechar() {
      this.$emit('fechar');
    },
    async loadCategorias() {
      const data = await this.CategoriaService.list();
      this.categorias = data.data.map(item => ({ label: item.descricao, value: item.id }));
    },
    async loadFabricantes() {
      const data = await this.FabricanteService.list();
      this.fabricantes = data.data.map(item => ({ label: item.nome, value: item.id }));
    },
    async loadFornecedores() {
      const data = await this.FornecedorService.list();
      this.fornecedores = data.data.map(item => ({ label: item.nome, value: item.id }));
    },

    async loadUsers() {
      const data = await this.UserService.list();
      this.users = data.data.map(item => ({ label: item.name, value: item.id }));
    },
  },
  mounted() {
    this.loadCategorias();
    this.loadFornecedores();
    this.loadFabricantes();
    
    this.loadUsers();
  },
  watch: {
    edit(newEdit) {
      this.produto = { ...newEdit };
    },
  },
};
</script>
