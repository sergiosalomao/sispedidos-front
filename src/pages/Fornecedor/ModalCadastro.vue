<template>
  <div class="modal-cadastro-fornecedor">
    <q-dialog :value="show" @input="fechar">
      <q-card class="my-card" style="width: 700px; max-width: 150vw;">
        <q-card-section class="bg-primary text-white ">
          <div class="text-h6">Cadastro Fornecedor</div>
        </q-card-section>

        <q-card-section >
          <q-form>
            <input type="hidden" v-model="fornecedor.id" />
            <div class="q-gutter-md">
              <q-input
                outlined
                v-model="fornecedor.nome"
                label="Nome"
              />
               <q-input
               v-mask="['###.###.###-##', '##.###.###/####-##']"
                outlined
                v-model="fornecedor.cpfcnpj"
                label="CPF ou CNPJ"
              />
               <q-input
                outlined
                v-model="fornecedor.telefone"
                label="Telefone"
              />
                <q-input
                outlined
                v-model="fornecedor.contato"
                label="Contato"
              />
                <q-input
                outlined
                v-model="fornecedor.email"
                label="Email"
              />
                <q-select filled v-model="fornecedor.status" :options="status" label="Status" />
              <q-input
                outlined
                v-model="fornecedor.cep"
                label="CEP"
              />
               <q-input
                outlined
                v-model="fornecedor.logradouro"
                label="Logradouro"
              />
               <q-input
                outlined
                v-model="fornecedor.bairro"
                label="Bairro"
              />
               <q-input
                outlined
                v-model="fornecedor.numero"
                label="Numero"
              />
               <q-input
                outlined
                v-model="fornecedor.cidade"
                label="Cidade"
              />
               <q-input
                outlined
                v-model="fornecedor.uf"
                label="Uf"
              />
                 <q-input outlined type="textarea" v-model="fornecedor.obs" label="Observações" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal"
        >
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
import {
  QDialog, QForm,
} from 'quasar';
import { mask } from 'vue-the-mask';


export default {
  name: 'ModalCadastroFornecedor',
  components: {
    QDialog, QForm,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
      status: ['Ativo','Inativo'],
      fornecedor: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.fornecedor);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
  watch: {
    edit(newEdit) {
      this.fornecedor = { ...newEdit };
    },
  },
};
</script>
