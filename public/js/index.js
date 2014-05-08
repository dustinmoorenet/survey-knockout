function Question(data) {
  var self = this;

  self.text = data.question;
  self.choices = data.choices;
  self.answers = ko.observableArray([]);

  if (_.isArray(data.correct_answer)) {
    self.correct_answers = data.correct_answer;
    self.is_multiple_answer = true;

  } else {
    self.correct_answers = [data.correct_answer];
    self.is_multiple_answer = false;
  }

  self.info = ko.computed(function() {
    return (self.is_multiple_answer
            ? 'pick one or more choices'
            : 'pick one choice');
  });

  self.select = function(answer) {
    var index = _.indexOf(self.choices, answer);

    if (self.is_multiple_answer) {
      // add answer
      if (self.answers.indexOf(index) == -1)
        self.answers.push(index);
      // remove answer
      else
        self.answers.remove(index);

    // not multiple answers and new answer
    } else if (self.answers.indexOf(index) == -1) {
      self.answers.removeAll();
      self.answers.push(index);
    }
  };

  self.isAnswered = ko.computed(function() {
    return !!self.answers().length;
  });

  self.isCorrect = ko.computed(function() {
    var answers = self.answers();

    return (answers.length == self.correct_answers.length
            && _.difference(self.answers(), self.correct_answers).length == 0);
  });
}

function QuestionsViewModel() {
  var self = this;

  self.questions = ko.observableArray([]);
  self.isGraded = ko.observable(false);

  self.answeredQuestionCount = ko.computed(function() {
    var count = 0;

    _.forEach(self.questions(), function(question) {
      count += (question.answers().length ? 1 : 0);
    });

    return count;
  });

  self.displayResults = function() {
    self.isGraded(true);
  }

  self.canGrade = ko.computed(function() {
    return self.questions().length == self.answeredQuestionCount();
  });

  self.buttonText = ko.computed(function() {
    return self.canGrade() ? 'Check Answers' : 'Answer All Questions';
  });
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
