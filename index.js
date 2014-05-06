var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic(__dirname + '/public'));

app.get('/questions', function(req, res) {
  res.json([
    {question: 'hey why?', possible_answers: ['no', 'maybe', 'ok', 'what?'], correct_answer: 0},
    {question: 'could you give me a correct answer for this possible question?', possible_answers: ['cat in the road', 'dog in the house', 'cart in the tree', 'hog in the pin'], correct_answer: [1,3]},
    {question: 'hey why?', possible_answers: ['no', 'maybe', 'ok', 'what?'], correct_answer: 0},
    {question: 'could you give me a correct answer for this possible question?', possible_answers: ['cat in the road', 'dog in the house', 'cart in the tree', 'hog in the pin'], correct_answer: [1,3]}
  ]);
});

app.listen(3009);
