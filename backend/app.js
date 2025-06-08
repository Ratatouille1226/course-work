const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("./controllers/user");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");
const {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/Post");
const mapPosts = require("./helpers/mapPosts");
const { addComment, deleteComment } = require("./controllers/comment");
const mapComments = require("./helpers/mapComments");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/posts", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, posts: posts.map(mapPosts) } });
});

app.get("/posts/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPosts(post) });
});

app.use(authenticated);

app.post("posts/:id/comment", async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComments(newComment) });
});

app.post(
  "posts/:postId/comment/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
  }
);

app.post("/posts", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.query.title,
    content: req.query.content,
    image: req.query.imageUrl,
  });

  res.send({ data: mapPosts(newPost) });
});

app.patch("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatePost = await editPost(req.params.id, {
    title: req.query.title,
    content: req.query.content,
    image: req.query.imageUrl,
  });

  res.send({ data: mapPosts(updatePost) });
});

app.delete("/posts/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);

  res.send({ error: null });
});

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

mongoose
  .connect(
    "mongodb+srv://kotlyarandrey1226:kf7ugyb2byYmdyMy@cluster1.gclsrfz.mongodb.net/"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Сервер запущен на порте ${port}`);
    });
  });
