const { Comment, User, Products } = require("../db.js");

const getComment = async (req, res) => {
  let commentTable = await Comment.findAll();
  res.send(commentTable);
};

const getProductComments = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(422).send("Missing data");
    const comments = await Comment.findAll({ where: { idProduct: id } });

    res.send(Array.isArray(comments) ? comments : [comments]);
  } catch (error) {
    res.status(422).send(error.message);
  }
};

const getUserComments = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(422).send("Missing data");
    const comments = await Comment.findAll({ where: { idUser: id } });

    res.send(comments);
  } catch (error) {
    res.status(422).send(error.message);
  }
};

const postComment = async (req, res) => {
  try {
    const { comment, rating, idUser, idProduct, userName } = req.body;
    if (!comment || !rating || !idUser || !idProduct || !userName) {
      return res.status(422).send("Missing data");
    }

    const newComment = await Comment.create({
      idUser,
      idProduct,
      comment,
      rating,
      userName,
    });

    res.status(201).send(newComment);
  } catch (error) {
    res.sendStatus(404);
  }
};

const putComment = async (req, res) => {
  try {
    const { comment, rating, idUser, idProduct, userName } = req.body;
    if (!comment || !rating || !idUser || !idProduct || !userName) {
      return res.status(422).send("Missing data");
    }

    await Comment.update(
      {
        idUser,
        idProduct,
        comment,
        rating,
        userName,
      },
      { where: { idUser, idProduct } }
    );

    getProductComments({ params: { id: idProduct } }, res);
  } catch (e) {
    res.status(422).send(e.message);
  }
};

const deleteComment = async (req, res) => {
  const { idProduct, idUser } = req.query;
  try {
    if (!idUser || !idProduct) {
      return res.status(422).send("Missing data");
    }

    await Comment.destroy({
      where: { idUser, idProduct },
    });

    getProductComments({ params: { id: idProduct } }, res);
  } catch (e) {
    res.status(422).send(e.message);
  }
};

module.exports = {
  getComment,
  postComment,
  putComment,
  deleteComment,
  getProductComments,
  getUserComments,
};
