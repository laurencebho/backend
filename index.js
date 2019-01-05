'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
const calendar = require('./calendarAPI.js');
// logging
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

// templating
app.set('views', './views');
app.set('view engine', 'pug');

function render_page(route, template) {
    app.get(route, (req, res) => res.render(`pages/${template}`, {}));
}

render_page('/', 'index');
render_page('/about-us', 'about-us');
render_page('/contact-us', 'contact-us');
render_page('/calendar', 'testcalendar');

app.use('/contact-us', require('./routes/contact-us'));
app.listen(8080, () => {});
