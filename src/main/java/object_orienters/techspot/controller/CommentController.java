package object_orienters.techspot.controller;

import object_orienters.techspot.CommentModelAssembler;
import object_orienters.techspot.model.Content;
import object_orienters.techspot.repository.ContentRepository;
import object_orienters.techspot.repository.PostRepository;
import object_orienters.techspot.exception.CommentNotFoundException;
import object_orienters.techspot.exception.PostNotFoundException;
import object_orienters.techspot.model.Comment;
import object_orienters.techspot.model.Post;
import object_orienters.techspot.repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    //private  CommentService commentService;
    private final CommentModelAssembler commentModelAssembler;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final ContentRepository contentRepository;

    CommentController(CommentRepository commentRepository, PostRepository postRepository , ContentRepository contentRepository, CommentModelAssembler commentModelAssembler){
        this.commentModelAssembler = commentModelAssembler;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.contentRepository = contentRepository;

    }

    @GetMapping("/posts/{postId}/comments")
    public CollectionModel<EntityModel<Content>> getCommentsOfPost(@PathVariable long postId) throws PostNotFoundException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
        return  commentModelAssembler.toCollectionModel(post.getComments());
    }
    //TODO: Change to /posts/{ContentID}/comments
    @PostMapping("/posts/{contentId}/comments")
    public EntityModel<Content> addCommentToPost(@PathVariable long contentId, @RequestBody Comment newComment) throws PostNotFoundException {
        log.info("Adding comment to post with id: " + contentId);
        Content post = contentRepository.findById(contentId)
                .orElseThrow(() -> new PostNotFoundException(contentId));
        newComment.setCommentedOn(post);
        Comment savedComment = commentRepository.save(newComment);
       // post.getComments().add(newComment);
        contentRepository.save(post);
        return commentModelAssembler.toModel( savedComment);
    }

    Logger log = LoggerFactory.getLogger(CommentController.class);


}
