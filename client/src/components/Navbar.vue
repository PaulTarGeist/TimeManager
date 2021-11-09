<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <router-link class="navbar-brand" to="/dashboard">
      TimeManager
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-if="user">
          <router-link class="nav-link" :to="{ name: 'Dashboard' }">
            Dashboard <span class="sr-only">(current)</span></router-link
          >
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'AllUsers' }">
            Users list
          </router-link>
        </li>

        <li class="nav-item dropdown" v-if="user">
          <span
            class="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Working times
          </span>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link
              class="dropdown-item"
              :to="{ name: 'WorkingtimeEdit', query: { userId: user.id } }"
            >
              Create a working time
            </router-link>
            <router-link
              class="dropdown-item"
              :to="{ name: 'AllWorkingtimes' }"
            >
              Working times list
            </router-link>

            <router-link class="dropdown-item" :to="{ name: 'ChartManager' }">
              Charts
            </router-link>
          </div>
        </li>
      </ul>

      <form class="form-inline my-2">
        <ul class="navbar-nav">
          <li class="nav-item dropdown" v-if="user">
            <span
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ user.username }}
            </span>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" :to="{ name: 'Profil' }">
                Profil
              </router-link>

              <div class="dropdown-divider"></div>

              <router-link class="dropdown-item" to="/login" @click="logout">
                Logout
              </router-link>
            </div>
          </li>

          <li class="nav-item" v-if="!user">
            <router-link class="nav-link" :to="{ name: 'Login' }">
              Connexion
            </router-link>
          </li>
          <li class="nav-item" v-if="!user">
            <router-link class="nav-link" :to="{ name: 'Register' }">
              Inscription
            </router-link>
          </li>
        </ul>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: { logout: Function, user: Object },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
