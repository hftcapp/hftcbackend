const Quiz = require("../Models/Quiz");
const Quizresult = require("../Models/Quizresult");
const Productsscoresecom = require("../Models/Productscorerecom");

const addQuestion = async (req, res) => {
  console.log(req.body);
  const { question, option1, option2, option3 } = req.body;

  const createdQuestion = new Quiz({
    question,
    option1,
    option2,
    option3,
  });

  try {
    createdQuestion.save((err) => {
      if (err) {
        res.json({
          success: false,
          data: err,
          message: "Creating Question failed",
        });
        return;
      } else {
        console.log({ message: "Question created", createdQuestion });

        res.status(200).send({
          message: "Question created",
          success: true,
        });
      }
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
      message: "Creating Question failed",
    });
  }
};

const editQuestion = async (req, res) => {
  const { question, option1, option2, option3, _id } = req.body;

  try {
    let updatedQuestion = Quiz.updateOne(
      { _id: _id },

      {
        $set: { question, option1, option2, option3 },
      }
    )
      .then((response) => {
        console.log(response);
        res.json({ success: true, message: "Question Updated" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false, message: "Question  Updating Error" });
      });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error Saving ImagesS",
    });
  }
};

const deleteQuestion = async (req, res) => {
  console.log(req.body);

  const { id } = req.body;

  console.log(id);

  try {
    let quiz = await Quiz.deleteOne({ _id: id });
    res.json({ success: true, message: "Question deleted" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Deleteing Failed" });
    return;
  }
};

const getQuestions = async (req, res) => {
  const questions = await Quiz.find({});
  if (questions) {
    res.json({
      success: true,
      questions,
      message: "Questions Found",
    });
    return;
  } else {
    res.json({
      success: false,
      message: "Questions not Found",
    });
    return;
  }
};

const saveQuizResult = async (req, res) => {
  const { answers, result, userId } = req.body;

  const createdQuizResult = new Quizresult({
    answers: answers,
    result,
    user: userId,
  });
  try {
    createdQuizResult.save(async (err) => {
      if (err) {
        res.json({
          success: false,
          data: err,
          message: "Result saving failed",
        });
        return;
      } else {
        console.log({ message: "Result Saved", createdQuizResult });
        let products;
        if (result === 1) {
          products = await Productsscoresecom.find({ name: "1" });
          res.status(200).send({
            message: "Your Result is saved",
            success: true,
            products,
          });
          return;
        } else if (result === 2) {
          products = await Productsscoresecom.find({ name: "2" });
          res.status(200).send({
            message: "Your Result is saved",
            success: true,
            products,
          });
          return;
        } else if (result === 3) {
          products = await Productsscoresecom.find({ name: "3" });
          res.status(200).send({
            message: "Your Result is saved",
            success: true,
            products,
          });
          return;
        }
      }
    });
  } catch (err) {
    res.json({
      success: false,
      data: err,
      message: "Result Saving failed",
    });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  saveQuizResult,
  editQuestion,
  deleteQuestion,
};