<script setup lang="ts">
import { ZmSvgIcon } from 'zm-ui-vue'
</script>

<template>
  <div class="profile container">
    <h1 class="profile__title">DemoUser</h1>

    <div class="profile__row">
      <div class="card">
        <h2 class="card__title">Main info</h2>

        <div class="card__text">
          <p class="card__text-icon">
            <zm-svg-icon name="phone" />
            demo@zaurmag.ru
          </p>

          <p class="card__text-icon">
            <zm-svg-icon name="mail" />
            +7 999 999-99-99
          </p>
        </div>
      </div>

      <div class="card">
        <h2 class="card__title">About</h2>

        <div class="card__text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur dolorem explicabo
            ipsam ipsum mollitia nesciunt odit pariatur quaerat ut. Commodi iure minus natus tempora
            tempore. Animi cumque quia soluta?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: grid;
  grid-gap: 1rem;
  align-items: start;
  border: 1px solid #ddd;
  padding: 20px;
  height: 100%;
  border-radius: 8px;

  &__title {
    font-weight: 500;
    font-size: 22px;
  }

  &__text {
    display: grid;
    grid-gap: 0.5rem;

    &-icon {
      display: grid;
      grid-gap: 0.5rem;
      grid-auto-flow: column;
      align-items: center;
      justify-content: start;

      .icon {
        color: #999;
        width: 18px;
        height: 18px;
      }
    }

    p {
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
    }
  }
}

.profile {
  display: grid;
  grid-gap: 1.5rem;
  color: $dark;

  &__title {
    font-weight: 500;
    font-size: 30px;
    text-align: center;
  }

  &__row {
    display: grid;
    grid-gap: 1.5rem;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
