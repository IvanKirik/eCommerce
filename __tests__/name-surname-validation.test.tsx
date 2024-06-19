import { describe, expect, test } from 'vitest';

import { nameValidation, surnameValidation } from '../src/validators/name-surname-validation';

describe('Function nameValidation works correctly', () => {
  test('expect correct returned value from nameValidation', () => {
    expect(nameValidation()).toStrictEqual({
      pattern: {
        value: /^[А-ЯЁ][а-яё]+$/,
        message:
          'Имя должно содержать только кириллические символы и начинаться с большой буквы',
      },
      required: {
        value: true,
        message: 'Поле обязательно для заполнения!',
      },
    });
  }),
  test('expect correct returned value from nameValidation', () => {
    expect(surnameValidation()).toStrictEqual({
      pattern: {
        value: /^[А-ЯЁ][а-яё]+$/,
        message:
          'Фамилия должна содержать только кириллические символы, начинаться с большой буквы и содержать не менее двух символов',
      },
      required: {
        value: true,
        message: 'Поле обязательно для заполнения!',
      },
    });
  });
},

);


