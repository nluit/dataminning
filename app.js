var express = require("express");
var fs = require("fs");
var mongoose = require("mongoose");
var path = require("path");
var config = require("./config/config")
var DATA = require("./models/data");


var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.getConnectionString()).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/import')));

app.get('/', function(req, res) {

    res.render("index");


})

app.get('/home/:id', function(req, res) {

    var query = DATA.find({ _id: req.params.id }).exec(async function(err, data) {
        if (err) {
            console.log(err);
            redirect("/");
        }
        console.log(data[0].id)
        res.render("home", { data: data });
    })
})

app.post('/', urlencodedParser, function(req, res) {
    var link = req.body.file;

    // console.log(link);

    setTimeout(async function() {
        var a = {};
        var X = [];
        var Y = [];
        var XX = [];
        var YY = [];
        var XY = [];
        var sumXY = 0;
        var sumX = 0;
        var sumXX = 0;
        var sumY = 0;
        var sumYY = 0;
        fs.readFile(`./import/${link}`, 'utf8', function(err, data) {
            a = JSON.parse(data);
            var a = Object.entries(a);
            for (var i = 0; i < a.length; i++) {
                X.push(a[i][1].x);
                Y.push(a[i][1].y);
                XY.push(a[i][1].x * a[i][1].y);
            }
            for (var i = 0; i < X.length; i++) {
                XX[i] = X[i] * X[i];
                sumX = sumX + X[i];

            }
            for (var j = 0; j < Y.length; j++) {

                YY[j] = Y[j] * Y[j];
                sumY = sumY + Y[j];

            }

            for (var j = 0; j < YY.length; j++) {

                sumYY = sumYY + YY[j];

            }
            for (var j = 0; j < XX.length; j++) {

                sumXX = sumXX + XX[j];

            }

            for (var j = 0; j < XY.length; j++) {

                sumXY = sumXY + XY[j];

            }


            var avgX = sumX / X.length;
            var avgY = sumY / X.length;
            var avgXX = sumXX / XX.length;
            var avgYY = sumYY / YY.length;
            var avgXY = sumXY / a.length;
            // console.log(avgXX);
            var SUM1 = avgXX - avgX * avgX;
            var SUM2 = avgYY - avgY * avgY;
            var a1 = Math.sqrt(SUM1);
            var a2 = Math.sqrt(SUM2);

            var b1 = (avgXY - avgY * avgX) / SUM1;
            var b0 = avgY - b1 * avgX;

            var r = b1 * (a1 / a2);

            setTimeout(function() {
                var newdata = new DATA({
                    X: X,
                    Y: Y,
                    XX: XX,
                    YY: YY,
                    XY: XY,

                    avgX: avgX,
                    avgY: avgY,
                    avgXX: avgXX,
                    avgYY: avgYY,
                    avgXY: avgXY,

                    sumX: sumX,
                    sumY: sumY,
                    sumXX: sumXX,
                    sumYY: sumYY,
                    sumXY: sumXY,

                    length: X.length,
                    r: r

                })
                newdata.save(function(err, book) {
                    if (err) return console.error(err);
                });
                var query = DATA.find({}).sort({ date: -1 }).exec(async function(err, data) {
                    if (err) {
                        console.log(err);
                        redirect("/");
                    }
                    var obj = data[0].id;
                    res.redirect("/home/" + obj);

                })


            }, 0);


        })


    }, 0);
})

var port = process.env.PORT || 3000;


app.listen(port, function() {
    console.log("app listen port" + port);
})