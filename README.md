node-red-contrib-openai
================

Node-RED node for openai



## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-openai, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-openai

## Wrapper openai  API  
- https://beta.openai.com/docs/introduction

## Sample parameters
```js
msg.api = 'completions';
msg.params = {
    "model": "text-davinci-003",
    "prompt": "Say this is a test",
    "max_tokens": 7,
    "temperature": 0
}
return msg;
```

## Sample Flow
You can make this json string into a flow by using the node-red flow import function.

- [sample.json](examples/sample.json)


![alt](examples/sample.png)

![alt](examples/result.png)