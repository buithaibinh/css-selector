<template>
  <q-layout view="hhh lpr fFf" class="target-some-header-class">
    <q-banner dense inline-actions class="text-white bg-red">
      You have lost connection to the internet. This app is offline.
      <template v-slot:action>
        <q-btn flat color="white" label="Turn ON Wifi" />
      </template>
    </q-banner>
    <q-page-container v-if="viewOpened">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>

<style lang="scss" scoped></style>
