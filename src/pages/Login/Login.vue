<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-white  row justify-center items-center">
        <div class="q-pa-md row items-start q-gutter-md">
          <a href="http://ramaral.com">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAAB5CAMAAACDfHSqAAAAaVBMVEX///9elfz///1Rjfy1zP5dlP3///tYkfzC1f7q8P9XkP1Kiv3R3/38/f+DrPzs8v+Aqf2iv/5snf709/3j7P7W4v3K2/2KsfxAhvy70f1yofximPypxP7u8/yTtv3a5v2Xuvwtfvyox/p5/g0EAAAHmElEQVR4nO2Zi3abOBCGYYQkW0Ig7ubO+v0fcmcE2E6M96RJk/ac1dfWCTejH838M6JB4PF4PB6Px+PxeDwej8fj8Xg8Ho/H4/F4PB6Px/MdQBAIECIAeHUcHHQCnYI/xPpPuH10WMCrq/8gNOiiMC+HhgdMAUWJZ4xnJw43Rjp9NO5S+ihH8Tcpc1MAwWlJrE2maHyprW7qXGZi6cMFdYgh7/NMwJjPOFVLBlDjDjzys6P/L1CZOGeSScm5lIol8/HEwUlP57nvlnFmA8DQV0EZRpBeKjw9ScSsTqa8jn+TMoBTz3i4wrniV3MkDZUZIa4XzKYshzOvcarqztyU1RcKThA/r+AJNzWU/Zncda3ipDXHyvCKlj6GEGKVNE1j+3TclaVdP5R/iYPA6nGZXifrjrLF8xCdsiCiD1RWs7pC5mCfMzSQq71MfzrP6PZjFc9kayflhPVdl+/0Kns2ubfKZjmvRQCV4dNpEiwZYGpdiwBulQPe3vFHJtTUnSTLaMqy56uyGgKzApnS8Qtl7aYMrC3QGCthLhH+DBtRjEIUqnJlLaDiGIibtL0Ufr+wMWFytQuZyD27auHyDv8OinfmSVn7D80ZfQwsgDNa/ERzm12WyVorap5FXVOIchgyjMkxau8+iV6TZe1R9v5WQBRW3eyC33877WdkLJQ1vA1ICMoWnzt9iPmEh8Z6iGZD05+1Y1kLUw5ZXQQQS6WxlneM3ZMORKbZoS/9XkzDwgNktM8TKlPZU/BQmLk/rq3aQswNe2+73HYVcnbGMoePqrxHY6Z48q3K3AAqeSRMR7cbZ4xzWwTv5mwb+Vor9u9aFQZ7AQl2ZSAl68afU4aPHbu/Rj3rkjKCB2XoKKUJPtXgbsrKZkrFjykDiIck7/izMM5aeKMsDHu7YNr8OpuytfW/3fgblVHIpI1Ukj/HIg/1sAlzQ3LKOJ5r65tXYyWeqdMvo+xkxLYL6iiqTbDOjYA5Gk4wh6Gbs3lOXZyaehiqYFVG24W7xnVhdDR2W18pCPgET/owwSgW2/35ihTNP9sdhuvM7MKC9nK5jvaipMaekXYVV0ZcMupYsK3uNR1bepyzQHT6stCstZIppu0kSZmAMtFMKbwmdSl71fgFmk3jV/pNEe8Ojz+UfuQSbT0kPsNE13dlIUeP3O4JJyltp3EooWTUgJhJc9Z3TKrGUFHIFZZHSU+P5sxKKnbQMo5qGTZwbs7KUHISE6oOpcHA8BtyJi/tV/qTMr+XLrVU8QPzluroLwmKiocHi2GnvVWiNkwO5zTC67FNhKsKZVwUcycVPhnTKB62xVjjbXDOAlJGSrjq5jG9SqdstJL38Ti2uNsCpH2IlxTnxn4moXfgXsS4XOA967SOiXIt5IPH8HCrt6gM+xR6QTDg8GZR9qGiLhFSXCpgmOmQn8g24vBBGS0jCgrKxUVji2MoQQhRaa5qmHVIxeWL7xgKzfdQZNN7l9rcQ1iXiPyNecp2K1+oLKciByOJEDWT1DoiOWcpUEeWUr5VLs9WZSN9um9eHSSRajIu5/HxZqiM99HDk/0MANEeYZQ6h+eI0R45jEzM2qmvyui7cFhXdLuwd8uDDjdnzCue3Cv1puyMKmvYXT8wePOtH5ikTIqiwyDlS3WwZvoFZdM6HZRjx98DRXJsnW4qdmXut57LARZMs9WA0B5L6LhsnHk/Kisx5+LgpqzAktOuN0fvsCPEOS7mGbP1V5TZLRhdOBwgghfCMKceonFXdhWLkrgG2oDAKYP3yiRn8cOcYaa26+0yLJYjBnYWovFIOX9aGvbe6zIMo/vwSzAUD3qudZrn4K6MfjGaCiD6ud3MhbItwVbTFYi30Riy9qbMGLTRYS0iVkrKdrxwzvpQ2k/HI97ZzQhb9rc3AGP6wPhixlBZXr5zkBpDqIIZI7sSsLfK2EXn1FQFFX90EC4nUibWSo0R7NYyAFgUh73DjhjvPp9pZLso7P4WwKAhP/BCFjkIRc2mTOKSWZxzLum1R8NlXqC7mJMtsXJpzgeqxR1/6/oKI82cuKtnpJrM0NBoziAqqviiVRTIn56zmq11bN+zMM4/JG2PX6rUaD/RQKWYRoRVWIa43WmWC2xeUEQyLFKS68OqLKCJDZfB4s1dR5zJkDVRhEnPrtifM73UcdRzHX/BHQ17NA8xvMiqZ1R8q9QoE7s+XHk564ZYMYmdklSsxeSZsXFSSsu2kxrd1Cq2YP5FF9zLdIc9q6WOuMESjY2j1FR6WmxC6fWtXo5d7WNAq+/mYabDVfWhsD1QSFlXNl3eNaVYl9DF1XZdZwdXjzA88diUAu4chZhs54pwneS5veKU2sWtDuIJz7KNy11IF6yIXVJ/6fUrFO3NPILso8J62Z/vfSO5flqezZ76qO1cpvsmDrRMnWDqmMz2/x9gynLdNlsjN5bncWtrBBRlmf6+/8Ex2UdDkcu+uvf6m+v/ffx6KGJDXgZ7pOAq5m9VtoKOe2Ef45Kf7h0dvdLX/E+/3P4voBqij1GP4iEBcGkZRe1XPOy7eVqZveTtwumLiw2Px+PxeDwej8fj8Xg8Ho/H4/F4PB6Px+PxeDwej8fj8Xg8/1v+Bc6ib6o8poBQAAAAAElFTkSuQmCC"
              width="300px"
            >
          </a>
        </div>
        <div class="row">
          <q-card>
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  square
                  filled
                  clearable
                  v-model="user.email"
                  type="email"
                  label="email"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="user.password"
                  type="password"
                  label="password"
                />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                @click.prevent="login()"
                unelevated
                color="primary"
                size="lg"
                class="full-width"
                label="Login"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import {
  QLayout,
  QPageContainer, QPage, QCard, QForm,
} from 'quasar';

export default {
  name: 'Login',
  components: {
    QLayout,
    QPageContainer,
    QPage,
    QCard,
    QForm,
  },
  data() {
    return {
      errorLogin: false,
      user: {},
    };
  },
  methods: {
    login() {
      this.$store.dispatch('auth/AUTH_REQUEST', this.user).then(() => {
        this.$router.push({ path: '/' });
      })
        .catch(() => {
          this.$q.notify({
            message: 'Usuário ou senha inválida',
            color: 'red',
            position: 'top',
          });
        });
    },
  },
};
</script>
<style>
.q-card {
  width: 360px;
}
</style>
