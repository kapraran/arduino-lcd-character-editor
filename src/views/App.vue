<template>
  <div id="app">
    <AppBar></AppBar>

    <main>
      <CharEditor></CharEditor>
      <SourceCode></SourceCode>
      <CharCollection></CharCollection>
    </main>
  </div>
</template>

<script>
import AppBar from '../components/AppBar'
import CharEditor from './CharEditor'
import SourceCode from './SourceCode'
import CharCollection from './CharCollection'

export default {
  components: {
    AppBar,
    CharEditor,
    SourceCode,
    CharCollection,
  },
}
</script>

<style lang="scss"></style>
