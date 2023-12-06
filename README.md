# back-end-API-AmoCRM
Test task for the vacancy Junior Backend Developer (NestJS, Typescript), Russia.

# Тестовое задание веб-разработчика (Node.JS)
```
Нужно разработать back-end сервиса по работе с API AmoCRM. 

**Требования:**

Реализовать метод, который принимает GET запрос с обязательными параметрами:

- name **TEXT** - ФИО клиента
- email **TEXT** - Email почта
- phone **TEXT** - Номер телефона

Используя эти данные, необходимо найти контакт в AmoCRM с данной почтой и/или телефоном. Если такого нет,
создать новый, заполнив имя, телефон и почту. Если найден, обновить его входящими данными. После,
создать сделку по данному контакту в первом статусе воронки.

**Можно использовать:**

- Фреймворк NestJS
- Docker
- Документацию и свой ум

**Нельзя использовать:**

- Библиотеки для AmoCRM

**Критерии оценки:**

- Работоспособность согласно ТЗ
- Архитектура решения
- Удобство чтения кода и комментарии
- Удобство проверки
```

Документация по AmoCRM (https://www.amocrm.ru/developers/content/crm_platform/platform-abilities).
