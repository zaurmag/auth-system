<script setup lang="ts">
import { ZmSvgIcon } from 'zm-ui-vue'
</script>

<template>
  <div class="profile">
    <h1 class="profile__user-name">DemoUser</h1>

    <div class="profile__row">
      <div class="profile__col profile__col--info">
        <div class="card">
          <h2 class="profile__col-title">Main info</h2>
          <div class="profile__col-text">
            <p class="profile__contact-item">
              <zm-svg-icon name="phone" />
              demo@zaurmag.ru
            </p>
            <p class="profile__contact-item">
              <zm-svg-icon name="mail" />
              +7 999 999-99-99
            </p>
          </div>
        </div>
      </div>
      <div class="profile__col profile__col--about">
        <div class="card">
          <h2 class="profile__col-title">About</h2>
          <div class="profile__col-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur dolorem
              explicabo ipsam ipsum mollitia nesciunt odit pariatur quaerat ut. Commodi iure minus
              natus tempora tempore. Animi cumque quia soluta?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid #ddd;
  padding: 20px;
  height: 100%;
  border-radius: 8px;
}

.profile {
  margin: 20px auto 0;
  max-width: 1280px;
  color: #222;

  &__user-name {
    margin: 0 0 30px;
    font-weight: 500;
    font-size: 30px;
    text-align: center;
  }

  &__row {
    margin: 0 -15px;
  }

  &__col {
    padding: 0 15px;
    width: 100%;

    &-title {
      margin: 0 0 20px;
      font-weight: 500;
      font-size: 22px;
    }

    &-text {
      p {
        margin: 0;
        font-size: 16px;
        line-height: 1.6;
        color: #555;

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }

    &--info {
      margin-bottom: 30px;
    }
  }

  &__contact-item {
    display: flex;
    align-items: center;

    .icon {
      color: #999;
      margin-right: 10px;
      width: 18px;
      height: 18px;
    }
  }

  @media (min-width: 767px) {
    &__row {
      display: flex;
    }

    &__col {
      &--info {
        margin-bottom: 0;
        width: 50%;
      }

      &--about {
        width: 50%;
      }
    }
  }

  @media (min-width: 1024px) {
    &__col {
      &--info {
        width: 30%;
      }

      &--about {
        width: 70%;
      }
    }
  }
}
</style>
