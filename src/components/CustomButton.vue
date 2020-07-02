<template>
  <button class="custom-button" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  button.custom-button {
    font-size: 14px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    padding: 6px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    white-space: nowrap;
    line-height: 1.44;
    background-color: #CBD5E0;
    color: #171923;
    border: none;
    border-radius: 2px;
    transition: all 250ms ease 0s;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: darken(#CBD5E0, 8%);
    }

    &:focus {
      background-color: darken(#CBD5E0, 8%);
      box-shadow: rgba(66, 153, 225, 0.6) 0px 0px 0px 3px;
    }
  }
</style>