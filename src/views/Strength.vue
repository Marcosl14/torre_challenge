<template>
  <div class="strength">
    <div class="waiting-container" v-if="user === null">
      <h1>Please wait a moment</h1>
    </div>
    <div v-else>
      <div class="area-container">
        <div class="title-container">
          <h2>Profiency:</h2>
          <h2 class="title-value">{{ getProficiencyName }}</h2>
        </div>
        <div class="title-container">
          <h2>Recommendations:</h2>
          <h2 class="title-value">{{ strength.recommendations }}</h2>
        </div>
      </div>
      <div class="area-container">
        <h2>{{ user.person.name.split(" ")[0] }} related experiences:</h2>
        <div
          class="experience-container"
          v-for="experience in user.experiences"
          :key="experience.id"
        >
          <h2 class="experience-title">{{ experience.name }}</h2>
          <h2 class="experience-description">
            {{ experience.organizations[0].name }}
          </h2>
          <h2 class="experience-description">
            {{ experience.fromMonth }} {{ experience.fromYear }} -
            {{ experience.toMonth }} {{ experience.toYear }}
          </h2>
        </div>
      </div>
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
      user: null,
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
        this.user = respuesta.data;
        this.strength = this.user.strengths.filter((s) => s.id == this.id)[0];
      })
      .catch(() => {
        console.error("Can´t get connected to API.");
      });
  },
};
</script>

<style scoped>
.strength {
  height: 100%;
}

h1 {
  font-size: 46px;
}

.area-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;

  border-bottom: 1px solid rgb(55, 59, 65);

  padding: 40px;
}

h2 {
  margin: 5px;
}

.title-container {
  display: flex;
  flex-direction: row;
}

.title-value {
  color: white;
}

.experience-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.experience-title {
  margin-top: 50px;
  color: rgb(205, 220, 57);
}
</style>
