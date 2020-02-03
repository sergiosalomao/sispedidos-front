<template>
  <div class="modal-cadastro-cliente">
    <q-dialog :value="show" @input="fechar">
      <q-card class="my-card" style="width: 700px; max-width: 150vw;">
        <q-card-section class="bg-primary text-white ">
          <div class="text-h6">Cadastro Cliente</div>
        </q-card-section>

        <q-card-section >
          <q-form>
            <input type="hidden" v-model="cliente.id" />
            <div class="q-gutter-md">
              <q-input
                outlined
                v-model="cliente.nome"
                label="Nome"
              />
               <q-input
               v-mask="['###.###.###-##', '##.###.###/####-##']"
                outlined
                v-model="cliente.cpfcnpj"
                label="CPF ou CNPJ"
              />
               <q-input
                outlined
                v-model="cliente.telefone"
                label="Telefone"
              />
                <q-input
                outlined
                v-model="cliente.contato"
                label="Contato"
              />
                <q-input
                outlined
                v-model="cliente.email"
                label="Email"
              />
                <q-select filled v-model="cliente.status" :options="status" label="Status" />
              <q-input
                outlined
                v-model="cliente.cep"
                label="CEP"
              />
               <q-input
                outlined
                v-model="cliente.logradouro"
                label="Logradouro"
              />
               <q-input
                outlined
                v-model="cliente.bairro"
                label="Bairro"
              />
               <q-input
                outlined
                v-model="cliente.numero"
                label="Numero"
              />
               <q-input
                outlined
                v-model="cliente.cidade"
                label="Cidade"
              />
               <q-input
                outlined
                v-model="cliente.uf"
                label="Uf"
              />
                 <q-input outlined type="textarea" v-model="cliente.obs" label="Observações" />
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
  name: 'ModalCadastroCliente',
  components: {
    QDialog, QForm,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
      cliente: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.cliente);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
  watch: {
    edit(newEdit) {
      this.cliente = { ...newEdit };
    },
  },
};
</script>
