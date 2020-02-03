<template>
  <div class="modal-sobre">

    <q-dialog
      :value="dialog"
      persistent
      @input="fechar"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Sobre</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Sistema de cadastro de atividades, registrado para RAMARAL
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'ModalSobre',
  props: ['dialog'],
  methods: {
   
    fechar() {
      this.$emit('fechar');
    },
  },
};
</script>
