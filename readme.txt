#vue cli
vue create <project-name>
vue ui
vue add vuetify
yarn serve


#me-pos
npm i vue-property-decorator vue-class-component
yarn add vue-property-decorator vue-class-component


# set auto format on save
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}

Vuetify
-----
<v-app></v-app>
<v-container></v-container>
<v-row></v-row>
<v-col></v-col>
https://vuetifyjs.com/en/components/cards/#cards    


yarn add bcryptjs body-parser cors express formidable fs-extra jsonwebtoken moment mongoose mongoose-sequence onesignal-node
https://www.mongodb.com/try/download/community



// npm install --save material-design-icons-iconfont 
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

# fronend
# vuejs
yarn add axios chart.js material-design-icons-iconfont vue-chartjs vue-moment vue2-filters

# backend
# nodejs
yarn add bcryptjs body-parser cors express formidable fs-extra jsonwebtoken moment mongoose mongoose-sequence onesignal-node

yarn serve
yarn run build
vue ui (to run vue-ui)

#deployment
/usr/local/Cellar/nginx 
vue.config.js

#turn off lint on save
# create vue.config.js and add this code
module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
};




baseUrl: process.env.NODE_ENV === 'production'
  ? '/production-sub-path/'
  : '/'

mongod --dbpath /Users/chaiyasit/Desktop/mongodb_file 
http://travistidwell.com/jsencrypt/demo/


# Deployment
# Fallback
# location / {
        #    root   html;
        #    index  index.html index.htm;
        # }   

        #no sub-folder        
        location / {
            try_files $uri $uri/ /index.html;
        }   
        
        # have sub-folder named "demo"        
        location /demo {
          try_files $uri $uri/ /demo/index.html; 
        } 

        keywords
- vue
  - cli
  - vue create project-name
  - yarn serve
  - public/index.html->body->div(id="app")<----vue loader--->main.js--> App.vue
  - snippet <vue....
  - single component [template, script, styles]
  - component communication 
    1. parent->child : props
    2. child->parent : emit
    3. *<--> : Event bus or Vuex
  - component more directive
    - v-bind:src, v-bind:style, :color
    - v-on:click, v-on:change, :click
  - created
  - methods
  - data (state)
  - normal variable 
  - props
  - vuetify
    
- nodejs


https://github.com/vuetifyjs/vuetify/issues/2508

/usr/local/etc/nginx/nginx.conf