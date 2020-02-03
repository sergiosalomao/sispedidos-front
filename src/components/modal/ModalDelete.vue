<template>
  <div class="modal-delete">

    <q-dialog
      :value="dialog"
      persistent
      @input="fechar"
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="warning"
            color="primary"
            text-color="white"
          />
          <span class="q-ml-sm">Deseja excluir este registro?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Não"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Sim"
            color="primary"
            @click="confirm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'ModalDelete',
  props: ['item', 'dialog'],
  methods: {
    confirm() {
      this.$emit('deletar', this.item);
    },
    fechar() {
      this.$emit('fechar');
    },
  },
};
</script>
