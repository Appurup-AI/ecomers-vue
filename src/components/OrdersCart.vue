<script setup>
defineProps({
  order: Object,
})

const statusFormat = (status) => {
  switch (status) {
    case 'pending':
      return 'В процессе'
    case 'complete':
      return 'Выполнен'

    case 'canceled':
      return 'Отменен'
    default:
      return 'Обрабатывается'
  }
}
</script>

<template>
  <div class="order">
    <div class="order__head">
      <div class="order__head-primary">
        Заказ № {{ order.id }} от {{ new Date(order.created_at).toLocaleString('ru-RU') }}
      </div>
      <div class="order__head-status">{{ statusFormat(order.status) }}</div>
    </div>
    <div class="order__body">
      <div class="order__body-info">
        <div class="order__body-info__text">
          <img src="/mail-outline.svg" alt="Иконка телефона" class="icon" />
          <span class="grey">Почта: </span>
          <span>{{ order.email }}</span>
        </div>
        <div class="order__body-info__text">
          <img src="/public/location-outline.svg" alt="" class="icon" />
          <span class="grey">Адрес: </span>
          <span>{{ order.address }}</span>
        </div>
      </div>
      <div
        class="order__body-container"
        v-for="item in order.items"
        :key="item.id"
        :data-id="item.id"
      >
        <img :src="`/public${item.imageUrl}`" alt="" class="order__body-container__img" />
        <div class="order__body-container__description">
          {{ item.title }}
        </div>
        <div class="order__body-container__price">
          <span>Цена: {{ item.price }} ₽</span>
          <span>{{ item.amount }} шт.</span>
        </div>
      </div>

      <div class="order__body-total">
        <div class="order__body-total__price">
          <span>Итого: </span>
          <span>{{ order.price }} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.5rem;
}

.grey {
  color: #8c8c8c;
  margin-right: 0.2rem;
}

.order {
  width: 62rem;

  border-radius: 1.6rem;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  margin-bottom: 1.2rem;

  @media screen and (max-width: $screen-sm) {
    width: 100%;
  }
  &__head {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    padding: 1.2rem 1.6rem 1.2rem 2rem;
    border-bottom: 1px solid #eee;
    border-radius: 1.6rem 1.6rem 0 0;
    @media screen and (max-width: $screen-sm) {
      padding: 0.6rem 0.8rem 0.8rem 1rem;
      justify-content: space-between;
    }
    &-primary {
      font-size: 1.6rem;
      font-weight: 600;
      @media screen and (max-width: $screen-sm) {
        max-width: 70%;
      }
    }

    &-status {
      font-size: 1.2rem;
      padding: 0.3rem 0.8rem;
      border-radius: 0.4rem;
      font-weight: 500;
      color: rgb(124, 76, 255);
      background-color: rgb(242, 237, 255);
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    height: 100%;
    &-info {
      font-size: 1.4rem;
      display: grid;
      grid-template-columns: repeat(2, 50%);
      padding: 2.8rem 2rem 2.4rem;
      border-bottom: 1px solid #eee;
      @media screen and (max-width: $screen-sm) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        padding: 1.2rem 1rem 1.2rem;
      }
      &__text {
        display: flex;
        align-items: center;
      }
    }

    &-container {
      flex: 1;
      padding: 2rem;
      border-bottom: 1px solid #eee;
      display: flex;
      font-size: 1.6rem;
      @media screen and (max-width: $screen-sm) {
        padding: 1rem;
        font-size: 1.5rem;
      }
      &__img {
        max-height: 7rem;
        width: auto;
        margin-right: 1.5rem;
        @media screen and (max-width: $screen-sm) {
          margin-right: 1rem;
        }
      }

      &__description {
        font-size: 1.6rem;
        flex: 1;
      }

      &__price {
        display: flex;
        flex-direction: column;
        text-align: end;
      }
    }

    &-total {
      padding: 2rem;
      font-size: 1.8rem;
      text-align: end;
      margin-top: auto;
      &__price {
      }
    }
  }
}
</style>
