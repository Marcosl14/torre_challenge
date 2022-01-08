<template>
  <div class="strength">
    <div v-if="strength === null">
      <h1>Please wait a moment</h1>
    </div>
    <div v-else>
      <h2>Profiency: {{ getProficiencyName }}</h2>
      <h2>Recommendations: {{ strength.recommendations }}</h2>
    </div>
  </div>
</template>

<script>
import torreApi from "../services/user.service";

export default {
  props: {
    username: {
      required: true,
    },
    id: {
      required: true,
    },
  },
  data() {
    return {
      strength: null,
    };
  },
  computed: {
    getProficiencyName() {
      if (this.strength.proficiency == "master") {
        return "Master / Influencer";
      }
      if (this.strength.proficiency == "expert") {
        return "Expert";
      }
      if (this.strength.proficiency == "proficient") {
        return "Proficient";
      }
      if (this.strength.proficiency == "novice") {
        return "Novice";
      } else {
        return "No experience, but interessted";
      }
    },
  },
  created() {
    torreApi
      .getUser(this.username)
      .then((respuesta) => {
        this.strength = respuesta.data.strengths.filter(
          (s) => s.id == this.id
        )[0];
      })
      .catch(() => {
        console.error("Can´t get connected to API.");
      });
  },
};
</script>
