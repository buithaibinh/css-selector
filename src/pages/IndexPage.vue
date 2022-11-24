<template>
  <q-page class="row no-wrap bg-indigo-3 transparent">
    <div class="col q-ma-md bg-indigo-1">
      <div class="column full-height">
        <div class="col-auto bg-indigo-2 q-pa-sm">
          <q-btn
            label="Copy selected links to clipboard"
            @click="clickCopyToClipboard"
          ></q-btn>
          <q-btn
            label="Clear all data in localstore"
            @click="clickClearLinks"
          ></q-btn>
        </div>

        <!-- content of the page -->
        <q-scroll-area class="col q-pa-sm bg-indigo-1" visible
          >xx
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const clickCopyToClipboard = () => {
  console.log('clickCopyToClipboard');
};

const clickClearLinks = () => {
  console.log('clickClearLinks');
};
</script>
