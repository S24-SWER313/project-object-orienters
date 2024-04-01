package object_orienters.techspot.post;

import jakarta.validation.Valid;
import object_orienters.techspot.model.Privacy;
import object_orienters.techspot.profile.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.mediatype.problem.Problem;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/profiles/{username}")
public class PostController {
    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    private final PostModelAssembler assembler;
    private final SharedPostModelAssembler sharedPostAssembler;
    private final ImplePostService postService;
    private final ImplSharedPostService sharedPostService;

    PostController(PostModelAssembler assembler, ImplePostService postService, SharedPostModelAssembler sharedPostAssembler,
                   ImplSharedPostService sharedPostService) {
        this.assembler = assembler;
        this.postService = postService;
        this.sharedPostAssembler = sharedPostAssembler;
        this.sharedPostService = sharedPostService;
    }

    @GetMapping("/posts")
    public ResponseEntity<?> getTimelinePosts(@PathVariable String username) {
        try {
            return ResponseEntity.ok(assembler.toCollectionModel(postService.getTimelinePosts(username)));
        } catch (UserNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("User Not Found").withDetail(exception.getMessage()));
        }
    }

    @PostMapping("/posts")
    @PreAuthorize("#username == authentication.principal.username")
    public ResponseEntity<?> addTimelinePosts(@PathVariable String username, @RequestBody Post post,
                                              @RequestParam(required = false) boolean isShared) {
        if (isShared) {
            try {
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        sharedPostAssembler.toModel(postService.addSharedPost(username, post, post.getPrivacy())));
            } catch (UserNotFoundException exception) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Problem.create().withTitle("User Not Found").withDetail(exception.getMessage()));
            }
        } else {
            try {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(assembler.toModel(postService.addTimelinePosts(username, post)));
            } catch (UserNotFoundException exception) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Problem.create().withTitle("User Not Found").withDetail(exception.getMessage()));
            }
        }
    }

    @PutMapping("/posts/{postId}")
    @PreAuthorize("#username == authentication.principal.username")
    public ResponseEntity<?> editTimelinePost(@PathVariable String username, @PathVariable long postId,
                                              @RequestBody Post newPost) {
        try {
            return ResponseEntity.ok(assembler.toModel(postService.editTimelinePost(username, postId, newPost)));
        } catch (UserNotFoundException | PostNotFoundException | PostUnrelatedToUserException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("Not Found").withDetail(exception.getMessage()));
        }

    }

    @DeleteMapping("/posts/{postId}")
    @PreAuthorize("#username == authentication.principal.username")
    public ResponseEntity<?> deleteTimelinePost(@PathVariable String username, @PathVariable long postId) {
        try {
            postService.deleteTimelinePost(username, postId);
            return ResponseEntity.noContent().build();
        } catch (UserNotFoundException | PostNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("Not Found").withDetail(exception.getMessage()));
        }

    }

    // Todo: the path need to be changed
    @GetMapping("/posts/{postId}")
    public ResponseEntity<?> getPost(@PathVariable long postId, @PathVariable String username) {
        try {
            return ResponseEntity.ok(assembler.toModel(postService.getPost(postId)));
        } catch (PostNotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("Post Not Found").withDetail(exception.getMessage()));
        } catch (ContentIsPrivateException exception) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Problem.create().withTitle("Action Not Allowed").withDetail(exception.getMessage()));
        }

    }

    @PostMapping("/posts/{postId}/share")
    @PreAuthorize("#bodyMap.get(\"sharer\") == authentication.principal.username")
    public ResponseEntity<?> createSharePost(@PathVariable String username, @PathVariable Long postId, @RequestBody Map<String, String> bodyMap) {
        try {
            SharedPost sharedPost = sharedPostService.createSharedPost(bodyMap.get("sharer"), postId, bodyMap.get("privacy"));
            return ResponseEntity.status(HttpStatus.CREATED).body(sharedPostAssembler.toModel(sharedPost));
        } catch (PostNotFoundException exception) {
            exception = new PostNotFoundException(postId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("Post Not Found").withDetail(exception.getMessage()));
        } catch (UserNotFoundException exception) {
            exception = new UserNotFoundException(username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("User Not Found").withDetail(exception.getMessage()));
        }

    }

    @GetMapping("/sharedPosts/{postId}")
    public ResponseEntity<?> getSharedPost(@PathVariable long postId, @PathVariable String username) {
        try {
            return ResponseEntity.ok(sharedPostAssembler.toModel(sharedPostService.getSharedPost(postId)));
        } catch (PostNotFoundException exception) {
            exception = new PostNotFoundException(postId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("Post Not Found").withDetail(exception.getMessage()));
        } catch (UserNotFoundException exception) {
            exception = new UserNotFoundException(username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Problem.create().withTitle("User Not Found").withDetail(exception.getMessage()));
        } catch (ContentIsPrivateException exception) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Problem.create().withTitle("Action Not Allowed").withDetail(exception.getMessage()));
        }

    }

    @DeleteMapping("/sharedPosts/{postId}")
    @PreAuthorize("#username == authentication.principal.username")
    public ResponseEntity<?> deleteSharedPost(@PathVariable String username, @PathVariable Long postId) {
        try {
            sharedPostService.deleteSharedPost(username, postId);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (PostNotFoundException exception) {
            exception = new PostNotFoundException(postId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("Post Not Found").withDetail(exception.getMessage()));
        } catch (UserNotFoundException exception) {
            exception = new UserNotFoundException(username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("User Not Found").withDetail(exception.getMessage()));
        } catch (ContentIsPrivateException exception) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Problem.create().withTitle("Action Not Allowed").withDetail(exception.getMessage()));
        }
    }

    @PutMapping("/sharedPosts/{postId}")
    @PreAuthorize("#username == authentication.principal.username")
    public ResponseEntity<?> updateSharedPost(@PathVariable String username, @PathVariable Long postId, @Valid @RequestBody Map<String, String> bodyMap) {
        try {
            SharedPost updatedSharedPost = sharedPostService.updateSharedPost(postId, Privacy.valueOf(bodyMap.get("privacy")));
            EntityModel<SharedPost> sharedPostModel = sharedPostAssembler.toModel(updatedSharedPost);
            return ResponseEntity.ok(sharedPostModel);
        } catch (PostNotFoundException exception) {
            exception = new PostNotFoundException(postId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("Post Not Found").withDetail(exception.getMessage()));
        } catch (ContentIsPrivateException exception) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Problem.create().withTitle("Action Not Allowed").withDetail(exception.getMessage()));
        }
    }


}
