var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic(__dirname + '/public'));

app.get('/questions', function(req, res) {
  res.json([
    {question: 'What color is the sky?', choices: ['red', 'green', 'blue', 'dreams'], correct_answer: 2},
    {question: 'Which is a unit of length?', choices: ['meter', 'pound', 'watt', 'foot'], correct_answer: [0,3]},
    {question: 'How many moons does Saturn have?', choices: ['4', '15', '62', '152'], correct_answer: 2},
    {question: 'What is the chemical formula for salt', choices: ['NaCl', 'H2O', 'CO', 'NaHCO3'], correct_answer: 0}
  ]);
});

app.listen(3009);
