<template>
  <div class="modal-cadastro-usuario">
    <q-dialog
      :value="show"
      @input="fechar"
    >
      <q-card style="width: 700px; max-width: 100vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Cadastro Usuario</div>
        </q-card-section>

        <q-card-section >
          <q-form>
            <input
              type="hidden"
              v-model="usuario.id"
            />
            <div class="q-gutter-md">
              <q-input
                outlined
                v-model="usuario.name"
                label="Nome"
              />
              <q-input
                 :readonly="edit.id!=null"
                outlined
                v-model="usuario.email"
                label="Email"
              />
              <q-input
               :readonly="edit.id!=null"
                v-model="usuario.password"
                outlined
                type="password"

              />
              <q-select
                filled
                v-model="usuario.tipo"
                :options="tipo"
                label="Tipo"
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

export default {
  name: 'ModalCadastroUsuario',
  components: {
    QDialog, QForm,
  },
  props: ['show', 'edit'],
  data() {
    return {
      tipo: ['Administrador', 'Coordenador', 'Usuario'],
      usuario: {},
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.usuario);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
  watch: {
    edit(newEdit) {
      this.usuario = { ...newEdit };
    },
  },
};
</script>
