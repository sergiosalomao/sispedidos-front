<template>
  <q-page padding>
    <title-component
      title="Atividades"
      subtitle="Acompanhamento de atividades"
    />

    <div class="q-gutter-sm">
      <card-component
        title="Iniciadas"
        color="bg-primary"
        :information="totalAtividades.totalIniciado"
      />

      <card-component
        title="Não Iniciadas"
        color="bg-red-9"
        :information="totalAtividades.totalNaoIniciado"
      />

      <card-component
        title="Em Andamento"
        color="bg-amber"
        :information="totalAtividades.totalEmAndamento"
      />

      <card-component
        title="Concluídas"
        color="bg-green"
        :information="totalAtividades.totalConcluido"
      />

    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar';
import AtividadeService from '../../service/Atividade/AtividadeService';
import TitleComponent from '../../components/Title/TitleComponent';
import CardComponent from './CardComponent';

export default {
  components: { QPage, TitleComponent, CardComponent },
  data() {
    return {
      AtividadeService: new AtividadeService(),
      totalAtividades: [],
    };
  },
  methods: {
    async loadAtividades() {
      const data = await this.AtividadeService.totalAtividades();
      this.totalAtividades = data;
    },

    atualiza() {
      setInterval(() => {
        this.loadAtividades();
      }, 5000);
    },

  },
  created() {
    this.loadAtividades();
  },

};
</script>
