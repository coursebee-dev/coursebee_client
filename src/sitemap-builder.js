const router = require('./router').default;
const Sitemap = require('../').default;
 
(
    new Sitemap(router)
        .build('https://www.coursebee.com')
        .save('./sitemap.xml')
);