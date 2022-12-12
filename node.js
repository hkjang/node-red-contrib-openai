const axios = require("axios")

module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.organization = RED.nodes.getNode(n.creds).credentials.organization;
            this.api_key = RED.nodes.getNode(n.creds).credentials.api_key;
        } else {
            this.organization = "";
            this.api_key = "";
        }

        var node = this;
        this.name = n.name;

        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = msg[i] || node[i];
                }
            }
            if(!node.url){
                if(node.api){
                    node.url = 'https://api.openai.com/v1/'+ node.api.toLowerCase() +'';
                }else{
                    node.url = 'https://api.openai.com/v1/completions';
                }
            }
            // node.error(node.url);
            node.options = {};
            node.options.headers = {};

            node.options.headers['Content-Type'] = 'application/json';
            node.options.headers['OpenAI-Organization'] = node.organization;
            node.options.headers['Authorization'] = 'Bearer ' + node.api_key;

            axios.post(node.url, node.params, node.options)
                .then(function (response){
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function (err){
                    msg.payload = err;
                    node.send(msg);
                });
        });
    }

    RED.nodes.registerType("openai", FunctionNode, {
        credentials: {
            organization: {type:"text"},
            api_key: {type:"text"}
        }
    });

    function openaiApiKey(n){
        RED.nodes.createNode(this, n);
        this.organization = n.organization;
        this.api_key = n.api_key;
    }

    RED.nodes.registerType("openaiApiKey", openaiApiKey,{
        credentials: {
            organization: {type:"text"},
            api_key: {type:"text"}
        }
    });
};
