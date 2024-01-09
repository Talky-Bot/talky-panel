export const userData = defineStore('userData', {
  state: () => {
    return {
      id: 0,
      username: '',
      loggedIn: false,
      pfpHash: ``,
      servers: {}
    }
  },
  actions: {
    /** 
     * Checks if the user is logged in. If not, refreshes the token. If it fails, the user is marked as logged out.
     */
    async checkLogin() {
      await useFetch('/api/auth/status').then(async (res) => {
        if (res.data.value === 0x0) {
          this.loggedIn = true;
        } else if (res.data.value === 0x1) {
          await useFetch('/api/auth/refresh').then(() => {
            this.loggedIn = true;
          }).catch(() => {
            this.loggedIn = false;
          })
        } else {
          this.loggedIn = false;
        }
      }).catch(() => {
        this.loggedIn = false;
      });
    },

    /**
     * Updates the username, login state, and pfp hash.
     */
    async updateInfo() {
      if (this.loggedIn) {
        await useFetch('/api/data/session').then((res: any) => {
          this.id = res.data.value.id;
          this.username = res.data.value.username;
          this.pfpHash = res.data.value.pfp;
        }).catch(() => {
          this.loggedIn = false; // Since this will be used to show
        });
      }
    },

    /** 
     * Updates the list of servers.
     */
    async updateServers() {
      if (this.loggedIn) {
        await useFetch('/api/data/guilds').then((res: any) => {
          this.servers = res.data.value;
        });
      }
    }
  }
})