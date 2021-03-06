const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Routes goes here — match with "/api/users"
router.route("/:id/albums")
  .get(usersController.findAllUserAlbums);

router.route("/:id/albums/new")
  .post(usersController.createAlbum);

router.route("/:id/albums/:album")
  .post(usersController.addPhototoAlbum);

router.route("/:id/photos/new")
  .post(usersController.createPhoto);

router.route("/:id")
  .get(usersController.findUsersAlbums);

router.route("/:id/comments")
  .post(usersController.createComment)

router.route("/:id/photos/:photoId/like")
  .post(usersController.likePhoto)
  .put(usersController.unlikePhoto); 

router.route("/:id/albums/:albumId/like")
  .post(usersController.likeAlbum)
  .put(usersController.unlikeAlbum)

router.route("/:id/profilephoto")
  .put(usersController.updateProfilePhoto)
  .get(usersController.getUserProfile)


module.exports = router;