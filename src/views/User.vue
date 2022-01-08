<template>
  <div class="user">
    <div v-if="user === null">
      <h1>Please wait a moment</h1>
    </div>
    <div v-else>
      <img :src="user.person.picture" alt="" />
      <h1>{{ user.person.name }}</h1>

      <h2>Skills and Interests</h2>
      <div v-for="key in Object.keys(getProficiency)" :key="key">
        <div v-if="getProficiency[key].length > 0">
          <h2>
            {{ getProficiencyName[key] }}
          </h2>
          <ul>
            <li v-for="strength in getProficiency[key]" :key="strength.id">
              {{ strength }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import torreApi from "../services/user.service";

export default {
  name: "User",
  props: {
    username: {
      required: true,
    },
  },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    getProficiency() {
      const proficiency = {
        master: [],
        expert: [],
        proficient: [],
        novice: [],
        noExperience: [],
      };

      this.user.strengths.forEach((element) => {
        if (element.proficiency == "master") {
          proficiency.master.push(element);
        }
        if (element.proficiency == "expert") {
          proficiency.expert.push(element);
        }
        if (element.proficiency == "proficient") {
          proficiency.proficient.push(element);
        }
        if (element.proficiency == "novice") {
          proficiency.novice.push(element);
        } else {
          proficiency.noExperience.push(element);
        }
      });

      return proficiency;
    },
    getProficiencyName() {
      const proficiencyName = {
        master: "Master / Influencer",
        expert: "Expert",
        proficient: "Proficient",
        novice: "Novice",
        noExperience: "No experience, but interessted",
      };

      return proficiencyName;
    },
  },
  created() {
    torreApi
      .getUser(this.username)
      .then((respuesta) => {
        this.user = respuesta.data;
      })
      .catch(() => {
        console.error("Can´t get connected to API.");
      });
  },
};
</script>
