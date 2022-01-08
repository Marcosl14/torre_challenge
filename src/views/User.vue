<template>
  <div class="user">
    <div v-if="user === null">
      <h1>Please wait a moment</h1>
    </div>
    <div v-else>
      <div class="hex">
        <div class="hex-background">
          <img :src="user.person.picture" />
        </div>
      </div>

      <h1>{{ user.person.name }}</h1>

      <div class="skills-container">
        <h2>Skills and Interests:</h2>
        <div v-for="key in Object.keys(getProficiency)" :key="key">
          <div class="strenght-container" v-if="getProficiency[key].length > 0">
            <h2>
              {{ getProficiencyName[key] }}
            </h2>
            <div class="strength-link-container">
              <div
                class="strength-link"
                v-for="strength in getProficiency[key]"
                :key="strength.id"
              >
                <router-link
                  :to="{
                    name: 'Strength',
                    params: { username: username, id: strength.id },
                  }"
                >
                  {{ strength.name }}
                </router-link>
              </div>
            </div>
          </div>
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

    // torreApi
    //   .getOpportunities("8W3bZvDr")
    //   .then((respuesta) => {
    //     console.log(respuesta.data);
    //   })
    //   .catch(() => {
    //     console.error("Can´t get connected to API.");
    //   });
  },
};
</script>

<style scoped>
.hex {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 320px;
  height: 277.12px; /* width * 0.866 */
  background: rgb(94, 98, 107);
  box-sizing: border-box;
  -webkit-clip-path: polygon(
    0% 50%,
    25% 0%,
    75% 0%,
    100% 50%,
    75% 100%,
    25% 100%
  );
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  transform: rotate(30deg);
  margin-top: 40px;
  margin-bottom: 60px;
}

.hex-background {
  position: absolute;
  background-color: white; /*color of the main-background*/
  top: 10px; /* equal to border thickness */
  left: 10px; /* equal to border thickness */
  width: 300px; /* container height - (border thickness * 2) */
  height: 257.12px; /* container height - (border thickness * 2) */
  -webkit-clip-path: polygon(
    0% 50%,
    25% 0%,
    75% 0%,
    100% 50%,
    75% 100%,
    25% 100%
  );
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  /* transform: rotate(-30deg); */
}

.hex img {
  width: 125%;
  height: 125%;
  margin-top: -35px;
  margin-left: -40px;
  object-fit: cover;
  transform: rotate(-30deg);
}

.skills-container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.strenght-container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.strength-link-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.strength-link {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  border-radius: 25px;
  background-color: rgb(55, 59, 65);

  margin-right: 10px;
  margin-bottom: 10px;
}

.strength-link a {
  text-decoration: none;
  padding: 0px 25px;
  color: rgb(167, 169, 172);
}
</style>
