export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.getters.hasToken) {
      return redirect('/login?needLogin=1')
    }
  }