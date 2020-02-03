<template>
  <q-page padding>
    <!-- <q-card>
      <q-card-section>
        <div class="text-h6">Cadastro de Cliente</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <input type="hidden" v-model="cliente.id"/>
          <div class="q-col-gutter-md row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
                outlined
                v-model="cliente.nome"
                label="Digite o nome"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
                outlined
                v-model="cliente.cpfcnpj"
                label="Digite o Cpf ou CNPJ"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <div>
          <q-btn
            label="Submit"
            @click.prevent="onSubmit"
            color="primary"
          />
          <q-btn
            @click.prevent="onReset"
            label="Reset"
            color="primary"
            class="q-ml-sm"
            flat
          />
        </div>
      </q-card-actions>
    </q-card> -->

    <q-table
      title="Lista de Clientes"
      :data="clientes"
      :columns="columns"
      row-key="id"
    >
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
          color="red"
          flat
          icon="delete"
        />
      </q-td>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" />
          </q-page-sticky>
  </q-page>
</template>

<script>
import {
  QPageSticky,
  QTable,
} from 'quasar';

import ClienteService from '../service/Cliente/ClienteService';

export default {
  name: 'PageIndex',
  components: {
    QPageSticky,
    QTable,
  },
  data() {
    return {
      ClienteService: new ClienteService(),
      cliente: {},
      clientes: [],
      columns: [
        {
          name: 'nome', label: 'Nome', field: 'nome', align: 'left',
        },
        {
          name: 'cpfcnpj', label: 'CPF/CNPJ', field: 'cpfcnpj', align: 'left',
        },
        {
          name: 'action', label: 'Ação', field: 'action', align: 'left',
        },
      ],
    };
  },
  methods: {
    edit(item) {
      this.cliente = { ...item };
    },
    async onSubmit() {
      await this.ClienteService.createOrUpdate(this.cliente);
      this.load();
      this.onReset();
    },
    async load() {
      const data = await this.ClienteService.list();
      this.clientes = data;
    },
    onReset() {
      this.cliente = {};
    },
  },
  mounted() {
    this.load();
  },
};
</script>
