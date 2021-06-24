# Миграция баз в Atlas

Этот скрипт помогает автоматизировать миграцию в облачную базу MongoDB Atlas.

Устанавливаем пакеты:

```javascript
yarn install
```

Для начала необходимо создать фоновое SSH подключение к нашему серверу, с туннелями к базам данных.

 

```javascript
ssh -fN -L 28032:localhost:27032 v.angolenko@prod02.connect.do.deepvision.team
```

Можно сгенерировать команды под каждый туннель:

```javascript
yarn generate-tunnels v.angolenko@prod02.connect.do.deepvision.team 
```

Я запускаю несколько туннелей под каждую базу. Но можно найти способ поудобней, если будет время.

![https://i.ibb.co/2c1Kv4Y/tunels.png](https://i.ibb.co/2c1Kv4Y/tunels.png)

Далее, в *migrations.ts* описываем доступы к базе источнику и базе на атласе:

```javascript
export default [
  {
    name: 'Atomic DB',
    db: {
      name: 'atomic',
      port: 28032,
      username: 'connect',
      password: 'xxx',
    },
    atlas: {
      uri: 'mongodb+srv://atomic-dv01:xxx@con-dv01.tr0jc.mongodb.net',
      dbName: 'atomic',
    },
  },
  ....
]
```

Когда все миграции описаны, можно запускать скрипт:

```javascript
yarn start
```

---

![https://i.ibb.co/c83RBpD/done.png](https://i.ibb.co/c83RBpD/done.png)