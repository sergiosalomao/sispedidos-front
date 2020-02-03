<template>
  <div class="modal-cadastro-categoria">
    <q-dialog :value="show" @input="fechar">
      <q-card class="my-card" style="width: 700px; max-width: 150vw;">
        <q-card-section class="bg-primary text-white ">
          <div class="text-h6">Cadastro Categoria</div>
        </q-card-section>

        <q-card-section >
          <q-form>
            <input type="hidden" v-model="categoria.id" />
            <div class="q-gutter-md">
              <q-input
                outlined
                v-model="categoria.descricao"
                label="Nome"
              />
             
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
  name: 'ModalCadastroCategoria',
  components: {
    QDialog, QForm,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
      categoria: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.categoria);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
  watch: {
    edit(newEdit) {
      this.categoria = { ...newEdit };
    },
  },
};
</script>
