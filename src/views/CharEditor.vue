<template>
  <div class="component char-editor">
    <div class="char-editor-container">
      <div class="pixels-row" v-for="i in (0, 8)" :key="i">
        <div class="pixel" v-for="j in (0, 5)" :key="j"></div>
      </div>
    </div>

    <div class="actions">
      <CustomButton>Clear</CustomButton>
      <CustomButton>Fill</CustomButton>
      <CustomButton>Invert</CustomButton>
    </div>
  </div>
</template>

<script>
import CustomButton from '../components/CustomButton'

export default {
  components: {
    CustomButton
  }
}
</script>

<style lang="scss" scoped>
  $pixel-sz: 32px;

  .component.char-editor {
    padding: 16px;
    width: max-content;
  }

  .char-editor-container {
    display: flex;
    flex-direction: column;
    width: max-content;
    background-color: #121;
    padding: 16px;
    border-radius: 2px;

    .pixels-row {
      display: flex;
      flex-direction: row;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      .pixel {
        margin-right: 8px;
        width: $pixel-sz;
        height: $pixel-sz;
        background-color: #232;
        border-radius: 2px;
        cursor: pointer;

        &:hover, &:active {
          background-color: lighten(#232, 4%);
        }

        &.active {
          background-color: #cfc;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  div.actions {
    display: flex;
    flex-direction: column;
    padding: 16px 0;

    .custom-button {
      margin-bottom: 8px;
    }
  }
</style>