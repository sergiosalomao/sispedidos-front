<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="primary"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Administração </q-toolbar-title>

        <!-- <q-btn flat round dense icon="more_vert" /> -->
        <span style="fontSize:14px;textAling:right">{{nomeUser}}</span>
        <q-btn-dropdown
          flat round dense        >
          <q-list>

            <q-item
              clickable
              v-close-popup
              @click="logout"
            >
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="primary"
    >
      <q-list>
        <q-item-label header >Menu</q-item-label>
        <q-item to="/">
          <q-item-section avatar>
            <q-icon name="poll" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>Graficos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="cliente">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
            <q-item-label caption>Meus clientes</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="produto">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Produtos</q-item-label>
            <q-item-label caption>Informações dos produtos</q-item-label>
          </q-item-section>
        </q-item>
         <q-item to="categoria">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Categorias</q-item-label>
            <q-item-label caption>Lista categoria dos produtos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="fabricante">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Fabricantes</q-item-label>
            <q-item-label caption>Lista fabricantes</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="fornecedor">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Fornecedores</q-item-label>
            <q-item-label caption>Lista fornecedores</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="usuario">
          <q-item-section avatar>
            <q-icon name="account_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption>Usuarios do sistema</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { QBtnDropdown } from 'quasar';
 import { mapGetters } from 'vuex';
import UsuarioService from '../service/Usuario/UsuarioService';

export default {

  name: 'MyLayout',
  components: { QBtnDropdown },
   computed: { ...mapGetters('user', ['nomeUser']) },
  data() {
    return {
      versao: process.env.APP_VERSAO,
       UsuarioService: new UsuarioService(),
       showModalSobre: false,
      leftDrawerOpen: false,
       usuario: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/AUTH_LOGOUT').then(() => {
        this.$router.push('/login');
      });
    },
    showModal() {
      this.showModalSobre = true;
    },
  },


};
</script>
