const express = require("express");
const { auth, validate } = require("../../middlewares");
const { tryToDo } = require("../../lib");
const {
  createSchema,
  updateSchema,
  patchSchema,
} = require("../../models/contact");
const {
  getAll,
  getById,
  create,
  removeById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", auth, tryToDo(getAll));

router.get("/:contactId", auth, tryToDo(getById));

router.delete("/:contactId", auth, tryToDo(removeById));

router.post("/", auth, validate(createSchema), tryToDo(create));

router.put("/:contactId", auth, validate(updateSchema), tryToDo(updateById));

router.patch(
  "/:contactId/favorite",
  auth,
  validate(patchSchema),
  tryToDo(updateFavorite)
);

module.exports = router;
