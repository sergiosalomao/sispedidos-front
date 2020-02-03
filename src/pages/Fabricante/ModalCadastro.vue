<template>
  <div class="modal-cadastro-fabricante">
    <q-dialog :value="show" @input="fechar">
      <q-card class="my-card" style="width: 700px; max-width: 150vw;">
        <q-card-section class="bg-primary text-white ">
          <div class="text-h6">Cadastro Fabricante</div>
        </q-card-section>

        <q-card-section >
          <q-form>
            <input type="hidden" v-model="fabricante.id" />
            <div class="q-gutter-md">
              <q-input
                outlined
                v-model="fabricante.nome"
                label="Nome"
              />
               <q-input
               v-mask="['###.###.###-##', '##.###.###/####-##']"
                outlined
                v-model="fabricante.cpfcnpj"
                label="CPF ou CNPJ"
              />
               <q-input
                outlined
                v-model="fabricante.telefone"
                label="Telefone"
              />
                <q-input
                outlined
                v-model="fabricante.contato"
                label="Contato"
              />
                <q-input
                outlined
                v-model="fabricante.email"
                label="Email"
              />
                <q-select filled v-model="fabricante.status" :options="status" label="Status" />
              <q-input
                outlined
                v-model="fabricante.cep"
                label="CEP"
              />
               <q-input
                outlined
                v-model="fabricante.logradouro"
                label="Logradouro"
              />
               <q-input
                outlined
                v-model="fabricante.bairro"
                label="Bairro"
              />
               <q-input
                outlined
                v-model="fabricante.numero"
                label="Numero"
              />
               <q-input
                outlined
                v-model="fabricante.cidade"
                label="Cidade"
              />
               <q-input
                outlined
                v-model="fabricante.uf"
                label="Uf"
              />
                 <q-input outlined type="textarea" v-model="fabricante.obs" label="Observações" />
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
  name: 'ModalCadastroFabricante',
  components: {
    QDialog, QForm,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
       status: ['Ativo','Inativo'],
      fabricante: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.fabricante);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
  watch: {
    edit(newEdit) {
      this.fabricante = { ...newEdit };
    },
  },
};
</script>
