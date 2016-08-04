# fbmessenger
[![Build Status](https://travis-ci.org/rickydunlop/fbmessenger-node.svg?branch=master)](https://travis-ci.org/rickydunlop/fbmessenger-node)
[![Coverage Status](https://coveralls.io/repos/github/rickydunlop/fbmessenger-node/badge.svg?branch=master)](https://coveralls.io/github/rickydunlop/fbmessenger-node?branch=master)
[![npm version](https://img.shields.io/npm/v/fbmessenger.svg?style=flat)](https://www.npmjs.com/package/fbmessenger)
[![npm](https://img.shields.io/npm/l/fbmessenger.svg?maxAge=2592000)]()

A  library to integrate with the [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform).

## Installation

Execute this line in your app directory:

```
npm install --save fbmessenger
```

Import library into your app:

```javascript
import { Messenger } from 'fbmessenger';
```

Initialize it:

```javascript
let messenger = new Messenger({
  pageAccessToken: '<PAGE_ACCESS_TOKEN>'
});
```


## Configuration of facebook app

First of all visit this official [tutorial](https://developers.facebook.com/docs/messenger-platform/quickstart#steps]) and
make sure you complete these 3 steps:

Steps:

* [Create page on Facebook](https://www.facebook.com/pages/create/) or use existing one if you already have it

* [Create app on Facebook](https://developers.facebook.com/quickstarts/?platform=web) or use existing one if you already have it

* Visit [your developer account](https://developers.facebook.com/apps/) and get the `PAGE_ACCESS_TOKEN`

* Subscribe the app to a page 


## Events

There are 6 types of events we can listen for:

- message
- delivery
- optin
- read
- account_linking
- postback

## Receiving messages

### Event Listeners

```
messenger.on('message', (event) => {
	console.log(event);
});
```

Events are triggered when Facebook posts to the webhook url


## Sending messages

To send a message you can use `send`.
You can send a raw payload or to make it easier you can use the helper classes which are documented below.

Example usage (raw payload):

```
messenger.on('message', () => {
  messenger.send({
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://petersapparel.parseapp.com",
            "title":"Show Website"
          }
        ]
      }
    }
  });
});
```

### User details

Example usage:

```javascript
messenger.on('message', () => {
  messenger.getUser().then((user) => {
    messenger.send({ text: `Hey ${user.first_name} ${user.last_name}` });
  });
});
```

Returns object with user data:

* `first_name`
* `last_name`
* `profile_pic`
* `locale`
* `timezone`
* `gender`


## Elements

### `Text(text)`

`text` - your text message to the user

Returns proper text hash:

```
{ text: 'Hello World!' }
```

Example usage:

```javascript
import { Text } from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new Text('Hello user!'));
});
```

#### `Button(attrs)`

`attrs` - object containing 3 attributes:

- `type` (Allowed values)
	- `web_url`
	- `postback`
	- `phone_number`
	- `account_link`
	- `account_unlink`
- `title`
- `url`


This element must be used with the Button, Generic or Receipt templates.

Returns proper button hash depending on attributes set:

First:

```
{
  type: 'web_url',
  url: 'url',
  title: 'title'
}
```

Second:

```
{
  type: 'postback',
  title: 'title',
  payload: 'payload'
}
```

Example usage (with ButtonTemplate):

```
import {
  Button,
  ButtonTemplate
} from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new ButtonTemplate(
    'Hey user! Watch these buttons:',
    [
      new Button({ type: 'web_url', title: 'Web Url Button', url: 'http://www.example.com' }),
      new Button({ type: 'postback', title: 'Postback Button', payload: 'POSTBACK_INFO' })
    ]
  ));
});
```

### `Element(attrs)`

Example usage:

```
import {
  Button,
  Element,
} from 'fbmessenger';

...
new Element({
  itle: 'Title',
  item_url: 'http://www.example.com',
  image_url: 'http://www.example.com',
  subtitle: 'Subtitle',
  buttons: [
    new Button({ type: 'web_url', title: 'Web Url Button', url: 'http://www.example.com' }),
    new Button({ type: 'postback', title: 'Postback Button', payload: 'POSTBACK_INFO' })
  ]
});
...
```

### `Address(attrs)`

This element must be used with the Receipt template.

Example usage:

```
import { Address } from 'fbmessenger';

...
new Address({
  street_1: '1 Hacker Way',
  street_2: '',
  city: 'Menlo Park',
  postal_code: '94025',
  state: 'CA',
  country: 'US'
});
...
```

### `Summary(attrs)`

This element must be used with the Receipt template.

Example usage:

```
import { Summary } from 'fbmessenger';

...
new Summary({
  subtotal: 75.00,
  shipping_cost: 4.95,
  total_tax: 6.19,
  total_cost: 56.14
});
...
```

### `Adjustment(text, amount)`

This element must be used with the Receipt template.

Example usage:

```
import { Adjustment } from 'fbmessenger';

...
new Adjustment({
  name: 'Adjustment',
  amount: 20
});
...
```

## Attachments

### `Image(url)`

Example usage:

```
import { Image } from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new Image('http://lorempixel.com/400/400/sports/1/'));
});
```

### `Audio(url)`

Example usage:

```
import { Audio } from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new Audio('http://example.com/audio.mp3'));
});
```

### `Video(url)`

Example usage:

```
import { Video } from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new Video('http://example.com/video.mp4'));
});
```

### `File(url)`

Example usage:

```
import { File } from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new File('http://example.com/file.txt'));
});
```

## Templates

### `ButtonTemplate(text, buttons)`

Example usage:

```
import {
  Button,
  ButtonTemplate
} from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new ButtonTemplate(
    'Hey user! Watch these buttons:',
    [
      new Button({ type: 'web_url', title: 'Web Url Button', url: 'http://www.example.com' }),
      new Button({ type: 'postback', title: 'Postback Button', payload: 'POSTBACK_INFO' })
    ]
  ));
});
```

#### `GenericTemplate(bubbles)`

Example usage:

```
import {
  Button,
  Element
  GenericTemplate
} from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new GenericTemplate(
    [
      new Element({
        title: 'Title',
        item_url: 'http://www.example.com',
        image_url: 'http://www.example.com',
        subtitle: 'Subtitle',
        buttons: [
          new Button({ type: 'web_url', title: 'Button', url: 'http://www.example.com' })
        ]
      }),
      ...
    ]
  ));
});
```

#### `ReceiptTemplate(attrs)`

Example usage:

```
import {
  Button,
  Element,
  Address,
  Summary,
  Adjustment,
  ReceiptTemplate
} from 'fbmessenger';

messenger.on('message', () => {
  messenger.send(new ReceiptTemplate({
    recipient_name: 'Name',
    order_number: '123',
    currency: 'USD',
    payment_method: 'Visa',
    order_url: 'http://www.example.com',
    timestamp: '123123123',
    elements: [
      new Element({
        title: 'Title',
        item_url: 'http://www.example.com',
        image_url: 'http://www.example.com',
        subtitle: 'Subtitle',
        buttons: [
          new Button({ type: 'web_url', title: 'Button', url: 'http://www.example.com' })
        ]
      })
    ],
    address: new Address({
      street_1: '1 Hacker Way',
      street_2: '',
      city: 'Menlo Park',
      postal_code: '94025',
      state: 'CA',
      country: 'US'
    }),
    summary: new Summary({
      subtotal: 75.00,
      shipping_cost: 4.95,
      total_tax: 6.19,
      total_cost: 56.14
    }),
    adjustments: [
      new Adjustment('Adjustment', 20)
    ]
  });
});
```

## Express.js (example usage)

This is sample usage within an express.js application. For full example look [here](https://github.com/rickydunlop/fbmessenger/blob/master/example/express-example.js).

```
import { Messenger } from 'fbmessenger';

// Initialize Messenger
let messenger = new Messenger({
  pageAccessToken: '<PAGE_ACCESS_TOKEN>'
});

// here we define some listeners:
messenger.on('message', (event) => {
  // put your logic here
});

messenger.on('delivery', (event) => {
  // put your logic here
});

messenger.on('postback', (event) => {
  // put your logic here
});

messenger.on('optin', (event) => {
  // put your logic here
});

messenger.on('read', (event) => {
  // put your logic here
});

messenger.on('account_linking', (event) => {
  // put your logic here
});

// This example shows how to setup verification using express
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});


// This route handles the webhook callbacks from Facebook
app.post('/webhook', (req, res) => {
  res.sendStatus(200);
  messenger.handle(req.body);
});
```
