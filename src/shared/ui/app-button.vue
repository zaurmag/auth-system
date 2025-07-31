<script setup lang="ts">
type Theme = 'primary' | 'warning' | 'danger' | 'success'

interface IProps {
  size?: 'sm' | 'lg'
  theme?: Theme
}

defineProps<IProps>()
</script>

<template>
  <button :class="['btn', size ? `btn--${size}` : '', theme ? `btn--${theme}` : '']">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-radius;
}

// Theme-color-variables
$theme-colors: (
  'primary': $blue,
  'warning': $yellow,
  'danger': $red,
  'success': $green,
);

// Vars
$btn-padding-y-lg: $input-btn-padding-y-lg !default;
$btn-padding-x-lg: $input-btn-padding-x-lg !default;
$btn-font-size-lg: $input-btn-font-size-lg !default;

$btn-border-radius: $border-radius !default;
$btn-border-radius-sm: $border-radius-sm !default;
$btn-border-radius-lg: $border-radius-lg !default;
$btn-line-height: $input-btn-line-height !default;

.btn {
  border: none;
  border-radius: 0.25rem;
  background-color: transparent;
  user-select: none;
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  font-size: $font-size-base;
  padding: $btn-padding-y $btn-padding-x;
  cursor: pointer;

  // Theme
  @each $color, $value in $theme-colors {
    &--#{$color} {
      background-color: $value;
      border-color: $value;
      color: $white;
    }
  }

  &--link {
    background-color: transparent;
    border: none;
    text-decoration: underline;
    color: $btn-link-color;
  }

  // Sizes
  &--lg {
    @include button-size(
      $btn-padding-y-lg,
      $btn-padding-x-lg,
      $btn-font-size-lg,
      $btn-border-radius-lg
    );
  }

  &--sm {
    @include button-size(
      $btn-padding-y-sm,
      $btn-padding-x-sm,
      $btn-font-size-sm,
      $btn-border-radius-sm
    );
  }
}
</style>
