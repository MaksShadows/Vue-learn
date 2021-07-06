<template>
  <div>
    <form v-if="!registrationPassed" class="sign-up" @submit.prevent="checkForm">
      <div class="form-group">
        <label for="login">Логин:</label>
        <input
          id="login"
          class="form-control"
          :class="$v.form.login.$error ? 'is-invalid' : ''"
          v-model.trim="form.login"
        >
        <p v-if="$v.form.login.$dirty && !$v.form.login.required" class="invalid-feedback">
          Обязательное поле
        </p>
        <p v-if="$v.form.login.$dirty && !$v.form.login.minLength" class="invalid-feedback">
          Здесь должно быть больше 5-и символов
        </p>
      </div>
      <div class="form-group">
        <label for="login">Почта:</label>
        <input
          id="email"
          type="email"
          class="form-control"
          :class="$v.form.email.$error ? 'is-invalid' : ''"
          v-model.trim="form.email"
        >
        <p v-if="$v.form.login.$dirty && !$v.form.email.required" class="invalid-feedback">
          Обязательное поле
        </p>
        <p v-if="$v.form.login.$dirty && !$v.form.email.email" class="invalid-feedback">
          Email неккоректный
        </p>
      </div>
      <div class="form-group">
        <label for="login">Пароль:</label>
        <input
          id="password"
          type="password"
          class="form-control"
          :class="$v.form.password.$error ? 'is-invalid' : ''"
          v-model.trim="form.password"
        >
        <p v-if="$v.form.login.$dirty && !$v.form.password.required" class="invalid-feedback">
          Обязательное поле
        </p>
      </div>
      <div class="form-group">
        <label for="country">Страна проживания:</label>
        <select id="country" class="form-control" v-model="form.country">
          <option
          v-for="(country, index) in countries"
          :value="country.value"
          :key="index"
          >
            {{ country.label }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="themes">Любимые темы:</label>
        <select
          id="themes"
          class="form-control"
          :class="$v.form.favoiriteThemes.$error ? 'is-invalid' : ''"
          v-model="form.favoiriteThemes" multiple
        >
          <option
          v-for="(theme, index) in themes"
          :value="theme.value"
          :key="index"
          >
            {{ theme.label }}
          </option>
        </select>
        <p v-if="$v.form.favoiriteThemes.$dirty && !$v.form.favoiriteThemes.maxCount" class="invalid-feedback">
          Не больше 3-х тем
        </p>
      </div>
      <div class="form-group form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="agreeWithRules"
          v-model="form.agreeWithRules"
        >
        <label class="form-check-label" :class="$v.form.agreeWithRules.$error ? 'is-invalid' : ''" for="agreeWithRules">Ознакомлен(а) с правилами</label>
        <p v-if="$v.form.agreeWithRules.$dirty && !$v.form.agreeWithRules.mustBeTrue" class="invalid-feedback">
          Прочтите правила !
        </p>
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="notification" v-model="form.agreeWithSendEmail">
        <label class="form-check-label" for="notification">Уведомлять меня о новых курсах</label>
      </div>
      <div class="flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" value="male" name="exampleRadios" id="male" v-model="form.gendere" >
          <label class="form-check-label" for="male">
            Мужчина
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" value="female" name="exampleRadios" id="female" v-model="form.gendere">
          <label class="form-check-label" for="female">
            Женщина
          </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </form>
    <div v-else>
      <h1>
        {{ `${ form.login }, поздравляем вы успешно зарегистрированы!` }}
      </h1>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      registrationPassed: false,
      form: {
        login: '',
        email: '',
        password: '',
        country: 'Russia',
        favoiriteThemes: ['IT'],
        agreeWithRules: false,
        agreeWithSendEmail: false,
        gendere: 'male'
      },
      countries: [
        {
          label: 'Россия',
          value: 'Russia'
        },
        {
          label: 'Украина',
          value: 'Ukraine'
        },
        {
          label: 'США',
          value: 'USA'
        }
      ],
      themes: [
         {
          label: 'Технологии',
          value: 'IT'
        },
        {
          label: 'Языки',
          value: 'languages'
        },
        {
          label: 'Математика',
          value: 'mathematics'
        },
        {
          label: 'История',
          value: 'history'
        }
      ]
    }
  },
  validations: {
    form: {
      login: { required, minLength: minLength(5)},
      email: { required, email },
      password: { required },
      agreeWithRules: { 
        mustBeTrue(value) {
          return value
        }
       },
      favoiriteThemes: {
        maxCount(value) {
          return value.length <= 3
        }
      }
    }
  },
  methods: {
    checkForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.registrationPassed = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-control {
  width: 400px;
}
.form-check {
  margin-right: 10px;
}
button {
  margin-top: 15px;
}
</style>