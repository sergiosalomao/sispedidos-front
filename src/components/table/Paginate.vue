      <template>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            :value="current_page"
            color="primary"
            :max="last_page"
            :max-pages="6"
            :min-pages="3"
            :boundary-links="true"
            @input="val => onPageChange(val)"
          >
          </q-pagination>
        </div>
      </template>
<script>
import { QPagination } from 'quasar';

export default {
  components: {
    QPagination,
  },
  props: {
    last_page: {
      type: Number,
      required: true,
    },
    current_page: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onPageChange(page) {
      this.$emit('input', page);
    },
  },
};
</script>
