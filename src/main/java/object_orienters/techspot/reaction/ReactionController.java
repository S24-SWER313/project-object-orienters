// In case remove the reaction when update the type What should the type be????
// Like the reaction was a like, how to remove it atoll (REMOVE THE REACTION).

package object_orienters.techspot.reaction;


import object_orienters.techspot.content.ContentNotFoundException;
import object_orienters.techspot.post.PostController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.mediatype.problem.Problem;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/posts/{contentID}")
public class ReactionController {
    private final ImpleReactionService reactionService;
    private final ReactionModelAssembler assembler;

    public ReactionController(ImpleReactionService reactionService, ReactionModelAssembler assembler) {
        this.reactionService = reactionService;
        this.assembler = assembler;
    }

    @GetMapping("/reactions/{reactionId}")
    public ResponseEntity<?> getReaction(@PathVariable String reactionId, @PathVariable Long contentID) {
        try {
            Reaction reaction = reactionService.getReaction(reactionId);
            EntityModel<Reaction> reactionModel = assembler.toModel(reaction);
            return ResponseEntity.ok(reactionModel);
        } catch (ReactionNotFoundException | ContentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("Not Found").withDetail(e.getMessage()));
        }
    }

    @GetMapping("/reactions")
    public ResponseEntity<?> getReactions(@PathVariable Long contentID) {
        try {
            List<Reaction> reactionList = reactionService.getReactions(contentID);
            CollectionModel<EntityModel<Reaction>> reactionModel = CollectionModel.of(reactionList.stream().map(assembler::toModel).collect(Collectors.toList()), linkTo(methodOn(ReactionController.class).getReactions(contentID)).withSelfRel(), linkTo(methodOn(PostController.class).getPost(contentID)).withRel("post"));
            return ResponseEntity.ok(reactionModel);
        } catch (ContentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("Not Found").withDetail(e.getMessage()));
        }
    }

    @PostMapping("/reactions")
    public ResponseEntity<?> createReaction(@PathVariable Long contentID, @RequestBody Reaction reaction) {
        try {
            Reaction createdReaction = reactionService.createReaction(reaction, contentID);
            EntityModel<Reaction> reactionModel = assembler.toModel(createdReaction);
            return ResponseEntity.status(HttpStatus.CREATED).body(reactionModel);
        } catch (IllegalArgumentException | ContentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("Not Found").withDetail(e.getMessage()));
        }

    }

    @PutMapping("/reactions/{reactionId}")
    public ResponseEntity<?> updateReactionOnComment(@PathVariable String reactionId, @RequestBody Reaction updatedReaction, @PathVariable Long contentID) {
        try {
            Reaction reaction = reactionService.updateReaction(reactionId, updatedReaction);
            EntityModel<Reaction> reactionModel = assembler.toModel(reaction);
            return ResponseEntity.ok(reactionModel);
        } catch (ReactionNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("Not Found").withDetail(e.getMessage()));
        }
    }


    @DeleteMapping("/reactions/{reactionId}")
    public ResponseEntity<?> deleteReactionOnComment(@PathVariable String reactionId, @PathVariable Long contentID) {
        try {
            reactionService.deleteReaction(reactionId);
            return ResponseEntity.ok("Reaction deleted successfully");
        } catch (ReactionNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Problem.create().withTitle("Not Found").withDetail(e.getMessage()));
        }
    }
}