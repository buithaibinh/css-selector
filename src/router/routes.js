const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/IndexPage.vue') }]
  }
  // {
  //   // code from:
  //   // https://quasar.dev/quasar-cli/developing-browser-extensions/types-of-bex#Dev-Tools%2C-Options-and-Popup
  //   path: '/',
  //   component: () => import('layouts/BrowserLayout.vue'),
  //   children: [
  //     { path: 'options', component: () => import('pages/OptionsPage.vue') },
  //     { path: 'popup', component: () => import('pages/PopupPage.vue') },
  //     { path: 'sidebar', component: () => import('pages/SidebarPage.vue') },
  //     { path: 'devtools', component: () => import('pages/DevToolsPage.vue') }
  //   ]
  // }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  });
}

export default routes;
