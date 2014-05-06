function Question(data) {
  var self = this;

  self.text = data.question;
  self.possible_answers = data.possible_answers;
  self.chosen_answers = ko.observableArray

  if (_.isArray(data.correct_answer)) {
    self.correct_answers = data.correct_answer;
    self.is_multiple_choice = true;

  } else {
    self.correct_answers = [data.correct_answer];
    self.is_multiple_choice = false;
  }
}

function QuestionsViewModel() {
  var self = this;

  self.questions = ko.observableArray([]);
}

$(function() {
  var questions_view_model = new QuestionsViewModel();

  $.getJSON('/questions')
  .done(function(questions) {
    _.forEach(questions, function(question) {
      questions_view_model.questions.push(new Question(question));
    });

    ko.applyBindings(questions_view_model);
  });
});
