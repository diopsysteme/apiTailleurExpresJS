import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
export default class UserController {
  static getUser(req, res) {
    const { id } = req.params;
    try {
      const user = Post.getUser(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static getUser2(req, res) {
    try {
      const user = Post.getUser( parseInt(req.user.id));
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static getPosts(req, res) {
    const { id } = req.params;
    try {
      const posts = Post.getUserPosts(id);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static getVotes(req, res) {
    const { id } = req.params;
    try {
      const votes = Post.getVotes(id);
      res.json(votes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static getFollowers(req, res) {
    const { id } = req.params;
    try {
      const followers = Post.getFollowers(id);
      res.json(followers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static getFollowing(req, res) {
    const { id } = req.params;
    try {
      const following = Post.getFollowing(id);
      res.json(following);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static makeComment(req, res) {
    const { userId, postId } = req.params;
    const { comment } = req.body;
    try {
      Post.addComment(userId, postId, comment);
      res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static makeLike(req, res) {
    const { userId, postId } = req.params;
    const { like } = req.body;
    try {
      Post.addLike(userId, postId, like);
      res.status(200).json({ message: "Like added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static followUser(req, res) {
    const { userId, followerId } = req.params;
    try {
      Post.addFollower(userId, followerId);
      res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static unfollowUser(req, res) {
    const { userId, followerId } = req.params;
    try {
      Post.removeFollower(userId, followerId);
      res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static login(req, res) {
    const { mail, password } = req.body;
    const user = Post.findUserBy("mail", mail);
    // res.json({"hd": Post.compPass( password,user.password)})
    if (user && Post.compPass( password,user.password)) {
      // let users=Post.getUsers()
        //jwt.verify(user)

       res.json({...user,token:jwt.sign({id:user.id},process.env.SECRET)})
      res.status(500).json({ success: "connextion reussi" });
    } else {
      res.status(500).json({ error: "login et ou mdp incorrect" });
    }
  }
  static register(req, res) {
    const { nom, prenom, mail, telephone, password, role } = req.body;
    if (Post.findUserBy("mail",mail)||Post.findUserBy("telephone",telephone)) {
      res.status(500).json({ error: "mail ou telephone  déja utilisé" });
      return;
    }
    let newUser = Post.create(nom, prenom, mail, telephone, password, role);
    res.status(200).json(newUser);
  }
}
